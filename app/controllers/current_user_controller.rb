class CurrentUserController < ApplicationController
  before_action :authenticate_user!
  def index
    # If the current user has image attached, attach image url
    # Tutorial: https://www.youtube.com/watch?v=___8Md5gFDg
    if current_user.image.attached?
      render json: UserSerializer.new(current_user).serializable_hash[:data][:attributes].as_json.merge(image_url: url_for(current_user.image)), status: :ok
    else
      render json: UserSerializer.new(current_user).serializable_hash[:data][:attributes], status: :ok
    end
  end
end