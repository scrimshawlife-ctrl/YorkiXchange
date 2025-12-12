"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type ImageGalleryProps = {
  images: Array<{ id: string; url: string; sort_order: number }>;
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (images.length === 0) return null;

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {sorted.map((img, idx) => (
          <Card
            key={img.id}
            className="relative cursor-pointer overflow-hidden hover:opacity-90 transition-opacity"
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={img.url}
              alt={`Image ${idx + 1}`}
              className="h-48 w-full object-cover"
            />
          </Card>
        ))}
      </div>

      <Dialog open={selectedIdx !== null} onOpenChange={() => setSelectedIdx(null)}>
        <DialogContent className="max-w-4xl">
          {selectedIdx !== null && (
            <div className="space-y-3">
              <img
                src={sorted[selectedIdx].url}
                alt={`Image ${selectedIdx + 1}`}
                className="w-full rounded-lg"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedIdx(Math.max(0, selectedIdx - 1))}
                  disabled={selectedIdx === 0}
                  className="text-sm font-medium disabled:opacity-50"
                >
                  ← Previous
                </button>
                <div className="text-sm text-muted-foreground">
                  {selectedIdx + 1} / {sorted.length}
                </div>
                <button
                  onClick={() => setSelectedIdx(Math.min(sorted.length - 1, selectedIdx + 1))}
                  disabled={selectedIdx === sorted.length - 1}
                  className="text-sm font-medium disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
