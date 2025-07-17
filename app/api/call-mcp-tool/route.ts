import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { toolName, parameters } = await request.json();

    // Validate required fields
    if (!toolName) {
      return NextResponse.json({ error: 'Tool name is required' }, { status: 400 });
    }

    // Create JSON-RPC 2.0 request for the XMCP server
    const rpcRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: parameters || {},
      },
    };

    // Call the XMCP server
    const mcpResponse = await fetch('http://localhost:3002/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcRequest),
    });

    if (!mcpResponse.ok) {
      throw new Error(`XMCP server error: ${mcpResponse.status}`);
    }

    const data = await mcpResponse.json();

    // Handle JSON-RPC errors
    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || 'XMCP tool execution failed' },
        { status: 400 }
      );
    }

    // Return the result
    return NextResponse.json({
      success: true,
      result: data.result,
      toolName,
    });
  } catch (error) {
    console.error('Error calling XMCP tool:', error);
    return NextResponse.json(
      { error: 'Failed to call XMCP tool. Make sure the XMCP server is running on port 3002.' },
      { status: 500 }
    );
  }
}

// Also handle GET for testing
export async function GET() {
  try {
    // Test connection to XMCP server by listing available tools
    const rpcRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/list',
      params: {},
    };

    const mcpResponse = await fetch('http://localhost:3002', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcRequest),
    });

    if (!mcpResponse.ok) {
      throw new Error(`XMCP server error: ${mcpResponse.status}`);
    }

    const data = await mcpResponse.json();

    return NextResponse.json({
      success: true,
      message: 'XMCP server is reachable',
      availableTools: data.result?.tools || [],
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "XMCP server is not reachable. Make sure it's running on port 3002.",
      },
      { status: 503 }
    );
  }
}
