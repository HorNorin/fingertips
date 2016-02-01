module Api
  module V1
    class SessionController < BaseController
      before_action :none_authenticate, only: :create

      def create
        respond_to do |format|
          format.json do
            if user = ::User.authenticate(params[:email], params[:password])
              user.update_attributes(token_expired_at: 1.day.from_now)
              render json: {message: 'Successfully login.', data: user.to_json}
            else
              render json: {message: 'Invalid email or password.'}, status: 401
            end
          end
        end
      end

      def destroy
        respond_to do |format|
          format.json do
            if user_logged_in?
              access_token = current_user.access_token

              begin
                access_token = ::SecureRandom.uuid.gsub(/\-/, '')
              end while ::User.exists?(access_token: access_token)

              current_user.update_attributes({
                access_token: access_token,
                token_expired_at: Time.zone.now
              })

              render json: {message: 'Successfully logout.'}
            else
              render json: {message: 'You are not logged in.'}, status: 401
            end
          end
        end
      end
    end
  end
end
