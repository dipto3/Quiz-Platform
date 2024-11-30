import { useEffect, useState } from "react";
import { ResultDataContext } from "../context/ResultDataContext";

export default function ResultDataProvider({ children }) {
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem("results");
    return savedResults ? JSON.parse(savedResults) : [];
  });
  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem("results", JSON.stringify(results));
    } else {
      localStorage.removeItem("results");
    }
  }, [results]);
  return (
    <>
      <ResultDataContext.Provider value={{ results, setResults }}>
        {children}
      </ResultDataContext.Provider>
    </>
  );
}
