import bodyParser from 'body-parser';
import express from 'express';

import { createGatewayOnNodeRuntime } from './express';

const app = express();
const PORT = process.env.PORT || 3000; // 使用环境变量 PORT，默认为 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const handler = createGatewayOnNodeRuntime();

// POST API at /api/v1/runner
app.post('/api/v1/runner', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');
  return handler(req, res);
});
app.options('*', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
