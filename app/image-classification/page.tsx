"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ImageIcon, Loader2, ScanSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const ImageClassificationPage = (props: Props) => {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center justify-start gap-2 p-24">
      <form onSubmit={uploadFiles} className="flex items-center gap-2">
        <ImageIcon />
        <Input name="files" type="file"></Input>
        <Button disabled={loading} type="submit">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ScanSearch size={20} />
          )}
        </Button>
      </form>
      {url && (
        <>
          <Image
            src={url}
            width={400}
            height={400}
            className="rounded-md"
            alt={"uploaded image"}></Image>
          <Link
            href={url}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-xs text-muted-foreground"
            )}></Link>
        </>
      )}
      {label &&  (
        <h1 className="pb-2 text-lg font-bold text-center">Detected</h1>
      )}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {label && (
          <>
            {Object.entries(JSON.parse(label)).map(([item, quantity]) => (
              <div
                key={item}
                className="flex flex-col items-center p-4 transition duration-300 border rounded-md hover:shadow-lg">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 text-2xl">{item}</td>
                    </tr>
                    <tr>
                      <td className="text-lg">Quantity: {String(quantity)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );

  // handle
  async function uploadFiles(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    setLoading(true);
    const response = await axios.post("/api/detect-objects", formData);
    setLoading(false);
    // TODO: set state variables for url and label
    setUrl(response.data.url);
    setLabel(response.data.label);
    console.log("label", label);
  }
};


export default ImageClassificationPage;
