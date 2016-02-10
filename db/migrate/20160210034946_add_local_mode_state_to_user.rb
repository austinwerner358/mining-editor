class AddLocalModeStateToUser < ActiveRecord::Migration
  def change
    add_column :users, :local, :boolean
  end
end
