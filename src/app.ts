import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

import errorHandler from './middlewares/errorHandler';
import calculateRoutes from './routes/calculateRoutes';

config();

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', calculateRoutes);

app.use(errorHandler);

export default app;
