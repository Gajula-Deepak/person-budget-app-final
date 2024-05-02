const router = require("express").Router();
const Expense = require("../models/ExpenseSchema");
const BudgetCategory = require("../models/BudgetCategorySchema");

router.get("/budget-categories", async (req, res) => {
  try {
    const budgetCategories = await BudgetCategory.find({ user: req.user.id });
    res.status(200).json(budgetCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve budgets" });
  }
});

router.post("/budget-category", async (req, res) => {
  try {
    console.log(req.user.id);
    const { categoryName, budgetAmount } = req.body;
    const budgetCategory = await BudgetCategory.create({
      user: req.user.id,
      name: categoryName,
      budgetAmount,
    });
    res.status(201).json(budgetCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create budget category" });
  }
});

router.post("/expense", async (req, res) => {
  try {
    const { budgetCategory, description, amount } = req.body;
    console.log(budgetCategory, description, amount);
    const expense = await Expense.create({
      budgetCategory,
      description,
      amount,
      user: req.user.id,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate(
      "budgetCategory"
    );
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
});

module.exports = router;
