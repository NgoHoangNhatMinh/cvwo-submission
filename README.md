# CVWO 2025 Assignment

## Website
https://cvwoforum.netlify.app/

## Local Installation

1. You need the following prerequisites:
   - [Ruby 3.4.1](https://www.ruby-lang.org/en/)
   - [Rails 8.0.1](https://rubyonrails.org/)
   - [Node.js and npm](https://nodejs.org/en)
   - [SQLite](https://www.sqlite.org/download.html)
   - [Bundler](https://bundler.io/)

2. Clone the repo:
   ```console
   $ git clone https://github.com/NgoHoangNhatMinh/cvwo-submission.git
   ```

3. Installing dependencies:
   ```console
   $ bundle install
   ```
   ```console
   $ cd frontend
   $ npm install
   ```

4. Setup the database:
   ```console
   $ rails credentials:edit
   $ rails db:migrate
   $ rails db:seed
   ```
Potential problem: if encounter error after "rails db:migrate" with this error: "ActiveSupport::MessageEncryptor::InvalidMessage: ActiveSupport::MessageEncryptor::InvalidMessage", navigate to config folder and delete credentials.yml.enc and master.key files and run the first command again before proceeding to the second command.

5. Create an .env.development file in the frontend directory and paste:
   ```
   VITE_API_URL=http://localhost:3000/
   ```

6. Start the Rails server:
   ```console
   $ rails s
   ```

7. Open another console and start the React frontend:
   ```console
   $ cd frontend
   $ npm run dev
   ```  

8. Open the web application from the link `localhost:5173`