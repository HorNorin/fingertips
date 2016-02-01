Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        post '/login' => 'session#create'
        get '/logout' => 'session#destroy'
        post '/register' => 'user#create'

        resources :tip, only: :show
      end
    end
  end
end
