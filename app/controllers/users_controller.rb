class UsersController < ApplicationController
    before_action :set_user, only: %i[ show ]
    # before_action :authenticate_user!, only: [:create, :update, :destroy]

    def index
        @users = User.all

        render json: @users
    end

    def show
        render json: @user
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.expect(user: [ :username, :email, :password])
    end
end
