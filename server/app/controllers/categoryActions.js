const tables = require("../../database/tables");

// Some data to make the trick

const categories = [
  {
    id: 1,
    name: "Science-Fiction",
  },
  {
    id: 2,
    name: "Comédie",
  },
];

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

const read = (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  const category = categories.find((p) => p.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

module.exports = { browse, read };
