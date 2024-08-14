"use client";
import { useState, useEffect } from "react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto box-border mt-4">
      <h1 className="text-center text-xl">Pantry Tracker</h1>
      <button className="flex items-end ">Add Item</button>
      <div>
        <form className="flex gap-2 justify-items-center w-full">
          <input
            type="text"
            placeholder="search"
            className="border-black border-2"
          />
          <button>Search</button>
        </form>
      </div>
    </div>
  );
}
