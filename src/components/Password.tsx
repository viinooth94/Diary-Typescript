import React, { useState } from "react";
import CryptoJS from "crypto-js";

interface PasswordComponentProps {
  onDecrypt: (decryptedText: string) => void;
  encryptedText: string;
}

const PasswordComponent: React.FC<PasswordComponentProps> = ({
  onDecrypt,
  encryptedText,
}) => {
  const [password, setPassword] = useState("");

  const handleDecrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, password);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      onDecrypt(decryptedText);
    } catch (e) {
      alert("Erreur ! Mot de passe incorrect ");
    }
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Entrer le mot de passe"
      />
      <button onClick={handleDecrypt}>Decrypter le message</button>
    </div>
  );
};

export default PasswordComponent;
