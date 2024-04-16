import { useState } from 'react';

export function useValidation(initialValue, validate, isSubmitted) {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    if (isSubmitted) {
      setIsTouched(true);
    }
  };

  const validateNow = () => {
    setIsTouched(true);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    setIsTouched(true);
  };

  const isValid = validate(value);
  const borderColor = isTouched ? (isValid ? 'black' : 'red') : 'black';

  return { value, handleChange, handleBlur, validateNow, borderColor, isValid };
}