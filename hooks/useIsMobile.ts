import { useCallback, useEffect, useRef, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const DEBOUNCE_DELAY = 150; // ms

/**
 * Hook to detect if the viewport width is below the mobile breakpoint (768px).
 * Uses debounced resize listener for better performance.
 */
function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT,
  );
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounced update
    debounceTimerRef.current = setTimeout(() => {
      setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }, DEBOUNCE_DELAY);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [handleResize]);

  return mobile;
}

export default useIsMobile;
