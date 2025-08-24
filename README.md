Shape Wiz Project: AI Chat → MCP Tools Flow Analysis
Based on my review of the codebase, here's the complete flow of how the AI chat calls and uses MCP tools:
🏗️ Architecture Overview
This is a Next.js quiz application about Shape Network that uses:
Frontend: React chat interface
Backend: AI SDK with OpenAI GPT-4
MCP Integration: External MCP server for Shape Network data
Web3: Wallet connection for NFT rewards
🔄 Complete Flow Breakdown

1. User Interaction Flow
   User → Home Page → Connect Wallet → Start Quiz → Chat Interface
   Key Files:
   app/page.tsx - Main page with home/chat toggle
   components/chat-interface.tsx - React chat UI
2. Chat Message Processing
   Frontend Chat → API Route → AI SDK → Tool Selection → MCP Call
   low Details:
   User sends message via chat-interface.tsx
   Uses useChat hook from AI SDK (@ai-sdk/react)
   Sends to /api/chat endpoint
3. AI Chat API Processing (app/api/chat/route.ts)
   The core AI processing happens here:
   // Two main tools are available:
4. "list-tools" - Lists available MCP tools
5. "shape-mcp" - Calls specific MCP tools
   System Prompt:
   > "You are a quiz and trivia game host. You will use the 'shape-mcp' tool to get information about Shape to make your questions."
6. MCP Tool Integration (lib/mcp.ts)
   MCP Client Functions:
   // Lists available tools from MCP server
   listMcpTools() → calls 'tools/list'

// Executes specific MCP tool with arguments  
callMcpTool(name, args) → calls 'tools/call'
MCP Server:
URL: https://shape-mcp-server-eta.vercel.app/mcp (default)
Uses JSON-RPC 2.0 protocol
Communicates via HTTP POST requests 5. Tool Execution Flow
<see diagram> 6. Error Handling & Tool Discovery
The system has robust error handling:
sequenceDiagram
participant User
participant Chat
participant API
participant AI
participant MCP

    User->>Chat: "What's the latest block?"
    Chat->>API: POST /api/chat
    API->>AI: GPT-4 processes message
    AI->>API: Decides to use "shape-mcp" tool
    API->>MCP: callMcpTool("get-latest-block")
    MCP-->>API: Returns block data
    API->>AI: Tool result processed
    AI-->>Chat: Formatted response
    Chat-->>User: Display answer

7. Frontend Tool Visualization
   The chat interface shows tool calls in real-time:
   // If tool not found, automatically lists available tools
   if (error.message.includes('Tool') && error.message.includes('not found')) {
   const list = await listMcpTools();
   return `Unknown tool "${name}". Available tools: ${JSON.stringify(list.tools)}`;
   }
   🛠️ Available MCP Tools
   Based on the code, the MCP server likely provides Shape Network-specific tools like:
   Block information queries
   Transaction data
   Network statistics
   User NFT data (as seen in get-nft-for-user reference)
   🎯 Key Features
   Smart Tool Selection: AI automatically chooses appropriate MCP tools
   Real-time Feedback: Users see tool calls and results
   Error Recovery: Graceful handling of missing tools
   Quiz Context: AI uses Shape data to generate quiz questions
   Web3 Integration: Wallet connection for NFT rewards
