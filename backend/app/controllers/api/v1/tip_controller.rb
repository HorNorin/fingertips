module Api
  module V1
    class TipController < BaseController
      before_action :authenticate

      def show
        respond_to do |format|
          format.json do
            tip = Tip.includes(:skill).friendly.find(params[:id])
            json = tip.as_json(except: [:video])
            render json: json.merge({'video_url' => tip.video_url, 'poster_url' => tip.poster_url})
          end
        end
      end
    end
  end
end
