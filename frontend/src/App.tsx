// error in line no.29 39

import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setName(content.name);
    })();
  }, []);


  const HomeWithName = () => <Home name={name} />;
  const LoginWithSetName = () => <Login setName={setName} />;

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />

        <main className="form-signin">
          <Route path="/" element={<HomeWithName />} />
          <Route path="/login" element={<LoginWithSetName />} />
          <Route path="/register" element={<Register />} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
