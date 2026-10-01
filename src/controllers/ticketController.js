const Ticket = require('../models/Ticket');
const asyncHandler = require('../utils/asyncHandler');
const { analyzeTicket } = require('../services/aiService');

const createTicket = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error('Please provide both title and description');
  }

  let aiAnalysis = {};
  try {
    aiAnalysis = await analyzeTicket(title, description);
  } catch (error) {
    console.error('AI Analysis error:', error.message);
  }

  const ticket = await Ticket.create({
    title,
    description,
    user: req.user._id,
    category: aiAnalysis.category || 'General',
    priority: aiAnalysis.priority || 'medium',
    sentiment: aiAnalysis.sentiment || 'neutral',
    suggestedResponse: aiAnalysis.suggestedResponse || '',
  });

  res.status(201).json({ success: true, data: ticket });
});

const getTickets = asyncHandler(async (req, res) => {
  const { status, category, priority, search, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (priority) filter.priority = priority;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [tickets, total] = await Promise.all([
    Ticket.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Ticket.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: tickets.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: tickets,
  });
});

const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  res.status(200).json({ success: true, data: ticket });
});

const updateTicket = asyncHandler(async (req, res) => {
  let ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: ticket });
});

const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  await ticket.deleteOne();
  res.status(200).json({ success: true, data: {}, message: 'Ticket deleted successfully' });
});

const getTicketStats = asyncHandler(async (req, res) => {
  const stats = await Ticket.aggregate([
    {
      $facet: {
        totalCount: [{ $count: 'total' }],
        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        byPriority: [{ $group: { _id: '$priority', count: { $sum: 1 } } }],
        bySentiment: [{ $group: { _id: '$sentiment', count: { $sum: 1 } } }],
      },
    },
  ]);

  const totalTickets = stats[0].totalCount[0]?.total || 0;

  res.status(200).json({
    success: true,
    data: {
      totalTickets,
      byStatus: stats[0].byStatus,
      byPriority: stats[0].byPriority,
      bySentiment: stats[0].bySentiment,
    },
  });
});

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketStats,
};