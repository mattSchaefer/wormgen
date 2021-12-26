class UserMailer < ApplicationMailer
    def forgot_password_email
        @email = params[:email]
        @forgot_token = params[:forgot_token]
        mail(to: @email, subject: 'wormcreate password reset')
    end
end
