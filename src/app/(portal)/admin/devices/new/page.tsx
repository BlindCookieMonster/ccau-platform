"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";

export default function RegisterDevicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);

    const body = {
      device_id: form.get("device_id"),
      name: form.get("name"),
      model: form.get("model") || undefined,
      router_model: form.get("router_model") || undefined,
      sim_iccid: form.get("sim_iccid") || undefined,
    };

    try {
      const res = await fetch("/api/admin/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to register device");
        return;
      }

      setApiKey(data.device.api_key);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function copyKey() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Show API key after successful registration
  if (apiKey) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Device Registered
          </h1>
          <p className="text-muted-foreground">
            Copy the API key below. It will only be shown once.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Device API Key</CardTitle>
            <CardDescription>
              Use this key in the X-Device-Key header for uploads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md bg-zinc-100 px-3 py-2 text-sm font-mono break-all">
                {apiKey}
              </code>
              <Button variant="outline" size="icon" onClick={copyKey}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Badge variant="destructive">
              This key will not be shown again
            </Badge>
            <div className="pt-2">
              <Button onClick={() => router.push("/admin/devices")}>
                Back to Devices
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Register Device</h1>
        <p className="text-muted-foreground">
          Add a new camera to the fleet.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="device_id">Device ID *</Label>
              <Input
                id="device_id"
                name="device_id"
                placeholder="CAM001"
                required
              />
              <p className="text-xs text-muted-foreground">
                Must match the S3 key convention. Uppercase, no spaces.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Friendly Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="North Entrance Cam"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Camera Model</Label>
              <Input
                id="model"
                name="model"
                placeholder="Reolink RLC-1224A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="router_model">Router Model</Label>
              <Input
                id="router_model"
                name="router_model"
                placeholder="Teltonika RUT206"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sim_iccid">SIM ICCID</Label>
              <Input id="sim_iccid" name="sim_iccid" placeholder="8961..." />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Registering..." : "Register Device"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
