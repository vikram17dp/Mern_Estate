import express from 'express'
import { listingRouter } from '../controller/listing.controller';
import { verifyToken } from '../utils/verifyUser';

const router = express.Router();

router.post('/create',verifyToken,listingRouter)

export default router;