import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home/Home";
import Navbar from "./components/ui/layout/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-10">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}
