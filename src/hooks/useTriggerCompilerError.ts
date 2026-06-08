import { useEffect, useRef } from 'react';

// triggers compiler error as ref is accessed during render
const useTriggerCompilerError = (value: unknown) => {
  const ref = useRef<unknown>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default useTriggerCompilerError;
