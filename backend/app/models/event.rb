class Event < ApplicationRecord
  belongs_to :webhook_session

  validates :method, :received_at, :ip_address, presence: true
end
