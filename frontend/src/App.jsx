import React, { useState, useEffect } from 'react';
import GatewayDiagram from './components/GatewayDiagram.jsx';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/map');
      const result = await response.json();
      if (result.modified || data.length === 0) {
        // Converti la struttura dei dati nel formato atteso dal diagramma
        const formattedData = result.data.flatMap(gateway =>
          gateway.routes.map(route => ({
            gateway: gateway.gateway,
            backendApi: route.backend,
            path: route.path
          }))
        );
        setData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Carica i dati iniziali
    fetchData();

    // Imposta il polling ogni 5 secondi
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Gateway Diagram</h1>
      {isLoading ? (
        <div>Loading diagram data...</div>
      ) : (
        <GatewayDiagram data={data} />
      )}
    </div>
  );
}

export default App;