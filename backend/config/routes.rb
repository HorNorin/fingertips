Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        get '/user'      => 'user#show'
        get '/logout'    => 'session#destroy'
        post '/login'    => 'session#create'
        post '/register' => 'user#create'

        resources :tip,    only: :show
        resources :search, only: :index
      end
    end
  end
end
