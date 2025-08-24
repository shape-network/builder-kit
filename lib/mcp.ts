import { config } from '@/lib/config';

export type McpRpcRequest = {
  jsonrpc: '2.0';
  id: string;
  method: string;
  params?: unknown;
};

export type McpRpcResponse<T = unknown> = {
  jsonrpc: '2.0';
  id: string;
  result?: T;
  error?: { code: number; message: string; data?: unknown };
};

const MCP_URL = config.mcpServerUrl;
console.log('MCP_URL', MCP_URL);

async function rpc<T = unknown>(method: string, params?: unknown): Promise<T> {
  const body: McpRpcRequest = {
    jsonrpc: '2.0',
    id: crypto.randomUUID(),
    method,
    params,
  };

  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`MCP HTTP ${res.status}: ${text}`);
  }

  const json = (await res.json()) as McpRpcResponse<T>;
  if (json.error) {
    throw new Error(`MCP error ${json.error.code}: ${json.error.message}`);
  }
  return json.result as T;
}

export async function listMcpTools() {
  return rpc<{ tools: Array<{ name: string; description?: string }> }>('tools/list');
}

export async function callMcpTool(name: string, args: Record<string, unknown> = {}) {
  return rpc<unknown>('tools/call', { name, arguments: args });
}