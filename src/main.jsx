import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import QuizListProvider from "./providers/QuizListProvider.jsx";
import QuizProvider from "./providers/QuizProvider.jsx";
import ResultDataProvider from "./providers/ResultDataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ResultDataProvider>
        <QuizListProvider>
          <QuizProvider>
            <Router>
              <App />
            </Router>
          </QuizProvider>
        </QuizListProvider>
      </ResultDataProvider>
    </AuthProvider>
  </StrictMode>
);
