class Api::V1::AuthController < ApplicationController
    
    skip_before_action :verify_authenticity_token, :require_token, :only => [:login,:check_for_token, :contains_valid_token?]
    
    def login
        response_obj = {}
        user = User.find_by(:username, auth_params[:username])
        if user && user.authenticate(auth_params[:password])
            response_obj.message = "SUCCESS"
            response_obj.user = user
            token = Token.build_token(user.id)
            response_obj.token = token
        else
            response_obj.message = "there was an issue logging in. please try again"
        end
        response_obj
    end
    def log_out
    end
        user = ''
        response_obj = {
            message: "user is logged out",
            status: 200
        }
       
        response_obj
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
