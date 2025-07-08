class WebhookSessionsController < ApplicationController
  # POST /sessions
  def create
    session = WebhookSession.create!(session_params)
    render json: { uuid: session.uuid, expires_at: session.expires_at }
  end

  private

  def session_params
    params.permit(:name)
  end
end
