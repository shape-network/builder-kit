import { McpGreetDemo } from '@/components/mcp-greet';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-4xl">
        <McpGreetDemo />
      </div>
    </div>
  );
}
