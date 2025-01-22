# CVWO 2025 Assignment - [Forum](https://cvwoforum.netlify.app/)

## About This Project

This project is an assignment for NUS Computing for Voluntary Welfare Organisations (CVWO) for 2025.

- Name: Ngo Hoang Nhat Minh
- [Final Writeup](https://www.overleaf.com/project/677e8854889d2d77a85bbdb1)
- [Heroku Link](https://cvwoforum.netlify.app/)

## Local Installation
This is the directory for the backend of the forum. To start the frontend, clone the repo at [Forum Frontend](https://github.com/NgoHoangNhatMinh/cvwo-submission-frontend) and follow the instructions to run the app locally.

1. You need the following prerequisites:
   - [Ruby 3.4.1](https://www.ruby-lang.org/en/)
   - [Rails 8.0.1](https://rubyonrails.org/)
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

4. Setup the database:\
    Create database credentials:
   ```console
   $ rm config/credentials.yml.enc
   $ rm config/master.key
   $ rails credentials:edit
   ```
    Then, run:
   ```console
   $ rails db:migrate
   $ rails db:seed
   ```

5. Start the Rails server:
   ```console
   $ rails s
   ```
