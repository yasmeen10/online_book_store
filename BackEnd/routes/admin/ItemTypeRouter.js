const express = require("express");
const { handleAsync } = require("../../handleErrors/handleAsync");
const router = express.Router();

const itemTypeRouter = (itemController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const itemType = await itemController.getItemTypes();
      res.status(200).json({ success: true, data: itemType });
    })
  );

  router.post(
    "/",
    handleAsync(async (req, res) => {
      const newItemType = await itemController.AddItemType(req.body);
      res.status(200).json({ success: true, data: newItemType });
    })
  );

  router.delete(
    "/:id",
    handleAsync(async (req, res) => {
      await itemController.DeleteItemType(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "ItemType deleted successfully" });
    })
  );

  router.patch(
    "/:id",
    handleAsync(async (req, res) => {
      const updated = await itemController.UpdateItemType(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updated });
    })
  );

  return router;
};

module.exports = itemTypeRouter;