import { useRef, useState } from "react";
import { Button, Form, Modal } from ".";

const UpdateBalanceModal = ({ onHide, onSave, balance, ...rest }) => {
  const [formData, setFormData] = useState({});
  const submitBtnRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <Modal
        {...rest}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Balance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-center fs-4">
            Current Balance: {balance ?? "N/A"}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New Balance</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={handleChange}
                name="balance"
              />
              <Button
                ref={submitBtnRef}
                type="submit"
                className="visually-hidden"
              ></Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { UpdateBalanceModal };
