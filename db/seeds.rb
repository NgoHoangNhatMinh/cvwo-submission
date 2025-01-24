# This file ensures the existence of records required to run the application in every environment.

Category.destroy_all
["Academic", "Looking for Advice", "Accomodation", "Course", "Misc"].each do |category|
  Category.find_or_create_by!(name: category)
end

User.destroy_all
["sudo", "JohnSmith", "NavnNavnesen", "JaneDoe", "MaxMustermann", "GipszJakab", "TanakaTarou"].each_with_index do |name, i|
    if i == 0
        User.create(
            email: "test@example.com",
            username: name,
            password: "password"
        )
    else
        User.create!(
            email: "test#{i + 1}@example.com",
            username: name,
            password: "password"
        )
    end
end

Post.destroy_all
20.times do
  Post.create!(
    topic: Faker::Lorem.sentence(word_count: 3),
    content: Faker::Lorem.paragraph(sentence_count: 15),
    user: User.all.sample,       # Randomly assigns an existing user
    category: Category.all.sample # Randomly assigns an existing category
  )
end

Comment.destroy_all
60.times do
  Comment.create!(
    content: Faker::Lorem.paragraph(sentence_count: 3),
    user: User.all.sample, # Randomly assigns an existing user
    post: Post.all.sample  # Randomly assigns an existing post
  )
end
