const express = require("express");
const { handleAsync } = require("../../Errors/HandleAsync");
const { admin } = require("../../middlewares/Admin");
const router = express.Router();

const itemTypeRouter = (itemController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const itemType = await itemController.getAllItemTypes();
      res.status(200).json({ success: true, data: itemType });
    })
  );

  router.post(
    "/",
    admin,
    handleAsync(async (req, res) => {
      const newItemType = await itemController.createNewItemType(req.body);
      res.status(200).json({ success: true, data: newItemType });
    })
  );

  router.delete(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      await itemController.deleteItemTypeById(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "ItemType deleted successfully" });
    })
  );

  router.patch(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      const updated = await itemController.updateItemType(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updated });
    })
  );

  return router;
};

module.exports = itemTypeRouter;
