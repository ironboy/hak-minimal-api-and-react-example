<<<<<<< Updated upstream
import { useLocation } from 'react-router-dom';
import Header from "./partials/Header";
import Main from './partials/Main';
import Footer from './partials/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';
=======
import useFetchJson from './utiltities/useFetchJson';
import { useState } from 'react';
import CreateAnimalForm from './CreateAnimalForm';
>>>>>>> Stashed changes

// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

export default function App() {

<<<<<<< Updated upstream
  // scroll to top when the route changes
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
=======
  const [showAddAnimalForm, setShowAddAnimalForm] = useState(false);

  const [animals, reloadAnimals] = useFetchJson<Animal[]>('/api/animals');

  // update the list of animal and hide the form
  async function updateAfterAddingAnimal() {
    reloadAnimals();
    setShowAddAnimalForm(false);
  }

  // use short circuiting to render nothing (null)
  // before have fetched our animals
  return animals && <section className="animal-list">
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
>>>>>>> Stashed changes

  return <>
    <Header />
    <Main />
    <Footer />
    {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
  </>;
};