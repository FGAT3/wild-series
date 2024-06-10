import { Form, useLoaderData } from "react-router-dom";
// import ProgramForm from "../components/Forms/ProgramForm";

export default function ProgramEdit() {
  const { program, categories } = useLoaderData();

  return (
    <>
      <h1>Editer le programme</h1>
      <Form method="PUT">
        <label htmlFor="title">Titre du programme</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={program.title}
        />

        <label htmlFor="synopsis">Synopsis</label>
        <textarea
          id="synopsis"
          name="synopsis"
          defaultValue={program.synopsis}
        />

        <label htmlFor="category-select">Catégorie</label>
        <select
          name="category"
          id="category-select"
          defaultValue={program.category_id} // defaultValue ici pour la sélection initiale
        >
          <option value="">-- Catégorie --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="poster">Affiche (URL)</label>
        <input
          type="text"
          id="poster"
          name="poster"
          defaultValue={program.poster}
        />

        <label htmlFor="country">Pays</label>
        <input
          type="text"
          id="country"
          name="country"
          defaultValue={program.country}
        />

        <label htmlFor="year">Année</label>
        <input
          type="number"
          id="year"
          name="year"
          defaultValue={program.year}
        />

        <button type="submit">Mettre à jour</button>
      </Form>

      <Form method="DELETE">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

// Rendu conditionnel pour DELETE : affiche seulement un message de confirmation
//   if (method === "delete") {
//     return (
//       <Form method={method} onSubmit={onSubmit}>
//         <p>Êtes-vous sûr de vouloir supprimer le programme suivant ?</p>
//         <p><strong>Titre:</strong> {program.title}</p>
//         <p><strong>Synopsis:</strong> {program.synopsis}</p>
//         <p><strong>Année:</strong> {program.year}</p>
//         <button type="submit">{getButtonText(method)}</button>
//       </Form>
//     );
//   }
