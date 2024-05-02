const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  budgetCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BudgetCategory",
    required: true,
    index: true,
  },
  description: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  expenseDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
