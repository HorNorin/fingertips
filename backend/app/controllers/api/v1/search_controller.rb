module Api
  module V1
    class SearchController < BaseController
      def index
        respond_to do |format|
          format.json do
            tips = Tip.search(params)
            render json: {
              tips: tips,
              per_page: tips.per_page,
              total_pages: tips.total_pages,
              current_page: tips.current_page
            }, callback: params[:callback]
          end
        end
      end
    end
  end
end
