"use client";
import React, { useState } from "react";

const setColorClass = (num) => {
  let mod = num % 3;

  switch (mod) {
    case 0:
      return "w-20 h-20 border border-black rounded-md whitespace-pre-wrap";
    case 1:
      return "w-20 h-20 border border-black rounded-md bg-[#c9b458] whitespace-pre-wrap";
    case 2:
      return "w-20 h-20 border border-black rounded-md bg-[#6aaa64] whitespace-pre-wrap";
  }
};

function Box({ letter }) {
  let [color, setColor] = useState(0);
  if (letter)
    return (
      <button
        onClick={() => {
          setColor(color++);
        }}
        className={setColorClass(color)}
      >
        <p className="font-black text-4xl">{letter}</p>
      </button>
    );
  return <div className="w-20 h-20 border border-slate-300 rounded-md" />;
}

export default Box;
