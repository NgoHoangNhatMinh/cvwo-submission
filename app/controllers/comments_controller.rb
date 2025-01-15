class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  # GET /comments
  def index
    if params[:post_id]
    # only return comments belonging to the post
      @comments = Comment.where(post_id: params[:post_id]).order(created_at: :desc)
    else
      @comments = Comment.all
    end

    render json: @comments
  end

  # GET /user/:user_id/comments
  # Fetch all the comments of a specific user
  def user_comments
    @user = User.find(params[:user_id])
    @comments = @user.comments.order(created_at: :desc)
    
    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.user_id == current_user.id
      if @comment.update(comment_params)
        render json: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    else
      render json: {error: "You are not authorized to perform this action"}, status: :forbidden
    end
  end

  # DELETE /comments/1
  def destroy
    if @comment.user_id == current_user.id
      @comment.destroy!
    else
      render json: {error: "You are not authorized to perform this action"}, status: :forbidden
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.expect(comment: [ :content, :post_id, :user_id ])
    end
end
