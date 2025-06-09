




const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';


export async function getRandomCatFact() {


return fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((response) => response.json())
      .then((data) => {
        const {fact} = data;
        return fact;
      })
      .catch((error) => {
        console.error('Error fetching cat fact:', error);
        return null
      });


}


