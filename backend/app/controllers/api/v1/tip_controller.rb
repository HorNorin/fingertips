module Api
  module V1
    class TipController < BaseController
      # before_action :authenticate

      def show
        respond_to do |format|
          format.json do
            tip = Tip.friendly.find(params[:id])
            if params[:callback].present?
              render json: tip, callback: params[:callback]
            else
              render json: tip
            end
          end
        end
      end
    end
  end
end
