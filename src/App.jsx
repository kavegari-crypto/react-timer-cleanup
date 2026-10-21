import {useState, useEffect, useCallback} from 'react';


function Timer({montar, desmontar}) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    montar();
    const id = setInterval(() =>{
     setSegundos((prevSegundos)=> prevSegundos + 1); 
    }, 10000); 

       return () => {
          desmontar();
          console.log('Desmontado');
          clearInterval(id);
      };
  }, [montar, desmontar]);
  
   return (
    <div style={{ padding: '10px', background: '#0d0d0d', marginTop: '10px' }}>
      <h2>Tiempo transcurrido: {segundos} segundos</h2>
    </div>
  );
}

function App() {
  const [mostrar, setMostrar] = useState(true);
  const [totalTimers, setTotalTimers] = useState(0);

   const sumarTimer = useCallback(() => setTotalTimers(prev => prev + 1), []);
  const restarTimer = useCallback(() => setTotalTimers(prev => prev - 1), []);

  useEffect(() => {
    console.log(`Total de timers montados: ${totalTimers}`);
  }, [totalTimers]);


  return (
    <div style= {{padding: '20px', fontFamily: 'sans-serif'}}>
      <h2>Ejercicio React</h2>
      <button onClick={() => setMostrar(!mostrar)} style={{padding: '8px 16px', cursor: 'pointer'}}>{mostrar ? "Desmontar":"Montar"}</button>
     
    {mostrar && <Timer montar={sumarTimer} desmontar={restarTimer} />}
      <p style={{ marginTop: '20px', color: '#555' }}>
        Abre la consola (F12). Oculta y muestra el timer varias veces.
      </p>
    </div>
  );


}

export default App;