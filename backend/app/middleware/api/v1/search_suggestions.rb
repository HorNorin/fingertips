module Api
  module V1
    class SearchSuggestions
      def initialize(app)
        @app = app
      end

      def call(env)
        if env['PATH_INFO'] == '/api/v1/search_suggestion'
          request = Rack::Request.new(env)
          terms = SearchSuggestion.term_for(request.params['term'])

          if request.params['callback'].present?
            response = "#{request.params['callback']}(#{terms})"
            [200, {'Content-Type' => 'application/json'}, [response]]
          else
            [200, {'Content-Type' => 'application/json'}, [terms.to_json]]
          end
        else
          @app.call(env)
        end
      end
    end
  end
end
