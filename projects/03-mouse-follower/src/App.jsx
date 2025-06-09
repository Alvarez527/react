import { useEffect } from 'react';
import { useState } from 'react';




function App() {


  const [enabled, setEnabled] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

const handleMove = (event) => {

      const { clientX, clientY } = event;
      setPosition({
        x: clientX , // Ajuste para centrar el círculo
        y: clientY // Ajuste para centrar el círculo
      });
    }



  useEffect(() => {

      
    console.log(enabled)
    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }

    // Limpiar el evento al desmontar el componente
    // o al cambiar el estado de enabled
    // para evitar fugas de memoria
    // y evitar que se acumulen múltiples listeners
    // en caso de que se active y desactive varias veces

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
    
  },  [enabled])

  return (

    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>

      
      <h3>Proyecto 3</h3>
      <button onClick={ ()=> setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'}
      </button>
    </main>
  )

}

export default App
