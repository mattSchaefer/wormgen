class Api::V1::UsersController < Api::V1::AuthController
    skip_before_action :verify_authenticity_token, :only => [:create, :update, :index]
    skip_before_action :require_token, :only => [:create]
    include Token
    def new
        @user = User.new(user_params)
    end
    def index
        @users = User.all().map(|user| {username: user.username, id: user.id})
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
        respond_to :html, :json, :xml
        user = User.find_by(:username, user_params[:username])
        if user_params[:email]
            user.email = user_params[:email]
            if user.save
                token = build_token(user.id)
                render json: {user: user, token: token, status: 200}
            else
                render json: {status: 401, body: "oops"}
            end
        else
            if user_params[:favorite_worms]
                user.favorite_worms = user_params[:favorite_worms]
                if user.save
                    token = build_token(user.id)
                    render json: {user: user, token: token, status: 200}
                else
                    render json: {status: 401, body: "oops"}
                end
            end 
        end
        rescue
            render json: {status: 401, body: 'very bad1'}
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
end
