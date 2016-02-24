class CreateDebates < ActiveRecord::Migration
  def change
    create_table :debates do |t|
      t.integer :reply_id
      t.integer :opinion_id
    end

    add_index :debates, [:reply_id, :opinion_id]
  end
end
