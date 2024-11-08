import React, { useContext, useState } from "react";
import { DiaryContext } from "../context/Cryptage";
import PasswordComponent from "./Password";

const ListComponent: React.FC = () => {
  const { entries, deleteEntry } = useContext(DiaryContext);
  const [selectedEntry, setSelectedEntry] = useState<{
    id: string;
    encryptedText: string;
  } | null>(null);
  const [decryptedText, setDecryptedText] = useState("");

  const handleRead = (entry: { id: string; encryptedText: string }) => {
    setSelectedEntry(entry);
    setDecryptedText("");
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry(null);
      setDecryptedText("");
    }
  };

  return (
    <div>
      <h3>Listes des entrées : </h3>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <button onClick={() => handleRead(entry)}>Lire</button>
            <button onClick={() => handleDelete(entry.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      {selectedEntry && (
        <PasswordComponent
          encryptedText={selectedEntry.encryptedText}
          onDecrypt={(text) => setDecryptedText(text)}
        />
      )}
      {decryptedText && <p>Le message décrypter : {decryptedText}</p>}
    </div>
  );
};

export default ListComponent;
