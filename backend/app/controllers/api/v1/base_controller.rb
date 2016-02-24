module Api
  module V1
    class BaseController < ::ActionController::Base
      include SessionHelper

      protect_from_forgery with: :null_session
      rescue_from ActiveRecord::RecordNotFound, with: :resource_not_found

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

      def resource_not_found
        render json: {message: 'Resource not found.'}, status: 404
      end
    end
  end
end
