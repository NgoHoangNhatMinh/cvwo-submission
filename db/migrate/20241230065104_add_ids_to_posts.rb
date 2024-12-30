class AddIdsToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :user_id, :integer
    add_column :posts, :category_id, :integer
  end
end