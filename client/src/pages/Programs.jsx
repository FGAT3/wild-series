import { useLoaderData } from "react-router-dom";
import ProgramForm from "../components/Forms/ProgramForm";
import ProgramList from "../components/Lists/ProgramList";

function Programs() {
  const { programs, categories } = useLoaderData();
  return (
    <>
      <h1>Programmes</h1>
      <ProgramForm categories={categories} method="post" />
      <ProgramList programs={programs} />
    </>
  );
}

export default Programs;
