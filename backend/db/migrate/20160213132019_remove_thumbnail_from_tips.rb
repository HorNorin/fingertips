class RemoveThumbnailFromTips < ActiveRecord::Migration
  def change
    remove_column :tips, :thumbnail
  end
end
