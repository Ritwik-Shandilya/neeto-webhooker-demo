class AddNameAndExpiresAtToWebhookSessions < ActiveRecord::Migration[8.0]
  def change
    add_column :webhook_sessions, :name, :string
    add_column :webhook_sessions, :expires_at, :datetime
  end
end
