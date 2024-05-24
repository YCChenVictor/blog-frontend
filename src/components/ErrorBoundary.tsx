// ErrorBoundary.tsx
import React, { useState } from 'react';

const ErrorBoundary: React.FC = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    const errorListener = (error: any) => {
      console.error(error);
      setHasError(true);
    };

    window.addEventListener('error', errorListener);

    return () => {
      window.removeEventListener('error', errorListener);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
