export const config = {
  runtime: 'edge'
};

const systemPrompt = `You are a diagram expert. Your task is to create a Mermaid flowchart diagram based on the user's request.

IMPORTANT: Only output the Mermaid diagram code, nothing else. No explanations or additional text.

Follow these rules:
1. Always start with "graph TD"
2. Use simple node IDs (A, B, C, etc.)
3. Use basic arrows (-->)
4. Put node text in square brackets []
5. Keep diagrams simple and clear
6. Indent each line with 4 spaces
7. Each node should be on its own line
8. Do not add any comments or descriptions

Example input: "Create a flowchart for making tea"
Example output:
graph TD
    A[Start] --> B[Boil Water]
    B --> C[Add Tea Bag]
    C --> D[Wait 3 Minutes]
    D --> E[Remove Tea Bag]
    E --> F[Done]`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'https://excalidraw.com'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.7-sonnet:thinking',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Create a Mermaid flowchart for: ${prompt}` }
        ],
        temperature: 0.1,
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate diagram');
    }

    const generatedResponse = data.choices[0]?.message?.content?.trim();

    if (!generatedResponse || !generatedResponse.startsWith('graph TD')) {
      throw new Error('Invalid diagram generated');
    }

    return new Response(
      JSON.stringify({ generatedResponse }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
