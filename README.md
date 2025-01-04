# CVWO 2025 Assignment

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
   $ npm install
   ```

4. Setup the database:
   ```console
   $ rails db:create
   $ rails db:migrate
   $ rails db:seed
   ```

5. Create an .env file in the frontend directory and paste:
   ```
   VITE_API_URL=http://localhost:3000/
   ```

6. Start the Rails server:
   ```console
   $ rails s
   ```

7. Start the React frontend:
   ```console
   $ cd frontend
   $ npm run dev
   ```  

8. Open the web application from the link `localhost:5173`