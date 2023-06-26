import express, { Request, Response } from 'express';
import { userCreate } from './controllers/signup.js';

const PORT = process.env.PORT || 8080;
const server = express();
server.use(express.json());

server.get('/', (req, res) => res.send('Server running successful'));

server.post('/user', async (req: Request, res: Response) => {
  const response: any = await userCreate(req.body);

  res.status(response.status).json(response.data);
});

server.listen(PORT, () => console.log(`Server running in: ${PORT}`));
