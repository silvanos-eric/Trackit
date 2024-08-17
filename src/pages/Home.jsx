import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import eyeCloseIcon from "../assets/eye-close.svg";
import eyeOpenIcon from "../assets/eye-open.svg";
import {
  AddExpenseModal,
  Badge,
  Button,
  EditDeleteExpenseModal,
  Image,
  ListGroup,
  UpdateBalanceModal,
} from "../components";
import "./Home.css";

const Home = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showUpdateBalanceModal, setShowUpdateBalanceModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const { userList, currentUserId, onUpdateUser, notifyError, notifySuccess } =
    useOutletContext();

  const user = userList.find((user) => user.id === currentUserId);

  const toggleInfo = () => setShowInfo(!showInfo);
  const updateBalance = () => {
    setShowUpdateBalanceModal(true);
  };
  const addExpense = () => {
    setShowAddExpenseModal(true);
  };

  const handleUpdateBalance = (newBalance) => {
    const updatedUser = { ...user, ...newBalance };
    onUpdateUser(updatedUser);
    setShowUpdateBalanceModal(false);
    notifySuccess("Updated Balance Successfully.");
  };

  const handleAddExpense = (newExpense) => {
    if (
      user.expenses.find(
        (e) => e.name.toLowerCase() === newExpense.name.toLowerCase()
      )
    ) {
      notifyError("Expense Already Exists!");
      return;
    }
    const newExpenseList = [...user.expenses, newExpense];
    const updatedUser = { ...user, expenses: [...newExpenseList] };

    onUpdateUser(updatedUser);
    notifySuccess("Expense Added Successfully");
    setShowAddExpenseModal(false);
  };

  const handleEditExpense = (newAmount) => {
    const updatedExpense = { ...selectedExpense, amount: newAmount };

    const newExpenseList = user.expenses.map((e) =>
      e.name.toLowerCase() === updatedExpense.name.toLowerCase()
        ? updatedExpense
        : e
    );

    const updatedUser = { ...user, expenses: [...newExpenseList] };
    onUpdateUser(updatedUser);
    notifySuccess("Updated Expsense Successfully.");
    setShowEditDeleteModal(false);
  };

  const handleDeleteExpense = () => {
    const newExpenseList = user.expenses.filter(
      (e) => e.name !== selectedExpense.name
    );

    const updatedUser = { ...user, expenses: [...newExpenseList] };
    onUpdateUser(updatedUser);
    notifySuccess("Deleted Expense Successfully.");
    setShowEditDeleteModal(false);
  };

  return (
    <>
      <header>
        <h1 className="fw-bold text-center mt-5">
          Good Morning, <br />
          {user.name}.
        </h1>
      </header>
      <main className="text-center mt-5">
        <section>
          <p className="fs-2 fw-bold d-inline m-0">
            Current Balance:{" "}
            <span className={`${!showInfo && "blur"}`}>{user.balance}</span>{" "}
          </p>
          <Button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={toggleInfo}
          >
            <Image src={showInfo ? eyeCloseIcon : eyeOpenIcon} />
          </Button>
          <Button
            variant="dark"
            style={{ minWidth: 200 }}
            onClick={updateBalance}
            className="d-block mx-auto"
            disabled={!showInfo}
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
            onClick={addExpense}
            disabled={!showInfo}
          >
            Add Expense
          </Button>
          <ListGroup style={{ maxWidth: 300 }} className="mx-auto mt-4">
            {user.expenses.length > 0 &&
              user.expenses.map((expense) => (
                <ListGroup.Item
                  key={expense.name}
                  className={`d-flex align-items-center justify-content-between warning-hover ${
                    !showInfo && "blur"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    showInfo && setShowEditDeleteModal(true);
                    showInfo && setSelectedExpense(expense);
                  }}
                >
                  <p className="m-0">{expense.name}</p>
                  <Badge bg="dark">{expense.amount}</Badge>
                </ListGroup.Item>
              ))}
            {user.expenses.length < 1 && <p className="lead">No Expenses</p>}
          </ListGroup>
        </section>
      </main>
      <UpdateBalanceModal
        show={showUpdateBalanceModal}
        balance={user.balance}
        onHide={() => setShowUpdateBalanceModal(false)}
        onSave={handleUpdateBalance}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        onHide={() => setShowAddExpenseModal(false)}
        onSave={handleAddExpense}
      />
      <EditDeleteExpenseModal
        show={showEditDeleteModal}
        onHide={() => setShowEditDeleteModal(false)}
        onSave={handleEditExpense}
        onDelete={handleDeleteExpense}
        expense={selectedExpense}
      />
    </>
  );
};

export { Home };
