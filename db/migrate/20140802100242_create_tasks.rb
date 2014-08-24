class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string  :name
      t.date    :deadline
      t.boolean :status
      t.integer :position
      t.references :project, index: true

      t.timestamps
    end
  end
end
