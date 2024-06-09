import { Form } from "react-router-dom";
import PropTypes from "prop-types";

function ProgramForm({ categories }) {
  return (
    <Form method="post">
      <label htmlFor="title">Titre du programme</label>
      <input type="text" id="title" name="title" />

      <label htmlFor="synopsis">Synopsis</label>
      <textarea id="synopsis" name="synopsis" />

      <label htmlFor="category-select">Catégorie</label>
      <select name="category" id="category-select">
        <option value="">-- Catégorie --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="poster">Affiche (URL)</label>
      <input type="text" id="poster" name="poster" />

      <label htmlFor="country">Pays</label>
      <input type="text" id="country" name="country" />

      <label htmlFor="year">Année</label>
      <input type="number" id="year" name="year" />

      <button type="submit">Ajouter</button>
    </Form>
  );
}

ProgramForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProgramForm;
