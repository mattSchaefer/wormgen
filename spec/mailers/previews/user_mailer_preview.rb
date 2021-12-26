# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
    def forgot_password_email
        token = SecureRandom.hex(10)
        email = "testemail@test.com"
        UserMailer.with(forgot_token: token, email: email).forgot_password_email
    end
end
