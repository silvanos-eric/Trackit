import { useState } from "react";

import eyeCloseIcon from "../assets/eye-close.svg";
import eyeOpenIcon from "../assets/eye-open.svg";
import { Badge, Button, Image, ListGroup } from "../components";

const Home = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);
  const updateBalance = () => {
    console.log("update balance");
  };

  return (
    <>
      <header>
        <h1 className="fw-bold text-center mt-5">
          Good Morning, <br />
          Silvanos.
        </h1>
      </header>
      <main className="text-center mt-5">
        <section>
          <p className="fs-2 fw-bold">
            Current Balance: 999{" "}
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={toggleInfo}
            >
              <Image src={showInfo ? eyeCloseIcon : eyeOpenIcon} />
            </Button>
          </p>
          <Button
            variant="dark"
            style={{ minWidth: 200 }}
            onClick={updateBalance}
          >
            Update Balance
          </Button>
        </section>
        <section>
          <h2 className="mt-5 fw-bold">Expense List</h2>
          <Button
            className="mt-2"
            style={{
              minWidth: 150,
              backgroundColor: "#FE6D00",
              border: "#FE6D00",
            }}
          >
            Add Expense
          </Button>
          <ListGroup style={{ maxWidth: 300 }} className="mx-auto mt-4">
            <ListGroup.Item className="d-flex align-items-center justify-content-between">
              <p className="m-0">An Item</p>
              <Badge bg="dark">23</Badge>
            </ListGroup.Item>
          </ListGroup>
        </section>
      </main>
    </>
  );
};

export { Home };
