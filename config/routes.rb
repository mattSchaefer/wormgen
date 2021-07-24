Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update, :show, :index, :delete]
      resources :worms
      post '/login', to: 'auth#login'
      post '/logout', to: 'auth#logout'
    end
  end
end
