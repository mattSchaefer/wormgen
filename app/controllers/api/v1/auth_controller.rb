class Api::V1::AuthController < ApplicationController
    
    skip_before_action :verify_authenticity_token, :require_token, :only => [:login,:check_for_token, :contains_valid_token?]
    include Token
    def login
        
        user = User.find_by(username: auth_params[:username])
        if user && user.authenticate(auth_params[:password])
           
            token = build_token(user.id)
            
            response_obj = {message: 'SUCCESS', user: user, token: token, status: 200}
        else
            response_obj= {message: "there was an issue logging in. please try again", status: 500}
        end
        rescue
            render json: {status: 401, body: 'very bad'}
        render json: response_obj
    end
    def log_out
        user = ''
        response_obj = {
            message: "user is logged out",
            status: 200
        }
        rescue
            render json: {status: 401, body: 'very bad'}
        render json: response_obj
    end
      
    def new
    end
    def index
    end 
    def update
    end
    private
        def auth_params
            params.permit(:username, :password)
        end
end
