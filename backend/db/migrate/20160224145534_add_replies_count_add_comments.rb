class AddRepliesCountAddComments < ActiveRecord::Migration
  def change
    add_column :comments, :replies_count, :integer, default: 0
  end
end
