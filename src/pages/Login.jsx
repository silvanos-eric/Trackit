import { Button, Form } from "../components";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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
            <Form.Control required type="text" placeholder="email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="password" />
          </Form.Group>
          <Button type="submit" variant="dark" className="w-100">
            Sign In
          </Button>
        </Form>
      </main>
    </>
  );
};

export { Login };
