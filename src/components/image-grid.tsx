"use client";

import { useState } from "react";
import { ImageViewer } from "./image-viewer";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageItem {
  id: string;
  captured_at: string;
  thumbnail_url: string | null;
  qa_status: string;
  qa_flags: string[] | null;
  sidecar_battery_v: number | null;
  sidecar_signal_rssi: number | null;
  file_size_bytes: number | null;
  width: number | null;
  height: number | null;
}

interface ImageGridProps {
  images: ImageItem[];
  date: string;
}

export function ImageGrid({ images, date }: ImageGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No images captured on {new Date(date).toLocaleDateString("en-AU", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
    );
  }

  const firstTime = new Date(images[0].captured_at).toLocaleTimeString(
    "en-AU",
    { hour: "2-digit", minute: "2-digit" }
  );
  const lastTime = new Date(
    images[images.length - 1].captured_at
  ).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {images.length} images &middot; {firstTime} &ndash; {lastTime}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-zinc-100 transition-shadow hover:shadow-md"
          >
            {img.thumbnail_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.thumbnail_url}
                alt={`Capture at ${new Date(img.captured_at).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}

            {/* Time overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1">
              <span className="text-xs font-medium text-white">
                {new Date(img.captured_at).toLocaleTimeString("en-AU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* QA badge */}
            {img.qa_status === "flagged" && (
              <div className="absolute top-1 right-1 rounded-full bg-yellow-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                QA
              </div>
            )}
            {img.qa_status === "excluded" && (
              <div className="absolute top-1 right-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                Excluded
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Full-res viewer modal */}
      {selectedIndex !== null && (
        <ImageViewer
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </div>
  );
}
