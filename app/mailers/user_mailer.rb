class UserMailer < ApplicationMailer
    def forgot_password_email
        @email = params[:email]
        @forgot_token = params[:forgot_token]
        mail(to: @email, subject: 'wormcreate password reset')
    end
    def reset_email_email
        @new_email = params[:new_email]
        @reset_token = params[:reset_token]
        @old_email = params[:old_email]
        mail(to: @new_email, subject: 'wormcreate account email change')
    end
    def activate_account_email
        @username = params[:username]
        @activation_token = params[:activation_token]
        @email = params[:email]
        mail(to: @email, subject: 'follow these instructions to activate your account and start generating worms!')
    end
end
