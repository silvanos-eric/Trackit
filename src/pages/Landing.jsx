import { Link } from "react-router-dom";

import landingPageBgImage from "../assets/landing-page-bg-image.png";
import { Image } from "../components";

const Landing = () => (
  <>
    <header className="text-center">
      <h1 className="fs-1 fw-bold mt-4">Trackit.</h1>
      <h2>All your expenses in one place</h2>
    </header>
    <main className="text-center">
      <Link to="/register">
        <button
          className="mt-4 text-white btn"
          style={{ backgroundColor: "#FE6D00" }}
        >
          Get Started
        </button>
      </Link>
      <Image src={landingPageBgImage} alt="" className="d-block mx-auto mt-4" />
    </main>
  </>
);

export { Landing };
