class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: {minimum: 8}
    has_many :worms, :dependent => :destroy
    attr_reader :worms
    include Token
end
