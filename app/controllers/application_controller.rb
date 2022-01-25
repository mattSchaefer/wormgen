class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    include Token
    require 'httparty'
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
    def verify_captcha
        captcha_token = request.headers['Captcha-Token']
        secret = ENV["RCAPTCHA_SECRET_KEY"]
        url = "https://www.google.com/recaptcha/api/siteverify?secret="+secret+"&response="+captcha_token
        captcha_result = HTTParty.post(url)
        if captcha_result
            captcha_result
        else
           "captcha invalid"
        end
        #puts json: {message: 'captcha verified', rel_token: token, status: 200}
    end
    def require_admin

    end
    def current_user
        @user || 'anon'
    end
end
