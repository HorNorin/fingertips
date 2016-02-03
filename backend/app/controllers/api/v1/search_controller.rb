module Api
  module V1
    class SearchController < BaseController
      def index
        respond_to do |format|
          format.json do
            render json: Tip.search(params)
          end
        end
      end
    end
  end
end
