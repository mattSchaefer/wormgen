Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update, :show, :index, :delete]
      resources :worms
      resources :contacts
      post '/login', to: 'auth#login'
      post '/logout', to: 'auth#logout'
      put '/favorite-worm', to: 'worms#favorite_for_user'
      put '/unfavorite-worm', to: 'worms#unfavorite_for_user'
    end
  end
end
