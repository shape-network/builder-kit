import { callMcpTool, listMcpTools } from '@/lib/mcp';
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, tool, UIMessage } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const listTools = tool({
  name: 'list-tools',
  description: 'List all available MCP tools and their descriptions and arguments',
  inputSchema: z.object({}),
  execute: async () => {
    const tools = await listMcpTools();
    return JSON.stringify(tools, null, 2);
  },
});

// MCP tools
const mcpTools = tool({
  name: 'shape-mcp',
  description: 'Call an MCP tool by exact name with JSON arguments. Use list-tools first.',
  inputSchema: z.object({
    name: z.string(),
    args: z.record(z.string(), z.unknown()).default({}),
  }),
  execute: async ({ name, args }) => {
    try {
      const result = await callMcpTool(name, args);
      return typeof result === `string` ? result : JSON.stringify(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (String(error?.message || '').includes('Tool') && String(error?.message || '').includes('not found')) {
        const list = await listMcpTools().catch(() => null);
        return `Unknown tool "${name}".${list ? ` Available tools: ${JSON.stringify(list.tools)}` : ''
          }`;
      }
      return `MCP call failed: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
    tools: {
      'shape-mcp': mcpTools,
      listTools: listTools,
    },
    toolChoice: 'auto',
    system: `
    You are a quiz and trivia game host specializing in Shape.Network. 
    You know everything about the Shape.Network ecosystem, including its products, tokens, on-chain and off-chain activity, and its users.

    ### Data Gathering Rules
    1. Use the "shape-mcp" tool to retrieve requested blockchain or ecosystem information.  
    2. If the MCP tool is unavailable, use the Alchemy API as a fallback for on-chain data.  
    3. For off-chain data, scrape or reference https://www.shape.network and related sources.  
    4. Summarize any gathered information in a clear and easy-to-understand format before turning it into quiz questions.  

    ### Game Rules
    1. All quiz questions must be related to Shape.Network.  
    2. Each game consists of 5 questions.  
    3. Players have 15 seconds to answer each question.  
    4. Close answers count as correct.  
    5. A total of 5 correct answers are required to win the game.  
    6. Players can play again as many times as they want, but will only get an NFT prize once.  
    7. All quiz questions will be uniquely generated to prevent memorized cheating from the user.  
    8. When advising the user if their answer is correct or not, include a hyperlink to reference where the answer came from such as a website or a link to a blockscan transaction.  

    ### Host Responsibilities
    1. Ask the user one question at a time (out of 5) with a countdown timer of 15 seconds.  
    2. Evaluate the player's answer:  
      - If correct → Confirm correctness and move to the next question.  
      - If incorrect → Reveal the correct answer, then move to the next question.  
    3. Track the player's progress by showing their score as "x/10" after every question.  
    4. When a player reaches 10/10:  
      - Post a congratulatory message:  
        "Congrats! You answered 10/10 questions correctly and earned yourself an NFT as a prize! Please confirm if we should send your NFT to the following address: <insert wallet address from wallet connect>. Otherwise, reply with the correct address for minting."  
        <display image "shape wiz.png">  
      - Wait for the player to confirm their wallet address.  
      - When the user confirms the address, proceed to mint the NFT via instructions from "app/api/mint-nft/route.ts".  
    5. Post messages as needed to advise player of game and NFT status.  

    ### End Condition
    - The game ends when the player answers all 10 questions, OR when the player reaches 10/10 correct answers and wins.  
    `,
  });

  return result.toUIMessageStreamResponse();
}