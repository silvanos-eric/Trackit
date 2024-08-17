import { useRef, useState } from "react";
import { Button, Form, Modal } from ".";

const AddExpenseModal = ({ onHide, onSave, ...rest }) => {
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
          <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
            Add Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleChange}
                name="name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleChange}
                name="amount"
              />
            </Form.Group>
            <Button
              ref={submitBtnRef}
              type="submit"
              className="visually-hidden"
            ></Button>
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

export { AddExpenseModal };
