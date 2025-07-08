class EventsController < ApplicationController
  require "net/http"
  require "uri"

  # GET /events/:uuid
  def index
    session = WebhookSession.find_by!(uuid: params[:uuid])
    if session.expired?
      render json: { error: "session expired" }, status: :gone and return
    end
    events = session.events.order(received_at: :desc)
    render json: events
  end

  # POST /events/:id/replay
  def replay
    event = Event.find(params[:id])
    if event.webhook_session.expired?
      render json: { error: "session expired" }, status: :gone and return
    end
    url = params[:url]
    uri = URI.parse(url)
    request_class = Net::HTTP.const_get(event.method.capitalize)
    request = request_class.new(uri)
    event.headers.each { |k, v| request[k] = v } if event.headers.present?
    request.body = event.body

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.request(request)
    end

    render json: { status: response.code.to_i, body: response.body }
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
