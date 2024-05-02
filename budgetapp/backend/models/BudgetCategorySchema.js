const mongoose = require("mongoose");

const budgetCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Added uniqueness constraint
    index: true, // Index added for faster queries
  },
  budgetAmount: {
    type: Number,
    required: true,
    min: 0, // Added validation for positive budget
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Index added for faster queries
  },
});

const BudgetCategory = mongoose.model("BudgetCategory", budgetCategorySchema);

module.exports = BudgetCategory;
