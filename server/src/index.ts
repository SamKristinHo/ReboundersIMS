import express from 'express';
import cors from 'cors';
import router from './routes/taskroutes'

/**
 * Entry point into backend 
 * Starts up express server
 * Links with the taskroutes 
 */

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping-direct', (req, res) => {
  console.log("✅ /ping-direct hit");
  res.send("pong");
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use('/api/events', router);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
  console.log('logging another backend terminal message');
});