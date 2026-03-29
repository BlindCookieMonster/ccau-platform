"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Battery,
  Signal,
} from "lucide-react";
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

interface ImageViewerProps {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageViewer({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageViewerProps) {
  const [fullResUrl, setFullResUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const image = images[currentIndex];

  const fetchFullRes = useCallback(async (imageId: string) => {
    setLoading(true);
    setFullResUrl(null);
    try {
      const res = await fetch(`/api/images/${imageId}/url`);
      if (res.ok) {
        const data = await res.json();
        setFullResUrl(data.url);
      }
    } catch {
      // Failed to load full res
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFullRes(image.id);
  }, [image.id, fetchFullRes]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      } else if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onNavigate, onClose]);

  const capturedDate = new Date(image.captured_at);
  const timeStr = capturedDate.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const dateStr = capturedDate.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function formatFileSize(bytes: number | null): string {
    if (bytes === null) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }

  function qaStatusBadge(status: string) {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-600">Passed</Badge>;
      case "flagged":
        return <Badge className="bg-yellow-500">Flagged</Badge>;
      case "excluded":
        return <Badge variant="destructive">Excluded</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-full p-0 gap-0">
        <DialogTitle className="sr-only">
          Image captured at {timeStr}
        </DialogTitle>

        {/* Top bar */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentIndex === 0}
              onClick={() => onNavigate(currentIndex - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{timeStr}</span>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentIndex === images.length - 1}
              onClick={() => onNavigate(currentIndex + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {images.length}
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center bg-black min-h-[400px] max-h-[70vh]">
          {loading ? (
            <Skeleton className="w-full h-[400px]" />
          ) : fullResUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fullResUrl}
              alt={`Capture at ${timeStr}`}
              className="max-h-[70vh] w-auto object-contain"
            />
          ) : (
            <div className="text-white text-sm">Failed to load image</div>
          )}
        </div>

        {/* Metadata bar */}
        <div className="border-t px-4 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Date:</span>{" "}
              <span className="font-medium">{dateStr}</span>
            </div>

            {image.sidecar_battery_v !== null && (
              <div className="flex items-center gap-1">
                <Battery className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">
                  {image.sidecar_battery_v.toFixed(1)}V
                </span>
              </div>
            )}

            {image.sidecar_signal_rssi !== null && (
              <div className="flex items-center gap-1">
                <Signal className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">
                  {image.sidecar_signal_rssi} dBm
                </span>
              </div>
            )}

            {image.width && image.height && (
              <div>
                <span className="text-muted-foreground">Resolution:</span>{" "}
                <span className="font-medium">
                  {image.width}x{image.height}
                </span>
              </div>
            )}

            <div>
              <span className="text-muted-foreground">Size:</span>{" "}
              <span className="font-medium">
                {formatFileSize(image.file_size_bytes)}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground">QA:</span>{" "}
              {qaStatusBadge(image.qa_status)}
            </div>

            {image.qa_flags && image.qa_flags.length > 0 && (
              <div className="flex gap-1">
                {image.qa_flags.map((flag) => (
                  <Badge key={flag} variant="outline" className="text-xs">
                    {flag}
                  </Badge>
                ))}
              </div>
            )}

            {fullResUrl && (
              <a
                href={fullResUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto"
              >
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Download
                </Button>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
