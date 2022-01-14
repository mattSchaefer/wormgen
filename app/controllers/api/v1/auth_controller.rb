class Api::V1::AuthController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :require_token, :only => [:login,:check_for_token, :contains_valid_token?]
    include Token
    def login
        respond_to :html, :json, :xml
        user = User.find_by(username: auth_params[:username])
        if user && user.authenticate(auth_params[:password])
           
            token = build_token(user.id)
            
            render json: {message: 'SUCCESS', user: user, token: token, status: 200, activated: user.activated.to_s}
        else
            render json: {message: "there was an issue logging in. please try again", status: 500}
        end
        rescue
            render json: {status: 401, body: 'very bad'}
    end
    def log_out
        respond_to :html, :json, :xml
        render json: {
            message: "user is logged out",
            status: 200
        }
        rescue
            render json: {status: 401, body: 'very bad'}
       
    end
      
    def new
    end
    def index
    end 
    def update
    end
    private
        def auth_params
            params.permit(:username, :password, :auth)
        end
end
