class AddSlugToTips < ActiveRecord::Migration
  def change
    add_column :tips, :slug, :string
    add_index :tips, :slug, unique: true
  end
end
