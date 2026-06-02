"use client";

import { Button } from "@/components/ui/button";
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';
import React from "react";

export default function Home() {
  const dotLottieRef = React.useRef<DotLottie | null>(null)
  const [loop, setLoop] = React.useState(false)
  const book = React.useRef<any>(null)
  const getBook = async () => {
    try {
      setLoop(true)
      const res = await fetch('/api/random-book')
      const data = await res.json()
      console.log('Random book:', data)
      book.current = data
      setLoop(false)
      return data
    } catch (err) {
      console.error('Error fetching random book:', err)
      setLoop(false)
    }
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <Button variant={"generate"} size={"xl"}
          onClick={() => { 
            dotLottieRef.current?.play();
            getBook()
           }}
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <DotLottieReact
              className="w-50 h-30 -mx-16"
              src="https://lottie.host/ca0ae114-4004-4730-a91d-390f427c82e8/4B3yXHhExB.json"
              loop={loop}
              autoplay={false}
              dotLottieRefCallback={(dotLottie) => {
                dotLottieRef.current = dotLottie
              }}
            />
            <span>Find your next book</span>
          </div>
        </Button>

        <div>
          <h1 className="text-4xl font-bold text-center mt-16">{book.current?.work.title}</h1>
          <p className="text-center mt-4 text-lg">{book.current?.work.authors.join(', ')}</p>
        </div>
      </main>
    </div>
  );
}
