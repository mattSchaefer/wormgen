class PasswordsController < ApplicationController
    skip_before_action :verify_authenticity_token, :only => [:forgot, :reset_via_old_password]
    protect_from_forgery with: :null_session
    def forgot
        if pword_params[:email].blank?
            return render json: {error: 'Email not present'}
        end
        user = User.find_by(email: pword_params[:email].downcase)
        if user.present?
            user.reset_password_token = SecureRandom.hex(10)
            user.reset_password_sent_at = Time.now.utc
            if user.save!
                @reset_token = user.reset_password_token
                UserMailer.with(forgot_token: @reset_token, email: pword_params[:email]).forgot_password_email.deliver_later
                render json: {status: 'ok'}, status: :ok
            end
        else
            render json: {error: ['Email address not found. Please check and try again.']}, status: :not_found
        end
    end
    def reset_via_token
        token = pword_params[:token].to_s
        if pword_params[:email].blank?
            return render json: {error: 'token not present'}
        end
        user = User.find_by(reset_password_token: token)
        if user.present? && user.password_token_valid?
            if user.reset_password!(pword_params[:new_password])
                render json: {status: 'ok'}, status: :ok
            else
                render json: {error: 'error'}
            end
        end
    end
    def reset_via_old_password
        respond_to :html, :json, :xml
        if pword_params[:email]
            user = User.find_by(email: pword_params[:email])
            if user.authenticate(pword_params[:old_password])
                user.password = pword_params[:new_password]
                user.save!
                render json: {message: 'good', status: 200}
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