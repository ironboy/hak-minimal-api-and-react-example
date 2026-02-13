import { useState, useEffect } from 'react';
import fetchJson from './fetchJson';

export default function useFetchJson<Type>(url: string) {

  // Set the data type of animals using generics <Animal[] | null>
  // (an array of Animal or null )
  const [data, setData] = useState<Type | null>(null);

  // Calling use effect with an empty dependency array []
  // makes it run the function when the component mounts
  useEffect(() => {
    // Since React doesn't allow async functions as a parameter
    // to useEffect, but fetchJson needs to await which requires 
    // it to be in an async function)
    // we create a self-exucuting anononymous async function here
    (async () => {
      setData(await fetchJson(url));
    })();
  }, []);

  // create a function you call to reload data from the same url
  // at a later point
  async function reloadData() {
    setData(await fetchJson(url));
  }

  return [data, reloadData] as const;
}