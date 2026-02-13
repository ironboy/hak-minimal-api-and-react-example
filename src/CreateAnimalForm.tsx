import { useState } from 'react';
import fetchJson from './utiltities/fetchJson';

export default function CreateAnimalForm(
  { updateAfterAddingAnimal }:
    { updateAfterAddingAnimal: Function; }
) {

  // Here we use controlled input
  // a state that is sync with a form
  // the values state are always the same values
  // that shown in the form
  // and when the user types in the form
  // we update the state

  const [formData, setFormData] = useState({
    name: '',
    species: ''
  });

  const { name, species } = formData;

  function updateFormData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    // Creating a new object we allt the properties
    // from formData, but overwriting the property
    // corresponding to the form field that is changing
    // with the new value the user has entered
    setFormData({ ...formData, [name]: value });
  }

  async function sendForm(event: React.FormEvent<HTMLFormElement>) {

    // Don't do the default thing that a broswer does with forms
    // (a page reload)
    event.preventDefault();

    // Send the form data to the rest api
    await fetchJson('/api/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    // calling a function declared in App that we have recieved
    // as a prop (sent from App when it mounted this component)
    updateAfterAddingAnimal();
  }

  return <form onSubmit={sendForm}>
    <label>
      <span>Name</span>
      <input
        type="text"
        placeholder="The name of the animal"
        name="name"
        value={name}
        onChange={updateFormData}
      />
    </label>
    <label>
      <span>Species</span>
      <input
        type="text"
        placeholder="The animal species"
        name="species"
        value={species}
        onChange={updateFormData}
      />
    </label>
    <button type="submit">Add the animal</button>
  </form>;
}