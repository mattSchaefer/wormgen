class AddPublicToWorms < ActiveRecord::Migration[6.0]
  def change
    add_column :worms, :public, :boolean
  end
end
