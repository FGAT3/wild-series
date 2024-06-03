const AbstractRepository = require("./AbstractRepository");

class ProgramRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
    super({ table: "program" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "program" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of program
    return rows;
  }

  async create(program) {
    // Execute the SQL INSERT query to add a new program to the "program" table

    const [result] = await this.database.query(
      `insert into ${this.table} (title) values (?)`,

      [program.title]
    );

    // Return the ID of the newly inserted program

    return result.insertId;
  }
}

module.exports = ProgramRepository;
