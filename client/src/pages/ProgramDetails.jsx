import { Link, useLoaderData } from "react-router-dom";

function ProgramDetails() {
  const program = useLoaderData();
  return (
    <>
      <h1>{program.title}</h1>
      <p>Année: {program.year}</p>
      { program.poster && <img src={program.poster} alt={`poster of ${program.title}`} />}
      <p>Synopsis : {program.synopsis}</p>
      <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
    </>
  );
}

export default ProgramDetails;
