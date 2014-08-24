Rails.application.routes.draw do
  

  devise_for :users
  resources :projects do
    resources :tasks do
      post 'sort', on: :collection
      post 'sort_down', on: :member
    end
  end
  root 'projects#index'

end