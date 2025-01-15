Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Route to update user information
  as :user do
    patch '/signup', to: 'users/registrations#update'
  end

  resources :users
  resources :categories
  resources :comments
  # Create nested routes for comments of posts
  resources :posts do
    resources :comments, only: [:index]
  end

  get '/user/:user_id/posts', to: 'posts#user_posts'
  get '/user/:user_id/comments', to: 'comments#user_comments'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
