class AddUnconfirmedEmailTouser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :unconfirmed_emil, :string
  end
end
