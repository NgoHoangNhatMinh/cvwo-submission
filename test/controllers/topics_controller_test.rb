require "test_helper"

class TopicsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @topic = topics(:one)
  end

  test "should get index" do
    get topics_url, as: :json
    assert_response :success
  end

  test "should display topics in descending order" do
    get topics_url, as: :json
    assert_equal Topic.order(created_at: :desc), assigns(:topics)
  end

  test "should create topic" do
    assert_difference("Topic.count") do
      post topics_url, params: { topic: { description: @topic.description, title: @topic.title } }, as: :json
    end

    assert_response :created
  end

  test "should show topic" do
    get topic_url(@topic), as: :json
    assert_response :success
  end

  test "should update topic" do
    patch topic_url(@topic), params: { topic: { description: @topic.description, title: @topic.title } }, as: :json
    assert_response :success
  end

  test "should destroy topic" do
    assert_difference("Topic.count", -1) do
      delete topic_url(@topic), as: :json
    end

    assert_response :no_content
  end
end
