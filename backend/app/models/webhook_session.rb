class WebhookSession < ApplicationRecord
  ANONYMOUS_TTL = 7.days

  has_many :events, dependent: :destroy

  validates :uuid, presence: true, uniqueness: true
  validates :name, length: { maximum: 255 }, allow_blank: true

  before_validation :assign_uuid, on: :create
  before_create :set_expiration, unless: -> { name.present? }

  def expired?
    expires_at.present? && expires_at < Time.current
  end

  private

  def assign_uuid
    self.uuid ||= SecureRandom.uuid
  end

  def set_expiration
    self.expires_at ||= ANONYMOUS_TTL.from_now
  end
end
