class Api::V1::UserController < Api::V1::BaseController
  def create
    respond_to do |format|
      format.json do
        @user = User.new(user_params)
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
