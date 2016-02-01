module ApplicationHelper
  def current_user
    @user ||= authenticate_with_http_token { |token, options| User.find_by(access_token: token) }
  end

  def user_logged_in?
    current_user && current_user.token_expired_at > Time.zone.now
  end
end
