const AbstractRepository = require("./AbstractRepository");

class ProgramRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
    super({ table: "program" });
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "program" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of program
    return rows;
  }

  async update(program) {
    // Execute the SQL UPDATE query to update a specific program
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, synopsis = ?, category_id = ?, poster = ?, country = ?, year = ? where id = ?`,
      [
        program.title,
        program.synopsis,
        program.category,
        program.poster,
        program.country,
        program.year,
        program.id
      ]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async create(program) {

      // Execute the SQL INSERT query to add a new program to the "program" table
      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (title, synopsis, category_id, poster, country, year)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          program.title,
          program.synopsis,
          program.category,
          program.poster,
          program.country,
          program.year
        ]
      );

    // Return the ID of the newly inserted program

    return result.insertId;
  }
}

module.exports = ProgramRepository;
