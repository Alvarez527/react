import React, { use } from 'react';
import {useEffect, useState} from 'react'
import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';

const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/toReplace?size=50&color=red&json=true`





export function App() {

   const {fact, refreshFact} = useCatFact(); 
   const {imageUrl} = useCatImage({fact});
// Custom Hook para obtener la imagen del gato
// Se le pasa el fact como parametro para que se ejecute cuando este cambie
// El hook se encargara de hacer la peticion a la API y devolver la url de la imagen

   useEffect(() => {
    
    refreshFact();
   }, []);

    // Este codigo se ejecutara solo si fact

    const handleClick = () => {

      refreshFact();
    }


  return (
    <main>
        <button onClick={handleClick}>Get New Fact</button>
        <h1>App de gatitos</h1>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first words for ${fact}`} />}
    </main>
    
  );
}