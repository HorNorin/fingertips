module Api
  module V1
    class UserController < BaseController
      before_action :authenticate, only: :show
      before_action :none_authenticate, only: :create

      def create
        respond_to do |format|
          format.json do
            @user = ::User.new(user_params)
            if @user.save
              render json: {message: 'Successfully register.', data: @user.to_json}
            else
              render json: @user.errors.full_messages, status: 422
            end
          end
        end
      end

      def show
        respond_to do |format|
          format.json { render json: current_user }
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
      end
    end
  end
end
