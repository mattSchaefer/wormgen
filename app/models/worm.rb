class Worm < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    has_one_attached :image
    
    def add_to_user(user_id)
        @user = User.find_by_id(user_id)
        self.user = @user
        if self.save
            return true
        else        
            return false
        end
    end
end
