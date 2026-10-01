const express = require('express');
const {
  createTicket,
  getTickets,
  getTicketStats,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/stats', authorize('admin', 'agent'), getTicketStats);

router.route('/')
  .post(createTicket)
  .get(getTickets);

router.route('/:id')
  .get(getTicketById)
  .patch(authorize('admin', 'agent'), updateTicket)
  .delete(authorize('admin'), deleteTicket);

module.exports = router;