'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import ChatInterface from '@/components/chat-interface';

export default function Home() {
  const { address } = useAccount();
  const [gameStarted, setGameStarted] = useState(false);

  // Home interface component
  const HomeInterface = () => (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Shape Wiz</h1>
        <p className="text-muted-foreground max-w-2xl text-xl">
          Test your knowledge of Shape Network with our interactive quiz!
        </p>
      </div>

      <div className="w-full max-w-4xl gap-6 flex flex-col items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Earn an NFT!</CardTitle>
            <CardDescription>
              Earn an NFT by testing your knowledge of Shape Network!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-muted-foreground">
                Get 10 answers correct and earn an NFT. Free mint!
              </p>
            </div>
            <div className="mt-4">
              {address ? (
                <Button onClick={() => setGameStarted(true)}>Start Quiz</Button>
              ) : (
                <Button disabled>Connect Wallet to Play</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild>
          <Link href="https://github.com/TalonDragon000/shape-builder-kit" target="_blank">
            <ArrowTopRightIcon className="mr-2 h-4 w-4" />
            View Github Repo
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://shape.network/shapecraft" target="_blank">
            <ArrowTopRightIcon className="mr-2 h-4 w-4" />
            View Hackathon Page
          </Link>
        </Button>
      </div>
    </div>
  );

  // Chatroom interface component
  const ChatroomInterface = () => (
    <ChatInterface onBack={() => setGameStarted(false)} />
  );
  // Return the appropriate interface based on game state
  return gameStarted ? <ChatroomInterface /> : <HomeInterface />;
}
