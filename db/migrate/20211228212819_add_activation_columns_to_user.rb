class AddActivationColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :activated, :boolean
    add_column :users, :activation_token, :string
    add_column :users, :activation_sent_at, :datetime
  end
end
