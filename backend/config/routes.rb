Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        post '/login' => 'session#create'
        get '/logout' => 'session#destroy'
        post '/register' => 'user#create'

        resources :tip, only: :show
        resources :search, only: :index
      end
    end
  end
end
