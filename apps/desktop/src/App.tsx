import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@backend/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui";

function App() {
  const events = useQuery(api.events.getEvents);
  const generateUploadUrl = useMutation(api.r2.generateUploadUrl);
  const recordUpload = useMutation(api.r2.recordUpload);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (window.ipcRenderer) {
      const controller = new AbortController();

      window.ipcRenderer.on(
        "main-process-message",
        (message) => {
          console.log(message);
        },
        { signal: controller.signal },
      );

      return () => {
        controller.abort();
      };
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || isUploading) {
      return;
    }

    const isTextFile =
      selectedFile.type === "text/plain" ||
      selectedFile.name.toLowerCase().endsWith(".txt");

    if (!isTextFile) {
      setUploadMessage("Please select a .txt file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadMessage("Uploading...");

    try {
      const { key, url } = await generateUploadUrl();
      const contentType = selectedFile.type || "text/plain";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: selectedFile,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      await recordUpload({
        key,
        filename: selectedFile.name,
        contentType,
        size: selectedFile.size,
      });

      setUploadMessage("Upload completed successfully.");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed.";
      setUploadMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start gap-4 bg-background p-8 overflow-y-auto">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Upload Text File</CardTitle>
          <CardDescription>
            Select a .txt file and upload it to Cloudflare R2.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileChange}
            disabled={isUploading}
            className="text-sm"
          />
          {selectedFile ? (
            <span className="text-xs text-muted-foreground">
              Selected: {selectedFile.name}
            </span>
          ) : null}
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          {uploadMessage ? (
            <span className="text-xs text-muted-foreground">
              {uploadMessage}
            </span>
          ) : null}
        </CardFooter>
      </Card>

      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Convex Events</CardTitle>
          <CardDescription>
            Real-time event list fetched from Convex.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex w-full max-w-[500px] flex-col gap-4">
        {events === undefined ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg animate-pulse text-muted-foreground">
                Loading events...
              </CardTitle>
            </CardHeader>
          </Card>
        ) : events.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">
                No events found.
              </CardTitle>
            </CardHeader>
          </Card>
        ) : (
          events.map((event: { _id: string; name: string }) => (
            <Card key={event._id}>
              <CardHeader>
                <CardTitle className="text-lg">{event.name}</CardTitle>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
