# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Category.destroy_all

5.times do |i|
    Category.create!(
        id: i + 1,
        name: Faker::Lorem.sentence(word_count: 1),
        description: Faker::Lorem.paragraph(sentence_count: 1)
    )
end

User.destroy_all

5.times do |i|
    User.create!(
        id: i + 1,
        email: "test" + i.to_s + "@example.com",
        username: "test" + i.to_s,
        password: "password"
    )
end

Post.destroy_all

20.times do |i|
    Post.create!(
        id: i + 1,
        topic: Faker::Lorem.sentence(word_count: 3),
        content: Faker::Lorem.paragraph(sentence_count: 15),
        # Arbitrary numbers --> id starts from 1
        user_id: i % 5 + 1,
        category_id: i %  5 + 1
    )
end


Comment.destroy_all

60.times do |i|
    Comment.create!(
        id: i + 1,
        content: Faker::Lorem.paragraph(sentence_count: 3),
        # Arbitrary numbers --> id starts from 1
        user_id: i % 5 + 1,
        post_id: i % 20 + 1
    )
end
