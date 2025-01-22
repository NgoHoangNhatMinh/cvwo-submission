class AddLikeToComments < ActiveRecord::Migration[8.0]
  def change
    add_column :comments, :like, :integer, default: 0, null: false
  end
end
