class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :username, :image

end
