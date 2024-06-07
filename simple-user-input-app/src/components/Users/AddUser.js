import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredUserAge, setEnteredUserAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredUserName.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a Valid Name and Age",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a Valid Age",
      });
      return;
    }

    props.onAddUser(enteredUserName, enteredUserAge);
    setEnteredUserName("");
    setEnteredUserAge("");
  };

  const userNameHandler = (event) => {
    setEnteredUserName(event.target.value);
  };
  const userAgeHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };

  const errorHandler =()=>{
    setError(null)
  }

  return (
    <div>
      {error && (
        <ErrorModal title={error.title} message={error.message}  onConfirm={errorHandler}/>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            value={enteredUserName}
            id="username"
            type="text"
            onChange={userNameHandler}
          />
          <label htmlFor="age">Age </label>
          <input
            value={enteredUserAge}
            id="age"
            type="number"
            onChange={userAgeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
