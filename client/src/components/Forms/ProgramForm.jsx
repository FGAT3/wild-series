import { Form } from "react-router-dom";

function ProgramForm() {
  return (
    <Form method="post">
      <label htmlFor="title">Titre du programme</label>
      <input type="text" id="title" name="title" />

      <label htmlFor="synopsis">Synopsis</label>
      <textarea id="synopsis" name="synopsis" />

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

export default ProgramForm;
