const { ValidationError } = require("../Errors/validationError");
const validator = require("../validation/Author");

class AuthorController {
  constructor(authorRepo) {
    this.authorRepo = authorRepo;
  }

  async createAuthor(body) {
    const { error } = validator.validateAuthor(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    return await this.authorRepo.createNewAuthor(body);
  }

  async getAllAuthor() {
    return await this.authorRepo.getAll();
  }

  async getBooksOfAuthor(id) {
    return await this.authorRepo.getAllBooks(id);
  }
}
module.exports = AuthorController;
