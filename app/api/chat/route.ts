import { callMcpTool } from '@/lib/mcp';
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, tool, UIMessage } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// MCP tools
const mcpTools = tool({
  name: 'shape-mcp',
  description: 'Use the Shape MCP to get information about Shape',
  inputSchema: z.object({
    name: z.string(),
    args: z.record(z.string(), z.unknown()).default({}),
  }),
  execute: async ({ name, args }: { name: string, args: Record<string, unknown> }) => {
    const result = await callMcpTool(name, args);
    // Return as a string so model can use it
    return typeof result === `string` ? result : JSON.stringify(result);
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
    tools: {
      mcp: mcpTools,
    },
    toolChoice: 'auto',
    system: 'You are a quiz and trivia game host. You will use the "mcp" tool to get information about Shape to make your questions.You will ask the user 10 questions about Shape and the user will answer the questions. If the user answers incorrectly, you will tell them the correct answer. If the user answers correctly, you will tell them they are correct and move on to the next question. If the user answers 10 questions correctly, you will tell them they are a winner and the game is over.',
  });

  return result.toUIMessageStreamResponse();
}