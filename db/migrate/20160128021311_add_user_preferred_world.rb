class AddUserPreferredWorld < ActiveRecord::Migration
  def change
    add_column :users, :world_name, :string
    add_column :users, :pos_x, :integer
    add_column :users, :pos_y, :integer
    add_column :users, :pos_z, :integer
  end
end
