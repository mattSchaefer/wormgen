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
    def favorited_by_user(user_id, worm_id)
        @worm = Worm.find_by_id(worm_id)
        @worm.favorited_by = @worm.favorited_by || ''
        @worm.favorited_by += user_id.to_s + ","
        if @worm.save!
            return true
        else
            return false
        end
    end
    def unfavorited_by_user(user_id, worm_id)
        @worm = Worm.find_by_id(worm_id)
        @worm.favorited_by = @worm.favorited_by || ''
        new_fav_by = ''
        if @worm.favorited_by.length > 0
            fav_by_arr = @worm.favorited_by.to_s.split(',')
            new_fav_by = fav_by_arr.select{|i| i.to_s != user_id.to_s}
            @worm.favorited_by = new_fav_by.join(',')
            if new_fav_by.length == 1
                @worm.favorited_by += ','
            end
            if @worm.save!
                return true
            else
                return false
            end
        end
    end
end
