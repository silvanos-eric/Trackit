import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Button, Form } from "../components";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userList, onLogin, notifyError } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const exists = checkIfUserExists(formData.email);
    if (!exists) {
      notifyError(`User with email address does not exist!`);
      return;
    }

    const validUser = validateUser(formData);
    if (!validUser) {
      notifyError(`Invalid credentials`);
      return;
    }

    const { id } = userList.find((user) => user.email === formData.email);

    setIsLoading(true);
    onLogin(id);
    setIsLoading(false);

    navigate("/home");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const checkIfUserExists = (email) => {
    const user = userList.find((user) => user.email === email);

    if (user) return true;
    return false;
  };

  const validateUser = ({ email, password }) => {
    const user = userList.find((user) => user.email === email);

    if (user.password === password) return true;
    return false;
  };

  return (
    <>
      <main className="container h-100 d-flex flex-column justify-content-center">
        <Form
          onSubmit={handleSubmit}
          style={{ minWidth: 560 }}
          className="mx-auto bg-white p-4 d-flex flex-column gap-4"
        >
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="email"
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
        </Form>
      </main>
      <ToastContainer />
    </>
  );
};

export { Login };
