export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Excalidraw AI Proxy</h1>
      <p>This is an API proxy for generating Mermaid diagrams using OpenRouter's Claude 3.7 Sonnet model.</p>
      <h2>API Usage</h2>
      <pre>
        {`POST /api/generate
Content-Type: application/json

{
  "prompt": "Create a flowchart for..."
}`}
      </pre>
    </div>
  );
}
