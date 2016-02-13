class AddPosterToTips < ActiveRecord::Migration
  def change
    add_column :tips, :poster, :string
  end
end
