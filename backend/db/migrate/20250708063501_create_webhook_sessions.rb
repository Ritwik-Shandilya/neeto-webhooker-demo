class CreateWebhookSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :webhook_sessions do |t|
      t.string :uuid, null: false

      t.timestamps
    end
    add_index :webhook_sessions, :uuid, unique: true
  end
end
