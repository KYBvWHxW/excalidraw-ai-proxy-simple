# Excalidraw AI Proxy

A simple proxy server for the Excalidraw AI integration that generates Mermaid diagrams using OpenRouter's Claude 3.7 Sonnet model.

## API Endpoints

### POST /api/generate

Generates a Mermaid diagram based on a text prompt.

**Request Body:**
```json
{
  "prompt": "Create a flowchart for..."
}
```

**Response:**
```json
{
  "generatedResponse": "graph TD\n    A[Start] --> B[...]"
}
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `OPENROUTER_API_KEY`: Your OpenRouter API key
