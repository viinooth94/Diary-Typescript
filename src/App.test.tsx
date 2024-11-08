import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { waitFor, } from '@testing-library/react';


test("Vérifie la saisie dans le textarea", () => {
  render(<App />);
  
  const textarea = screen.getByPlaceholderText("Entrée votre message ici");
  userEvent.type(textarea, "Mon premier message" );
  expect(textarea).toHaveValue("Mon premier message");
});

test("Vérifie la saisie du mot de passe", () => {
  render(<App />);
  
  const passwordInput = screen.getByPlaceholderText("Entrer un mot de passe ici");
  userEvent.type(passwordInput, "password123" );
  
  expect(passwordInput).toHaveValue("password123");
});

test('Clique sur le bouton ajouter, le boutton lire, et descryptage du message Puis suppression', async () => {
  render(<App />)
  //test boutton ajouter
  const textarea = screen.getByPlaceholderText("Entrée votre message ici");
  userEvent.type(textarea, "Mon premier message" );
  expect(textarea).toHaveValue("Mon premier message");

  const passwordInput = screen.getByPlaceholderText("Entrer un mot de passe ici");
  userEvent.type(passwordInput, "password123" );
  expect(passwordInput).toHaveValue("password123");

  const ButtonAjouter = screen.getByText("Ajouter");
  userEvent.click(ButtonAjouter)

  await waitFor(() => {
    expect(screen.queryByText('Lire')).toBeInTheDocument();
    expect(screen.queryByText("Supprimer")).toBeInTheDocument();
  })
  // test boutton lire
  const ButtonLire = screen.getByText("Lire");
  userEvent.click(ButtonLire);

  await waitFor(() => {
    expect(screen.getByPlaceholderText("Entrer le mot de passe")).toBeInTheDocument();
    expect(screen.getByText("Decrypter le message")).toBeInTheDocument();
  });

  //Decryptage du message
  const decryptpasswordInput = screen.getByPlaceholderText("Entrer le mot de passe");
  userEvent.type(decryptpasswordInput, "password123" );
  expect(decryptpasswordInput).toHaveValue("password123");

  const decryptButton = screen.getByText("Decrypter le message");
  userEvent.click(decryptButton );

  await waitFor(() => {
    expect(screen.getByText("Le message décrypter : Mon premier message")).toBeInTheDocument();
  });

  //Suppression du message
  const ButtonSupprimer = screen.getByText("Supprimer");
  userEvent.click(ButtonSupprimer);

  await waitFor(() => {
    expect(screen.queryByText("Lire")).not.toBeInTheDocument();
    expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
  });

});

