const express = require("express");
const router = express.Router();

const itemRouter = (itemController) => {
  router.get("/", async (req, res) => {
    try {
      const allItems = await itemController.GetAllItems();
      res.status(200).json({ success: true, data: allItems });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newItem = await itemController.AddItem(
        req.body,
        req.body.itemType,
        req.body.category
      );
      res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await itemController.DeleteItem(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "item deleted successfully" });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const item = await itemController.UpdateItem(
        req.params.id,
        req.body,
        req.body.category
      );
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = itemRouter;
