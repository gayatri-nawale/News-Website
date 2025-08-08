import { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import "./App.css";

function App() {
    const [category,setcategory]=useState("general");
  return (
    <>
      <Navbar setcategory={setcategory} />
      <Card category={category}/>
    </>
  );
}

export default App;
