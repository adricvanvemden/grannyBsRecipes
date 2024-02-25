'use client';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Button variant="link" onClick={() => window.history.back()} className="!p-0">
      <ChevronLeft />
      Back
    </Button>
  );
}
