import "./index.css";
import React from "react";
import { ListOfUsers } from "./components/ListOfUsers";
import { CreateNewUser } from "./components/CreateNewUser";
import { Toaster } from "sonner";

import "./App.css";

function App() {
  return (
    <>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  );
}

export default App;
