import { Router } from 'express';
import awardsRouter from '../../modules/awards/http/awards.routes.js';
import env from '../env.js';

const router = Router();

router.use('/awards', awardsRouter);

export default router;