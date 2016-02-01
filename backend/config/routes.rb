Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        post '/login' => 'session#create'
        get '/logout' => 'session#destroy'
        post '/register' => 'user#create'
      end
    end
  end
end
