import { createContext, useContext, useState, useRef } from 'react';

const PredictionContext = createContext();

export function PredictionProvider({ children }) {
  const [predictionData, setPredictionData] = useState(null);
  // Flag to prevent premature redirect during the submit→navigate transition
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearPrediction = () => setPredictionData(null);

  return (
    <PredictionContext.Provider value={{ predictionData, setPredictionData, clearPrediction, isSubmitting, setIsSubmitting }}>
      {children}
    </PredictionContext.Provider>
  );
}

export const usePrediction = () => useContext(PredictionContext);
