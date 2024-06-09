const tables = require("../../database/tables");

// Some data to make the trick

// const categories = [
//   {
//     id: 1,
//     name: "Science-Fiction",
//   },
//   {
//     id: 2,
//     name: "Comédie",
//   },
// ];

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

// Declare the actions

const browse = async (req, res) => {
  try {
    const categoriesFromDB = await tables.category.readAll();

    if (req.query.q != null) {
      const searchQuery = normalizeString(req.query.q);

      const filteredCategories = categoriesFromDB.filter((category) =>
        normalizeString(category.name).includes(searchQuery)
      );

      res.json(filteredCategories);
    } else {
      res.json(categoriesFromDB);
    }
  } catch (error) {
    console.error("Error getting categories: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const read = async (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  const category = await tables.category.read(parsedId);
  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the category data from the request body and params
  const category = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.category.update(category);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the category data from the request body
  const category = req.body;
  try {
    // Insert the category into the database
    const insertId = await tables.category.create(category);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted category
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the category from the database
    await tables.category.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
