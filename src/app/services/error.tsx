"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external service
    console.error("PAGE CRASHED WITH ERROR:", error);
  }, [error]);

  return (
    <div style={{ padding: '100px', textAlign: 'center', background: 'white', color: 'red' }}>
      <h2>Something went wrong in the Services page!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
