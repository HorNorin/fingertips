module Api
  module V1
    class SearchController < BaseController
      def index
        respond_to do |format|
          format.json do
            tips = Tip.includes(:skill).search(params)
            json = tips.map do |tip|
              tip.as_json(except: [:video, :poster])
                .merge({'poster_url' => tip.poster.small.url})
            end

            render json: {
              tips: json,
              per_page: tips.per_page,
              total_pages: tips.total_pages,
              current_page: tips.current_page,
              total_count: tips.count
            }
          end
        end
      end
    end
  end
end
