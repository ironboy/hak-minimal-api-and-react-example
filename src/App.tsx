import fetchJson from './utilities/fetchJson';
import { useEffect } from 'react';
import useStateObject from './utilities/useStateObject';

interface Animal {
  id: number;
  name: string;
  species: string;
}

interface State {
  animals: Animal[] | null;
  darkMode: boolean;
}

export default function App() {

  const [appState, setAppState] = useStateObject<State>({
    animals: null,
    darkMode: false
  });

  const { animals, darkMode } = appState;

  // grab the body element depending on darkMode value
  // call add or remove on it classlist 
  // to add or remove the class dark-mode
  document.body.classList[darkMode ? 'add' : 'remove']('dark-mode');

  // useEffect with an empty dependency array
  // run when the component mounts!
  useEffect(() => {
    // Since you can't give useEffect an async function
    // as argument we wrap our fetchJson, that needs await
    // inside a self-exucting anonymous function
    (async () => {
      setAppState('animals', await fetchJson('/api/animals'));
    })();
  }, []);

  // use short-circuiting to just return null as long
  // as animals is null, but the whole jsx-structure once 
  // animals has a truthy value
  return animals && <>
    <button onClick={() => setAppState('darkMode', !darkMode)}>
      {!darkMode ? 'Activate dark mode' : 'Deactivate dark mode'}
    </button>
    <h1>Animals</h1>
    {animals.map(({ id, name, species }) => <article key={id}>
      <h3>{name}</h3>
      <p>{name} is a {species}.</p>
    </article>)}
  </>;
};