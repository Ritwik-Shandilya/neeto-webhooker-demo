class WebhooksController < ApplicationController
  # Receives incoming webhook requests and logs them.
  def receive
    session = WebhookSession.find_or_create_by!(uuid: params[:uuid])
    if session.expired?
      render json: { error: "session expired" }, status: :gone and return
    end

    sanitized_headers = request.headers.env.select { |k, _| k.start_with?("HTTP_") }
    event = session.events.create!(
      headers: sanitized_headers,
      body: request.raw_post,
      method: request.method,
      received_at: Time.current,
      ip_address: request.remote_ip
    )

    render json: { status: "received", event_id: event.id }
  end
end
