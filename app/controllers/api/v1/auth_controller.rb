class Api::V1::AuthController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :require_token, :only => [:login, :check_for_token, :contains_valid_token?, :verify_captcha]
    include Token
    def login
        respond_to :html, :json, :xml
        user = User.find_by(username: auth_params[:username])
        if request.headers['Captcha-Token']
            token_verification_response = verify_captcha()
        else
            token_verification_response = "rcaptcha unauthorized"
        end
        if token_verification_response["success"] && user && user.authenticate(auth_params[:password])
            token = build_token(user.id)
            user_copy = {activated: false, activation_sent_at: '', activation_token: '', reset_email_sent_at: '', reset_email_token: '', unconfirmed_emil: '', reset_password_sent_at: '', reset_password_token: '', id: '', username: '', email: ''}
            user_copy["activated"] = user.activated || false
            user_copy["activation_sent_at"] = user.activation_sent_at || " "
            user_copy["activation_token"] = user.activation_token || " "
            user_copy["reset_email_sent_at"] = user.reset_email_sent_at || " "
            user_copy["reset_email_token"] = user.reset_email_token || " "
            user_copy["unconfirmed_emil"] = user.unconfirmed_emil || " "
            user_copy["reset_password_sent_at"] = user.reset_password_sent_at || " "
            user_copy["reset_password_token"] = user.reset_password_token || " "
            user_copy["id"] = user.id
            user_copy["username"] = user.username
            user_copy["email"] = user.email

            render json: {message: 'SUCCESS', token: token, status: 200, user: user_copy, activated: user.activated.to_s, token_verification_response: token_verification_response["success"]}
        else
            render json: {message: "1there was an issue logging in. please try again", status: 500}
        end
        rescue => error
            render json: {status: 401, body: 'very bad', error: error}
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
