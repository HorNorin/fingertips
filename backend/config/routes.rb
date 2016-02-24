Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        get '/user'      => 'user#show'
        get '/logout'    => 'session#destroy'
        post '/login'    => 'session#create'
        post '/register' => 'user#create'

        resources :tip,    only: :show do
          resources :comments, only: [:index, :create] do
            get 'replies', on: :member
            post 'replies' => 'comments#create_reply', on: :member
          end
        end
        resources :search, only: :index
      end
    end
  end
end
