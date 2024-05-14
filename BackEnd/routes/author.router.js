const express = require("express");
const { handleAsync } = require("../handleErrors/handleAsync");
const router = express.Router();

const authorRouter = (authorController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const authors = await authorController.getAllAuthor();
      res.status(200).json({ success: true, data: authors });
    })
  );

  router.post(
    "/",
    handleAsync(async (req, res) => {
      const newAuthor = await authorController.createAuthor(req.body);
      res.status(201).json({ success: true, data: newAuthor });
    })
  );

  router.get(
    "/books/:id",
    handleAsync(async (req, res) => {
      const allBooks = await authorController.getBooksOfAuthor(req.params.id);
      res.status(200).json({ success: true, data: allBooks });
    })
  );

  return router;
};

module.exports = authorRouter;
