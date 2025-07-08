class WebhooksController < ApplicationController
  # Receives incoming webhook requests and logs them.
  def receive
    session = WebhookSession.find_or_create_by!(uuid: params[:uuid])
    if session.expired?
      render json: { error: "session expired" }, status: :gone and return
    end

    event = session.events.create!(
      headers: request.headers.to_h,
      body: request.raw_post,
      method: request.method,
      received_at: Time.current,
      ip_address: request.remote_ip
    )

    render json: { status: "received", event_id: event.id }
  end
end
