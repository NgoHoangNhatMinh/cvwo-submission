class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  # cannot use find authorize_user function for some reason??
  # before_action :authorize_user!, only: [:update, :destroy]

  # GET /posts
  def index
    @posts = Post.all

    if params[:category_id].present?
      @posts = @posts.where(category_id: params[:category_id])
    end

    if params[:q].present?
      @posts = Post.where("content LIKE ?", "%#{params[:q]}%")
    end

    if params[:sort].present? && params[:sort] == "rate"
      @posts = @posts
    else
      # Default ordering by creation date (newest first)
      @posts = @posts.order(created_at: :desc)
    end

    render json: @posts
  end

  # GET /user/:user_id/posts
  # Fetch all the posts of a specific user
  def user_posts
    @user = User.find(params[:user_id])
    @posts = @user.posts.order(created_at: :desc)
    
    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    # @post = Post.new(post_params)
    # Save post to current user
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.user_id == current_user.id
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      render json: {error: "You are not authorized to perform this action"}, status: :forbidden
    end
  end

  # DELETE /posts/1
  def destroy
    if @post.user_id == current_user.id
      @post.destroy!
    else
      render json: {error: "You are not authorized to perform this action"}, status: :forbidden
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.expect(post: [ :topic, :content, :user_id, :category_id ])
    end

    # def authorize_user
    # end
end
