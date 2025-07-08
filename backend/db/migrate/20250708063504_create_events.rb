class CreateEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :events do |t|
      t.references :webhook_session, null: false, foreign_key: true
      t.jsonb :headers, default: {}
      t.text :body
      t.string :method, null: false
      t.datetime :received_at, null: false
      t.string :ip_address, null: false

      t.timestamps
    end
  end
end
