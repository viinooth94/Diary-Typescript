import React from "react";
import { Provider } from "./context/Cryptage";
import Entry from "./components/AddEntry";
import List from "./components/ShowList";
import "../src/App.css"

const App: React.FC = () => {
  return (
    <Provider>
      <h1>Messages Crypté</h1>
      <Entry />
      <List />
    </Provider>
  );
};

export default App;
