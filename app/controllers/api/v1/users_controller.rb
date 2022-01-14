class Api::V1::UsersController < Api::V1::AuthController
    #skip_before_action :verify_authenticity_token, :only => [:create, :update, :index]
    skip_before_action :require_token, :only => [:create]
    before_action :validate_email_update, :only => [:update]
    protect_from_forgery with: :null_session
    include Token
    def new
        @user = User.new(user_params)
    end
    def index
        @users = User.all()
        render json: @users
    end
    def show
        @user = User.find_by(:username, user_params[:user][:username])
        if @user.authenticate(user_params[:user][:password]) 
            token = Token.build_token(@user.id)
            render json: {user: @user, token: token, status: 200}, status: :ok
        end
    end
    def update
        if user_params[:user][:email] && current_user.update_confirmed_email!
            #send email
            render json: {status: 'email confirmation has been sent'}
        else
            render json: {errors: 'error'}, status: :bad_request
        end
    end
    def activate_account
        if user_params[:token]
            @user = User.find_by(activation_token: user_params[:token])
            user_id = @user.id
            header = request.headers['Authorization'] || ''
            token = header.split(' ').last
            authorized_token = authorize_token(token, user_id.to_s)
            new_token = build_token(user_id)
            if @user && authorized_token[:message] == 'authorized'
                activation_valid = (@user.activation_token == user_params[:token]) && ((@user.activation_sent_at + 4.hours) > Time.now.utc)
                if activation_valid
                    @user.activated = true
                    if @user.save!
                        render json: {message: 'account successfully activated', status: 200, new_token: new_token}, status: :ok
                    else
                        render json: {errors: 'error', status: 401}, status: :bad_request
                    end
                else
                    render json: {errors: 'error', status: 401}, status: :bad_request
                end
            else
                render json: {errors: 'error', status: 401}, status: :bad_request
            end
        else
            render json: {errors: 'error', status: 401}, status: :bad_request
        end
    end
    def set_unconfirmed_email
        if user_params[:email]
            user_id = User.find_by(email: user_params[:email]).id
            header = request.headers['Authorization'] || ''
            token = header.split(' ').last
            authorized_token = authorize_token(token, user_id.to_s)
            new_token = build_token(user_id)
            if user_params[:new_email] && authorized_token[:message] == 'authorized'
                user = User.find_by(email: user_params[:email])
                already_taken = User.find_by(email: [user_params[:new_email]])
                pending_taken = User.find_by(unconfirmed_emil: user_params[:new_email])
                if user.authenticate(user_params[:password])
                    if !already_taken
                        user.unconfirmed_emil = user_params[:new_email]
                        user.reset_email_token = SecureRandom.hex(10).strip
                        user.reset_email_sent_at = Time.now.utc
                        if user.save!
                            @reset_token = user.reset_email_token
                            UserMailer.with(reset_token: @reset_token, old_email: user_params[:email], new_email: user_params[:new_email]).reset_email_email.deliver_now
                            render json: {status: 200, message: 'unconfirmed email set and instructions sent', email: user_params[:new_email], new_token: new_token}, status: :ok
                        else
                            render json: {errors: 'error', status: 401}, status: :bad_request
                        end
                    else
                        render json: {errors: 'email already taken', status: 401}, status: :bad_request
                    end
                else
                    render json: {errors: 'error', status: 401}, status: :bad_request
                end
            else
                render json: {errors: 'error', status: 401}, status: :bad_request
            end
        else
            render json: {errors: 'error', status: 401}, status: :bad_request
        end
    end
    def email_update
        email = params[:email].to_s
        user = User.find_by(unconfirmed_emil: email)
        user_id = user.id
        header = request.headers['Authorization'] || ''
        token = header.split(' ').last
        authorized_token = authorize_token(token, user_id.to_s)
        new_token = build_token(user_id)
        user_email_confirmation_token_valid = (user.reset_email_token == params[:token]) && ((user.reset_email_sent_at + 4.hours) > Time.now.utc)
        if !user || !user_email_confirmation_token_valid || authorized_token[:message] != 'authorized'
            render json: {error: 'there is an issue with that suspicious link...', status: 401}
        else
            user.email = user.unconfirmed_emil
            user.unconfirmed_emil = ''
            if user.save!
                render json: {status: 200, message: 'email updated successfully', email: user.email, new_token: new_token}, status: :ok
            else
                render json: {status: 401, body: "oops"}
            end
        end
    end
    def create
        respond_to :html, :json, :xml
        @user = User.new(user_params)
        @user.activation_token = SecureRandom.hex(10)
        @user.activation_sent_at = Time.now.utc
        if @user.save!
            UserMailer.with(username: @user.username, activation_token: @user.activation_token, email: @user.email).activate_account_email.deliver_later
            #send user activation token to be used in account activation form
            token = build_token(@user.id)
            render json: {user: @user, token: token, status: 200}
        else
            render json: {status: 401, body: "oops"}
        end
        rescue
            render json: {status: 401, body: 'very bad'}

    end
    private
        def user_params
            params.permit(:username, :email, :password, :worm_ids, :id, :auth, :favorite_worms, :new_email, :token)
        end
        def validate_email_update
            @new_email = params[:email].to_s.downcase
            if @new_email.blank?
                return render json: {status: 'email can not be blank'}
            end
            if @new_email == current_user.email
                return render json: {status: 'new email cannot match old email'}
            end
            if User.email_used?(@new_email)
                return render json: {error: 'email already in use'}
            end
        end
end
