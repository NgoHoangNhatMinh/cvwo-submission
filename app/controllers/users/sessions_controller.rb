# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json
  private

  def respond_with(resource, _opts = {})
    if resource.image.attached?
      render json: {
        status: {code: 200, message: "Logged in sucessfully"},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes].as_json.merge(image_url: url_for(resource.image))
      }, status: :ok
    else
      render json: {
        status: {code: 200, message: "Logged in sucessfully"},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    end
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end

  before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:login])
  end
end
