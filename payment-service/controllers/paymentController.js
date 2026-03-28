const payments = require("../models/paymentModel");

// GET all payments
const getAllPayments = (req, res) => {
  res.json(payments);
};

// GET single payment by ID
const getPaymentById = (req, res) => {
  const payment = payments.find(p => p.id === parseInt(req.params.id));
  if (!payment) return res.status(404).json({ message: "Payment not found" });
  res.json(payment);
};

// POST create new payment
const createPayment = (req, res) => {
  const { orderId, amount, method } = req.body;
  const newPayment = {
    id: payments.length + 1,
    orderId,
    amount,
    status: "pending",
    method,
  };
  payments.push(newPayment);
  res.status(201).json(newPayment);
};

// PUT update payment status
const updatePaymentStatus = (req, res) => {
  const payment = payments.find(p => p.id === parseInt(req.params.id));
  if (!payment) return res.status(404).json({ message: "Payment not found" });
  payment.status = req.body.status;
  res.json(payment);
};

// DELETE a payment
const deletePayment = (req, res) => {
  const index = payments.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Payment not found" });
  payments.splice(index, 1);
  res.json({ message: "Payment deleted successfully" });
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePaymentStatus,
  deletePayment,
};