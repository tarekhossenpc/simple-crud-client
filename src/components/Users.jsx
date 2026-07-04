import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  console.log(users);
  //addUserhandler
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Successfully send data to the database !!!");
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
        }
        console.log("after send data to the database:", data);
      });
    e.target.reset();
  };
  //deletehandler
  const handleDeleteButton = (id) => {
    console.log("delete button clicked", id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          alert("Successfully delete a user from the database");
          const remainingUsers = users.filter((users) => users._id !== id);
          setUsers(remainingUsers);
        }
      });
  };
  return (
    <div>
      {/* add user form start */}
      <h3>Add A User</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {/* add user form end */}
      <hr />
      {/* users info start */}
      <div>
        <h2>Total Users :{users.length}</h2>
        {users.map((user) => (
          <h3 key={user._id}>
            {user.name} : {user.email}{" "}
            <Link to={`/users/${user._id}`}>User Details</Link> 
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handleDeleteButton(user._id)}>X</button>
          </h3>
        ))}
      </div>
      {/* users info end */}
    </div>
  );
};

export default Users;
