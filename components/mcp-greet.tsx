'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type McpResponse = {
  success: boolean;
  result?: {
    content: Array<{
      type: string;
      text: string;
    }>;
  };
  error?: string;
};

export function McpGreetDemo() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<McpResponse | null>(null);
  const [serverStatus, setServerStatus] = useState<'unknown' | 'connected' | 'disconnected'>(
    'unknown'
  );

  const checkServerStatus = async () => {
    try {
      const res = await fetch('/api/call-mcp-tool');
      const data = await res.json();
      setServerStatus(data.success ? 'connected' : 'disconnected');
    } catch {
      setServerStatus('disconnected');
    }
  };

  const handleGreet = async () => {
    if (!name.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/call-mcp-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolName: 'greet',
          parameters: { name: name.trim() },
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({
        success: false,
        error: 'Network error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>XMCP Greet Tool Demo</CardTitle>
          <CardDescription>Test calling the greet tool from your XMCP server</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={checkServerStatus} variant="outline" size="sm" disabled={isLoading}>
              Check Server Status
            </Button>
            <div className="flex items-center text-sm">
              <div
                className={`mr-2 h-2 w-2 rounded-full ${
                  serverStatus === 'connected'
                    ? 'bg-green-500'
                    : serverStatus === 'disconnected'
                      ? 'bg-red-500'
                      : 'bg-gray-400'
                }`}
              />
              {serverStatus === 'unknown' && 'Unknown'}
              {serverStatus === 'connected' && 'Connected'}
              {serverStatus === 'disconnected' && 'Disconnected'}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Enter your name:
            </label>
            <div className="flex gap-2">
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name here..."
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && handleGreet()}
              />
              <Button onClick={handleGreet} disabled={isLoading || !name.trim()}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Greet
              </Button>
            </div>
          </div>

          {response && (
            <Alert
              className={
                response.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }
            >
              <AlertDescription>
                {response.success ? (
                  <div>
                    <strong>Success!</strong>
                    <div className="mt-1">
                      {response.result?.content?.[0]?.text || 'No response text'}
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong>Error:</strong> {response.error}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            1. <strong>XMCP Server:</strong> Running on port 3002 with your greet tool
          </div>
          <div>
            2. <strong>Next.js API Route:</strong> <code>/api/call-mcp-tool</code> handles JSON-RPC
            communication
          </div>
          <div>
            3. <strong>Frontend:</strong> This component calls the API route with user input
          </div>
          <div>
            4. <strong>Flow:</strong> User input → Next.js API → XMCP Server → Tool execution →
            Response
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
