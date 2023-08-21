# Budget Boss

Budget Boss is a personal finance and budget management web application tailored to help users efficiently manage their expenses. By integrating third-party banking via Plaid or manual transactions, Budget Boss delivers actionable insights and a comprehensive view of your financial habits.

## Features

- Connect bank accounts using the Plaid integration or add accounts manually.
- View a 6-month budget history through an interactive bar chart, each offering deeper insights into monthly expenses.
- Set and manage manual financial Goals, with the capability to archive them for future reference.
- A user-friendly interface that simplifies basic financial account management.

## Getting Started

These instructions will guide you in setting up Budget Boss on your local machine for development and testing purposes.

### Prerequisites

To get started, you will need [Docker](https://www.docker.com/), which packages all the required dependencies. Developer credentials for Plaid are also essential for the core functionality of bank account integration. Without them, certain features of the app may not operate as intended.

### Installation

To install Budget Boss:

- Fork and clone the repository, or directly clone it.
- Utilize Docker to build and launch Budget Boss with the command within the repo directory: `docker-compose up --build`.
- Access Budget Boss at `http://localhost:3000/` or the deployed server host.

## Usage

- Sign-Up or visit `http://localhost:3000/dashboard/demo`
- Connect your bank account using Plaid or manually input transactions.
- Visualize your expenses through interactive charts and set budgetary goals for effective financial management.

## Deployment

Budget Boss is available at `https://www.budgetboss-finance.com` for general demo use. To deploy the app independently, adhere to the above [Installation](https://github.com/iamtwan/budgetboss#installation) steps.

## Built With

- Frontend: Next.js (SWR, Chart.js) & React Bootstrap.
- Backend: Java, Spring Boot.

## Contributing

While Budget Boss is currently not accepting contributions, you're welcome to fork the repository for your personal use.

## Authors

- Back-end - [@Itttz](https://github.com/Itttz)
- Front-end - [@iamtwan](https://github.com/iamtwan)

## License

This project is under the MIT License. Check out [LICENSE](LICENSE) for more specifics.

## Disclosure

Budget Boss employs the Plaid API in sandbox mode, implying that the data does not represent real banking information and is not approved for production at this time. The app respects all terms of service for integrated platforms and ensures user data security and privacy.
