class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    include Token
    before_action :require_token
    def require_token
        if request.headers['Authorization'] === nil
            render json: {status: 401, message: 'unauthorized'}
            return
        end
        contains_valid_token?(request.headers['Authorization']) 
    end
    def check_for_token(header)
        contains_valid_token?(header)
    end
    def contains_valid_token?(header)
        token = header.split(' ').last
        validated_token = validate_token(token)
        if validated_token
        else
            render json: {status: 401, message: 'unauthorized'}   
        end
    end
    def require_admin

    end
    def current_user
        @user || 'anon'
    end
end
