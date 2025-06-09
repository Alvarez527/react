
import { useEffect, useState } from 'react';

const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/toReplace?size=50&color=red&json=true`




export function useCatImage({fact}) {

    const[imageUrl, setImageUrl] = useState();


    useEffect(() => { 
    
        //Si fact es nulo no lo ejecutes
        if(!fact) return;
        const threeFirstWords = fact.split(' ',3);
        console.log(threeFirstWords);

        fetch(CAT_ENDPOINT_IMAGE_URL.replace('toReplace', threeFirstWords.join(' ')))
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');   
                }
                 return res.json(); 
            })
            .then((data) => {
                const {url} = data;
                setImageUrl(url);
                
            })
            .catch((error) => {
                console.error('Error fetching cat image:', error);
            });

    }, [fact]);

    

    return {imageUrl}
}
