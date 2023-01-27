import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useIsPageNavigating() {
  const [navigating, setNavigating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setNavigating(true);
    }

    const handleStop = () => {
      setNavigating(false);
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router]);

  return navigating;
}
