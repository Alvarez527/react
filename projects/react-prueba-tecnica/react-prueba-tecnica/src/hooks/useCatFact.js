
import { useState, useEffect } from 'react';
import { getRandomCatFact } from '../services/facts';

export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact =  () => { 
    getRandomCatFact().then(newFact => setFact(newFact));
  }

  useEffect(refreshFact, []);

  return { fact, refreshFact };
}