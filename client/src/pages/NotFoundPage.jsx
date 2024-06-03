import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import img404 from "../assets/images/erreur-404-illustration-concept-paysage.jpg";

function NotFoundPage() {
  return (
    <>
      <Navbar />
      <p>Vous avez rencontré un obstacle inattendu : la page 404.</p>
      <Link to="/">
        <img src={img404} alt="" className="error-img" />
      </Link>
      <p>
        Cliquez sur l&apos;image ci-dessus ou sur{" "}
        <Link to="/" className="link-404">
          ce lien
        </Link>{" "}
        pour revenir à la page d&apos;accueil
      </p>
    </>
  );
}

export default NotFoundPage;
