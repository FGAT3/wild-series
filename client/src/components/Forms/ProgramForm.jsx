import { Form } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Fonction utilitaire pour obtenir le texte du bouton en fonction de la méthode HTTP
function getButtonText(method) {
  switch (method) {
    case "post":
      return "Ajouter";
    case "put":
      return "Mettre à jour";
    case "delete":
      return "Supprimer";
    default:
      return "Soumettre"; // Cas par défaut pour gérer toute autre méthode
  }
}
// tried to make form that work with post, put & delete
function ProgramForm({
  categories,
  method = "post",
  onSubmit = undefined,
  program = {},
}) {
  // Utilisation d'un état local pour gérer les valeurs du formulaire
  const [formValues, setFormValues] = useState({
    title: "",
    synopsis: "",
    category: "",
    poster: "",
    country: "",
    year: "",
  });

  // Remplir les champs du formulaire si un programme est fourni (pour la mise à jour)
  useEffect(() => {
    if (method === "put" && program) {
      setFormValues({
        title: program.title || "",
        synopsis: program.synopsis || "",
        category: program.category || "",
        poster: program.poster || "",
        country: program.country || "",
        year: program.year || "",
      });
    }
  }, [method, program]);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Rendu conditionnel pour DELETE : affiche seulement un message de confirmation
  if (method === "delete") {
    return (
      <Form method={method} onSubmit={onSubmit}>
        <p>Êtes-vous sûr de vouloir supprimer le programme suivant ?</p>
        <p><strong>Titre:</strong> {program.title}</p>
        <p><strong>Synopsis:</strong> {program.synopsis}</p>
        <p><strong>Année:</strong> {program.year}</p>
        <button type="submit">{getButtonText(method)}</button>
      </Form>
    );
  }

  return (
    <Form method={method} onSubmit={onSubmit}>
      <label htmlFor="title">Titre du programme</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formValues.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="synopsis">Synopsis</label>
      <textarea
        id="synopsis"
        name="synopsis"
        value={formValues.synopsis}
        onChange={handleChange}
        required
      />

      <label htmlFor="category-select">Catégorie</label>
      <select
        name="category"
        id="category-select"
        value={formValues.category}
        onChange={handleChange}
        required
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
        value={formValues.poster}
        onChange={handleChange}
        required
      />

      <label htmlFor="country">Pays</label>
      <input
        type="text"
        id="country"
        name="country"
        value={formValues.country}
        onChange={handleChange}
        required
      />

      <label htmlFor="year">Année</label>
      <input
        type="number"
        id="year"
        name="year"
        value={formValues.year}
        onChange={handleChange}
        required
        min="1800"
        max={new Date().getFullYear()}
      />

      <button type="submit">{getButtonText(method)}</button>
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
  method: PropTypes.oneOf(["post", "put", "delete"]),
  onSubmit: PropTypes.func,
  program: PropTypes.shape({
    title: PropTypes.string,
    synopsis: PropTypes.string,
    category: PropTypes.string,
    poster: PropTypes.string,
    country: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

// Définir les valeurs par défaut pour les props
ProgramForm.defaultProps = {
  method: "post",
  onSubmit: undefined,
  program: {},
};

export default ProgramForm;
