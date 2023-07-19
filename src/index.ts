import express, { Request, Response } from 'express';
import { userCreate, verifyPayment } from './controllers/signup.js';
import 'dotenv/config'
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const server = express();

// const options: cors.CorsOptions = {
//   origin: ['*']
// };

// server.use(cors(options));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

  server.use(cors());

  next();
});

server.use(express.json());

server.get('/', (req, res) => res.send('Server running successful'));

server.get('/user/:user_id/verify_payment/:payment_id', async (req: Request, res: Response) => {
  const { user_id, payment_id } = req.params;
  const response = await verifyPayment(payment_id, user_id);

  res.status(response.status).json(response.data);
});

server.post('/user', async (req: Request, res: Response) => {
  const response: any = await userCreate(req.body);

  res.status(response.status).json(response.data);
});

server.listen(PORT, () => console.log(`Server running in: ${PORT}`));
