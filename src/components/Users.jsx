import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  console.log(users);
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
  return (
    <div>
      <h3>Add A User</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {users.map((user) => (
          <h2 key={user._id}>
            {user.name} : {user.email}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Users;
