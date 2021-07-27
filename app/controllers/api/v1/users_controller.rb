class Api::V1::UsersController < Api::V1::AuthController
    skip_before_action :require_token, :only => [:create, :index]
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
            render json: {user: @user, token: token}
        end
    end
    def update
    end
    def create
        @user = User.new(user_params)
        if @user.save!
            token = Token.build_token(@user.id)
            render json: {user: @user, token: token}
        else
            render json: {status: 401, body: "oops"}
        end
    end
    private
        def user_params
            params.permit(:username, :email, :password, :worm_ids)
        end
end
