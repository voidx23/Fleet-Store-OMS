import { Router } from 'express';
import orderController from '../controllers/orderControllers.js';
const router = Router();
const { addOrder, getOrders, updateDeliveryStatus } = orderController;

router.post('/add', addOrder);
router.get('/', getOrders);
router.put('/update/:id', updateDeliveryStatus);

export default router;
