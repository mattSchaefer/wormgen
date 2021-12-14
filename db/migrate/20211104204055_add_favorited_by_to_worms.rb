class AddFavoritedByToWorms < ActiveRecord::Migration[6.0]
  def change
    add_column :worms, :favorited_by, :string
  end
end
