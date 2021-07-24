class AddUserRefToWorms < ActiveRecord::Migration[6.0]
  def change
    add_reference :worms, :user, null: false, foreign_key: true
  end
end
