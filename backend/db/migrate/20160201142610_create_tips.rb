class CreateTips < ActiveRecord::Migration
  def change
    create_table :tips do |t|
      t.string :title
      t.text :description
      t.string :thumbnail
      t.integer :skill_id
      t.integer :duration, default: 0

      t.timestamps null: false
    end
  end
end
