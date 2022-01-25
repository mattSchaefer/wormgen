class Api::V1::ContactsController < ApplicationController
    skip_before_action :require_token, :only => [:create]
    protect_from_forgery with: :null_session
    def new
        @contact = Contact.new(contact_params)
    end
    def index
        @contacts = Contact.all()
        if @contacts.length > 0
            render json: {
                contacts: @contacts,
                status: 200,
                message: 'here\'s the contacts'
            }
        else
            render json: {
                status: 400,
                message: 'not good boss'
            }
        end

    end
    def create
        if request.headers['Captcha-Token']
            token_verification_response = verify_captcha()
        else
            token_verification_response = "rcaptcha unauthorized"
        end
        @contact = Contact.new(contact_params)
        if token_verification_response["success"] && @contact.save!
            render json: {
                contact: @contact,
                status: 200,
                message: 'Contact creation successful'
            }
        else
            render json: {
                status: 400,
                message: 'There appears to have been an isue'
            }
        end
    end
    private
        def contact_params
            params.permit(:email, :message, :subject)
        end
end