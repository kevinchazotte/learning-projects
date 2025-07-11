// api/src/routes/dashboardRoutes.ts
import { Router } from 'express';
import { getDashboardWidgets } from '../controllers/dashboardController';

const router = Router();

router.get('/widgets', getDashboardWidgets);

export default router;
