# Life Resolver

Life Resolver is an application I developed to streamline and enhance various aspects of my daily life through a collection of useful functions.

## Technologies Used

- **Frontend**: Built with React and styled with Tailwind CSS for a sleek and responsive user interface.
- **Backend**: Powered by Laravel to handle server-side operations efficiently.
- **Integration**: Utilizes Inertia.js to seamlessly connect the frontend and backend

## Architecture

The architecture of Life Resolver is structured around use cases

## Features

- **Finance Module**: Manage transactions providing a overview of financial activities
![List of transactions on a CRUD](https://i.imgur.com/vtLG6XI.png)

- **Chart Page**: Visualize transaction summaries through charts
![Transactions and chart](https://i.imgur.com/OPFvnpe.png)

## How to Use

1. **Clone Repository**: Clone this repository to your local machine
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install frontend dependencies and `composer install` for backend dependencies.
3. **Configure your environment**: Make a copy of `.env.example` and rename it to `.env`, adjust all the environment configurations to match your current server.
4. **Run the Application**: Execute `npm run dev` to start the frontend server and `php artisan serve` to launch the backend server.
5. **Run migrations**: Execute `php artisan migrate ` to create all necessary database tables
6. **Generate application key**: Execute `php artisan key:generate ` to generate a new application key
7. **Create first use**: Execute `php artisan db:seed --class=CreateFirstUser` to create your first admin user, the email is `admin@admin.admin` and the password is `FirstUser`
8. **Create react charts**: Execute `php artisan db:seed --class=CreateReactCharts` to create the base react charts
9. **Create fake transactions**: Execute `php artisan db:seed --class=CreateFakeTransactions` to create fake transactions so you can test the chart
