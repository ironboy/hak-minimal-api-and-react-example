import fetchJson from './utilities/fetchJson';
import {useState, useEffect} from 'react';

interface Animal {
  id: number;
  name: string;
  species: string;
}

export default function App() {

  const [animals, setAnimals] = useState<Animal[] | null>(null);

  // useEffect with an empty dependency array
  // run when the component mounts!
  useEffect(() => {
   // Since you can't give useEffect an async function
   // as argument we wrap our fetchJson, that needs await
   // inside a self-exucting anonymous function
   (async () => {
     setAnimals(await fetchJson('/api/animals'));
   })();
  }, []);

  // use short-circuiting to just return null as long
  // as animals is null, but the whole jsx-structure once 
  // animals has a truthy value
  return animals && <>
    <h1>Animals</h1>
    {animals.map(({id, name, species}) => <article key={id}>
      <h3>{name}</h3>
      <p>{name} is a {species}.</p>
    </article>)}
  </>
};