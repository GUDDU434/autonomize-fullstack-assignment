# GITHUB-USER SERVER v1.0.0

**Github User Finder** is a server-side application that provides a RESTful API for fetching github user data from the github open api and save it if not already present in the database. .

---

## 🚀 Features

- **Fetch github-user data** from the Guthub Open API.
- **Get Followers and Repositories** of the user.
- **Save user data if not already present** Save user data to database otherwise fetch from github api and save.
- **Search User**: search user by username or location.
- **Update User Fields**: update user fields such as name, location, etc
- **Environment variables** for secure and flexible configuration.

---

## 🛠️ Setup and Installation

Follow these steps to set up and run the server locally:

### 1. Clone the repository

```bash
git clone https://github.com/GUDDU434/autonomize-fullstack-assignment.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and set the following environment variables:
```bash
PORT=8000
MONGODB_URL=database-url
```

### 4. Start the server

```bash
npm start
```

The server should now be running at http://localhost:8000.


## 👤 Contributors
Guddu Ali (https://github.com/GUDDU434)