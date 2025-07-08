class WebhookSession < ApplicationRecord
  has_many :events, dependent: :destroy

  validates :uuid, presence: true, uniqueness: true

  before_validation :assign_uuid, on: :create

  private

  def assign_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
