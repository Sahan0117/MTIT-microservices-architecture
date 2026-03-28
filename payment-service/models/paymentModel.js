// Simulating a database with an in-memory array
let payments = [
  { id: 1, orderId: 101, amount: 2500.00, status: "completed", method: "card" },
  { id: 2, orderId: 102, amount: 1200.50, status: "pending",   method: "cash" },
];

module.exports = payments;