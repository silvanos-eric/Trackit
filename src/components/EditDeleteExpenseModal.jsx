import { useRef, useState } from "react";

import { Badge, Button, Form, Image, ListGroup, Modal } from ".";
import deleteIcon from "../assets/delete-icon.svg";

const EditDeleteExpenseModal = ({
  onHide,
  onSave,
  expense,
  onDelete,
  ...rest
}) => {
  const [formData, setFormData] = useState({
    name: expense?.name ?? "",
    amount: expense?.amount ?? 0,
  });
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
    <Modal
      {...rest}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-bold mx-auto"
        >
          Edit / Delete Expense
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className="d-flex flex-row justify-content-between">
          <ListGroup.Item className="d-flex align-items-center justify-content-between flex-grow-1">
            <p className="m-0">{expense?.name ?? "N/A"}</p>
            <Badge bg="dark">{expense?.amount ?? 0}</Badge>
          </ListGroup.Item>
          <Button variant="none" onClick={onDelete}>
            <Image src={deleteIcon} height={40} />
          </Button>
        </ListGroup>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={handleChange} name="name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" onChange={handleChange} name="amount" />
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
  );
};

export { EditDeleteExpenseModal };
