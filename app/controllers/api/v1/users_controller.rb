class Api::V1::UsersController < Api::V1::AuthController
    skip_before_action :verify_authenticity_token, :only => [:create, :update, :index]
    skip_before_action :require_token, :only => [:create]
    before_action :validate_email_update, :only => [:update]
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
            render json: {user: @user, token: token, status: 200}
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
    def email_update
        email = params[:email].to_s
        user = User.find_by(email: email)
        if !user || !user.confirmation_token_valid?
            render json: {error: 'there is an issue with that suspicious link...'}
        else
            user.update_new_email!
            render json: {status: 'email updated successfully'}, status: :ok
        end
    end
    def create
        respond_to :html, :json, :xml
        @user = User.new(user_params)
        if @user.save!
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
            params.permit(:username, :email, :password, :worm_ids, :id, :auth, :favorite_worms)
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
