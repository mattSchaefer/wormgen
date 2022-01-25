class PasswordsController < ApplicationController
    #skip_before_action :verify_authenticity_token, :only => [ :reset_via_old_password]
    skip_before_action :require_token, :only => [ :forgot, :reset_via_token]
    protect_from_forgery with: :null_session
    def forgot
        if pword_params[:email].blank?
            return render json: {error: 'Email not present'}
        end
        if request.headers['Captcha-Token']
            token_verification_response = verify_captcha()
        else
            token_verification_response = "rcaptcha unauthorized"
        end
        user = User.find_by(email: pword_params[:email].downcase)
        if user && token_verification_response["success"]
            user.reset_password_token = SecureRandom.hex(10).strip
            user.reset_password_sent_at = Time.now.utc
            if user.save!
                @reset_token = user.reset_password_token
                UserMailer.with(forgot_token: @reset_token, email: pword_params[:email]).forgot_password_email.deliver_now
                render json: {status: 'ok'}, status: :ok
            end
        else
            render json: {error: ['Email address not found. Please check and try again.']}, status: :not_found
        end
    end
    def reset_via_token
        token = pword_params[:token].to_s
        if pword_params[:token].blank?
            return render json: {error: 'token not present'}
        end
        if request.headers['Captcha-Token']
            token_verification_response = verify_captcha()
        else
            token_verification_response = "rcaptcha unauthorized"
        end
        user = User.find_by(reset_password_token: token)
        valid = ((user.reset_password_sent_at + 4.hours) > Time.now.utc)
        if user.present? && valid && token_verification_response["success"]
            user.reset_password_token = nil
            user.password = pword_params[:new_password]
            if user.save!
                render json: {status: 'ok', message: 'password successfully reset'}, status: :ok
            else
                render json: {error: 'error'}
            end
        end
    end
    def reset_via_old_password
        respond_to :html, :json, :xml
        if pword_params[:email]
            user = User.find_by(email: pword_params[:email])
            user_id = user.id
            header = request.headers['Authorization'] || ''
            token = header.split(' ').last
            authorized_token = authorize_token(token, user_id.to_s)
            new_token = build_token(user_id)
            if request.headers['Captcha-Token']
                token_verification_response = verify_captcha()
            else
                token_verification_response = "rcaptcha unauthorized"
            end
            if user.authenticate(pword_params[:old_password]) && authorized_token[:message] == 'authorized' && token_verification_response["success"]
                user.password = pword_params[:new_password]
                user.save!
                render json: {message: 'good', status: 200, new_token: new_token}
            else
                render json: {message: 'bad', status: 500}
            end
        else
            render json: {error: 'error'}
        end
    end

    private
    def pword_params  
        params.require(:password).permit(:email, :token, :old_password, :new_password)
    end
end