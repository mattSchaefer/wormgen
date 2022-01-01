class AddEmailResetColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :reset_email_token, :string
    add_column :users, :reset_email_sent_at, :datetime
  end
end
