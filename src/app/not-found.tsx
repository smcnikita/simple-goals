'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Home, MoveLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      {/*
      <div className="absolute top-4 right-4">
        ThemeSwitcher
      </div>
      */}

      <div className="flex flex-col items-center text-center max-w-md">
        <Image src="/icon.svg" width={70} height={70} alt="Logo" className="bg-background rounded-full p-0 mb-6" />

        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found.</h2>

        <p className="text-muted-foreground mb-8">
          Sorry, the page you’re looking for doesn’t exist. Please return to the homepage to find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
          <Button onClick={() => router.back()} variant="outline" size="lg" className="gap-2">
            <MoveLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
