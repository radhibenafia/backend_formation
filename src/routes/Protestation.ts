import { Router } from 'express';
import { addProtestation, getUserProtestations } from '../controllers/Protestations';

const router = Router();

router.post('/protest', addProtestation);
router.get("/protests/:sender", getUserProtestations);

export default router;