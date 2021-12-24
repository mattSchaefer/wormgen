class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates_format_of :email, with: /@/
    validates :password, presence: true, length: {minimum: 8}
    has_many :worms, :dependent => :destroy
    attr_reader :worms
    include Token

    def generate_password_token!
        self.reset_password_token = generate_token
        self.reset_password_sent_at = Time.now.utc
        save!
    end

    def password_token_valid!
        (self.reset_password_sent_at + 4.hours) > Time.now.utc
    end

    def reset_password!(password)
        self.reset_password_token = nill
        self.password = password
        save!
    end

    def update_new_email!(email)
        self.unconfirmed_email = email
        self.generate_confirmation_instructions
        save
    end

    def update_confirmed_email!
        self.email = self.unconfirmed_email
        self.unconfirmed_email = nill
        self.mark_as_confirmed!
    end

    def self.email_used?(email)
        existing_user = find_by("email = ?", email)
        if existing_user.present?
            return true
        else
            waiting_for_confirmation = find_by("unconfirmed_email = ?", email)
            return waiting_for_confirmation.present? && waiting_for_confirmation.confirmation_token_valid?
        end
    end
    
    private
    
    def generate_token
        SecureRandom.hex(10)
    end
end