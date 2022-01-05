import { useCallback, useEffect, useRef, useState } from "react";

const useRefState = <T>(initial: T) => {
  const [data, setData] = useState<T>(initial);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const setState = useCallback((value: T) => {
    if (isMounted.current) {
      setData(value);
    }
  }, []);

  return [data, setState];
};

export default useRefState;
