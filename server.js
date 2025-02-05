import express from 'express';
import path from 'path';
import router from './routes/index.js';
import dbClient from './utils/db.js';

const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(express.json());

(async () => {
  try {
    
    await dbClient.connect();
    console.log('Connected to MongoDB');
    
    app.use('/', router);
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.error(' Could not connect to MongoDB:', error);
    process.exit(1);
  }
})();

export default app;

