// See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

/* To make a PUT or POST (something with a request body use the following options)
   
   {
     method: 'POST', [or 'PUT']
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(data)
   }
   
   But GET doesn't need any options (default is GET) and DELETE only need the method

   {
     method: 'DELETE'
   }
   
*/

export default async function fetchJson(url: string, options = {}) {
  // Wait for a response from the REST api
  let response = await fetch(url, options);

  // Unpack/deserialize json into a data structure from the reponse
  let data = await response.json();

  return data;
}