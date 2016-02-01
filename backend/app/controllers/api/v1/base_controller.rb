module Api
  module V1
    class BaseController < ::ActionController::Base
      include ApplicationHelper

      protected

      def authenticate
        unless user_logged_in?
          render json: {message: 'Access denied.'}, status: 401
        end
      end

      def none_authenticate
        if user_logged_in?
          render json: {message: 'You have already logged in.'}, status: 301
        end
      end
    end
  end
end
