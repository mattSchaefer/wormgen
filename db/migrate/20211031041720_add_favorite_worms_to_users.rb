class AddFavoriteWormsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :favorite_worms, :string
  end
end
