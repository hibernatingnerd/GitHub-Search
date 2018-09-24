class CreateFavourites < ActiveRecord::Migration[5.2]
  def change
    create_table :favourites do |t|
      t.string :name
      t.string :language
      t.string :tag

      t.timestamps
    end
  end
end
