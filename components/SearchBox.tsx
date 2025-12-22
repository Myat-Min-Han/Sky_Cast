"use client"

import React, { useRef } from "react";
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(inputRef.current) {
      const city = inputRef.current.value;
      if (city) {
        router.push(`?city=${city}`)
      }
    }
  }

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your city..."
          ref={inputRef}
          className="mt-4 px-4 py-2 rounded-md shadow-md focus:outline-none"
        />
      </form>
    )
}