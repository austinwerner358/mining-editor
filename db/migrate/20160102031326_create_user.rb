class CreateUser < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :sky_color
    end
  end
end
