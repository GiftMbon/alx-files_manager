import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.db = null; // Initially set db to null
  }

  // Async method to connect to the database
  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.db = this.client.db(DATABASE); // Set db once connected
    } catch (err) {
      console.log(' MongoDB Connection Error:', err);
      throw err;
    }
  }

  // Check if the client is connected
  isAlive() {
    return this.client.isConnected(); 
  }

  // Get number of users
  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
  }

  // Get number of files
  async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

const dbClient = new DBClient();
export default dbClient;

