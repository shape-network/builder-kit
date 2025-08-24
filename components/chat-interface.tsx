'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UIMessage, useChat } from '@ai-sdk/react';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface ChatInterfaceProps {
  onBack: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({ id: 'shape-quiz' });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-4xl flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Home
        </Button>
        <h2 className="text-xl font-semibold">Shape Network Quiz</h2>
        <div className="w-20"></div> {/* Spacer for center alignment */}
      </div>

      {/* Messages area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-center">
            <p>Welcome to the Shape Network Quiz!</p>
            <p>Ask me anything about Shape Network to get started.</p>
          </div>
        )}
        {messages.map((message: UIMessage) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {/* {message.role === 'user' ? 'You: ' : 'AI: '} */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  case 'tool-call':
                    console.log('tool-call', part.input);
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="text-xs whitespace-pre-wrap opacity-80"
                      >
                        Tool call: {part.type} {JSON.stringify(part.input)}
                      </div>
                    );
                  case 'tool-result':
                    console.log('tool-result', part.output);
                    return (
                      <pre key={`${message.id}-${i}`} className="text-xs opacity-70">
                        {typeof part.output === 'string'
                          ? part.output
                          : JSON.stringify(part.output, null, 2)}
                      </pre>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Shape Network..."
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
