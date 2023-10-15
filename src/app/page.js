"use client";
import { Button } from "@/components/ui/button";
import Box from "@/components/custom/box";
import { useState } from "react";

export default function Home() {
  const [wordle, setWordle] = useState([
    "SOARE",
    "11111",
    "11111",
    "11111",
    "11111",
    "11111",
  ]);

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center select-none">
      <h1 className="font-black text-3xl border">
        WORDLE <span className="text-[#6aaa64]">SOLVER</span>
      </h1>
      <div className="w-screen h-3" />
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center justify-center">
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <Box
                  key={i}
                  letter={
                    wordle[0].split("")[i] == "1" ? "" : wordle[0].split("")[i]
                  }
                />
              );
            })}
          </div>
          <div className="flex gap-3 items-center justify-center">
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <Box
                  key={i}
                  letter={
                    wordle[1].split("")[i] == "1" ? "" : wordle[0].split("")[i]
                  }
                />
              );
            })}
          </div>
          <div className="flex gap-3 items-center justify-center">
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <Box
                  key={i}
                  letter={
                    wordle[2].split("")[i] == "1" ? "" : wordle[0].split("")[i]
                  }
                />
              );
            })}
          </div>
          <div className="flex gap-3 items-center justify-center">
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <Box
                  key={i}
                  letter={
                    wordle[3].split("")[i] == "1" ? "" : wordle[0].split("")[i]
                  }
                />
              );
            })}
          </div>
          <div className="flex gap-3 items-center justify-center">
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <Box
                  key={i}
                  letter={
                    wordle[4].split("")[i] == "1" ? "" : wordle[0].split("")[i]
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-screen h-3" />
      <p className="text-slate-700 text-sm">Double click to change color :)</p>

      <div className="w-screen h-3" />
      <Button
        onClick={() => {
          setWordle(wordle);
        }}
      >
        Next Word
      </Button>
    </main>
  );
}
