import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

function GatewayDiagram({ data }) {
  const diagramRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inizializza Mermaid una sola volta
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis'
      }
    });
    setIsInitialized(true);
  }, []);

  const sanitize = (str) => str.replace(/[^a-zA-Z0-9-]/g, '_');

  const generateMermaidCode = (data) => {
    if (!data?.length) return '';
    return data.reduce((acc, item) => {
      const gatewayId = sanitize(item.gateway);
      const backendId = sanitize(item.backendApi);
      return (
        acc +
        `${gatewayId}["Gateway: ${item.gateway}"]\n` +
        `${backendId}["Backend: ${item.backendApi}"]\n` +
        `${gatewayId} -->|"${item.path}"| ${backendId}\n`
      );
    }, 'graph TD\n');
  };

  // Rendering sicuro e ottimizzato
  useLayoutEffect(() => {
    if (!isInitialized || !data?.length) return;

    const render = async () => {
      if (!diagramRef.current) return;
      const mermaidCode = generateMermaidCode(data);

      try {
        const { svg } = await mermaid.render(`diagram-${Date.now()}`, mermaidCode);
        diagramRef.current.innerHTML = svg;

        const svgElement = diagramRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.background = 'transparent'; // Rimuove lo sfondo bianco
        }
      } catch (err) {
        diagramRef.current.innerHTML = `<div class="error">Diagram render error: ${err.message}</div>`;
      }
    };

    render();
  }, [data, isInitialized]);

  return (
    <div className="gateway-diagram-container" style={{ width: '100%', height: '100%' }}>
      <div ref={diagramRef} className="mermaid" />
    </div>
  );
}

export default GatewayDiagram;
