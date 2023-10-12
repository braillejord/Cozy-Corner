import React from "react";
import CheckSession from "./CheckSession"
import { UserProvider } from "./context/UserContext";


function App() {
  return (
      <UserProvider>
        <CheckSession/>
      </UserProvider>
  )
}

export default App;