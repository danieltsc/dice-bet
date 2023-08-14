# Dice Betting API

This is a basic dice betting API implemented using Node.js, TypeScript, Sequelize, and GraphQL. The API allows users to place bets, check user information, and retrieve bet history.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (v14 or later)
- Docker (optional, for database)

### Installing

1. Clone the repository:

```bash
  git clone https://github.com/your-username/dice-betting-api.git
  cd dice-betting-api
```

2. Install dependencies
```
npm install
```

3. Install docker (if not already installed) - optional, to run the database

```
cd __dev_resources
docker-compose up -d
```

4. Run the project
```
npm run start:dev
```

## API DOCUMENTATION

Queries
* getUser(id: Int): User - Get a user by ID.
* getUserList: [User!] - Get a list of all users.
* getBet(id: Int): Bet - Get a bet by ID.
* getBetList: [Bet!] - Get a list of all bets.
* getBestBetPerUser(limit: Int): [Bet!] - Get a distinct list of the best bet each user has made.

Mutations
* createBet(userId: Int, betAmount: Float, chance: Float): Bet - Create a new bet.
* createUser(name: String, balance: Float): User -  Create a new user.