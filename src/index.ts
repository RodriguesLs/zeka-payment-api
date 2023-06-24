import express, { Request, Response } from 'express';
import { userCreate } from './controllers/signup.js';

const PORT = 3333;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello')
});

server.post('/user', async (req: Request, res: Response) => {
  const response: any = await userCreate(req.body);

  res.status(response.status).json(response.data);
});

server.listen(PORT, () => {
  console.log(`Server running in: ${PORT}`);
});
