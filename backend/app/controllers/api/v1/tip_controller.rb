module Api
  module V1
    class TipController < BaseController
      # before_action :authenticate

      def show
        respond_to do |format|
          format.json { render json: Tip.find(params[:id]) }
        end
      end
    end
  end
end
