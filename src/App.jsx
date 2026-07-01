import { Suspense } from "react";
import "./App.css";
import Users from "./components/Users";

function App() {
  const usersPromise = fetch("http://localhost:5000/users").then((res) =>
    res.json(),
  );
  return (
    <>
      <h1>Simple Crud Server !!!!!</h1>
      <Suspense fallback={<h1>users data is loading.....</h1>}>
        {" "}
        <Users usersPromise={usersPromise}> </Users>
      </Suspense>
    </>
  );
}

export default App;
