class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, unique: true
      t.string :password_digest
      t.string :access_token, unique: true
      t.string :avatar
      t.datetime :token_expired_at

      t.timestamps null: false
    end

    add_index :users, :access_token
  end
end
