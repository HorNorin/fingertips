module Api
  module V1
    class UserController < BaseController
      before_action :none_authenticate

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

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
      end
    end
  end
end
