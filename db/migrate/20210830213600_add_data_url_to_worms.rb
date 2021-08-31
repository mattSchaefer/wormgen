class AddDataUrlToWorms < ActiveRecord::Migration[6.0]
  def change
    add_column :worms, :data_url, :string
  end
end
