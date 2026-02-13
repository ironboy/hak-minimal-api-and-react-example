import { useState, useEffect } from 'react';
import fetchJson from './utiltities/fetchJson';
import CreateAnimalForm from './CreateAnimalForm';

// Declare an interface that matches the objects
// in the array we will recieve from the rest api call
interface Animal {
  id: number;
  name: string;
  species: string;
}

export default function App() {

  const [showAddAnimalForm, setShowAddAnimalForm] = useState(false);

  // Set the data type of animals using generics <Animal[] | null>
  // (an array of Animal or null )
  const [animals, setAnimals] = useState<Animal[] | null>(null);

  // Calling use effect with an empty dependency array []
  // makes it run the function when the component mounts
  useEffect(() => {
    // Since React doesn't allow async functions as a parameter
    // to useEffect, but fetchJson needs to await which requires 
    // it to be in an async function)
    // we create a self-exucuting anononymous async function here
    (async () => {
      setAnimals(await fetchJson('/api/animals'));
    })();
  }, []);

  // update the list of animal and hide the form
  async function updateAfterAddingAnimal() {
    setAnimals(await fetchJson('/api/animals'));
    setShowAddAnimalForm(false);
  }

  // use short circuiting to render nothing (null)
  // before have fetched our animals
  return animals && <section class="animal-list">
    <h1>Animals</h1>
    <button className="showForm" onClick={() => setShowAddAnimalForm(!showAddAnimalForm)}>
      {showAddAnimalForm ? 'Hide the form' : 'Show a form to add an animal'}
    </button>
    {showAddAnimalForm && <CreateAnimalForm {...{ updateAfterAddingAnimal }} />}
    {animals.map(({ id, name, species }) => <article key={id}>
      <h3>{name}</h3>
      <p>{name} is a {species}.</p>
    </article>)}
  </section>;

};