import { useState, useEffect, useCallback } from 'react';

interface UseProgressCalculatorProps<T> {
  inputs: T;
  mandatoryFields: (keyof T)[];
}

export const useProgressCalculator = <T extends Record<string, any>>({
  inputs,
  mandatoryFields,
}: UseProgressCalculatorProps<T>) => {
  const [progress, setProgress] = useState(0);
  const [filledFieldsCount, setFilledFieldsCount] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const calculateProgress = useCallback(() => {
    const filledMandatoryFields = mandatoryFields.filter(
      (field) =>
        inputs[field] !== '' &&
        (typeof inputs[field] !== 'object' || (inputs[field] as any).length > 0)
    ).length;
    setFilledFieldsCount(filledMandatoryFields);
    return Math.round((filledMandatoryFields / mandatoryFields.length) * 100);
  }, [inputs, mandatoryFields]);

  useEffect(() => {
    const newProgress = calculateProgress();
    setProgress(newProgress);
    setIsFormComplete(newProgress === 100);
  }, [calculateProgress]);

  return { progress, filledFieldsCount, isFormComplete };
};
