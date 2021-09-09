class Api::V1::UsersController < Api::V1::AuthController
    skip_before_action :require_token, :only => [:create]
    
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
        @user.save(user_params)
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
            params.permit(:username, :email, :password, :worm_ids)
        end
end
