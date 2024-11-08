import React, { useState, useContext } from "react";
import { DiaryContext } from "../context/Cryptage";

const Entry: React.FC = () => {
  const { addEntry } = useContext(DiaryContext);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const handleAddEntry = () => {
    addEntry(text, password);
    setText("");
    setPassword("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Nouvelle entrée</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrée votre message ici"
        style={{
          width: "100%",
          marginBottom: "18px",
          padding: "18px",
          fontSize: "18px",
          boxSizing: "border-box",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Entrer un mot de passe ici "
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={handleAddEntry}
        style={{ padding: "20px 20px", fontSize: "16px" }}
      >Ajouter</button>
    </div>
  );
};

export default Entry;
