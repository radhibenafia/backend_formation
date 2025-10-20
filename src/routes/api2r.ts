import { Router } from 'express';
import { getAllApi2 } from '../controllers/api2c';

const router = Router();

router.get('/afficherAll2', getAllApi2);

export default router;
