import { Excerpt } from '@/lib/constants/definitions';
import { useEffect, useRef, RefObject } from 'react';

export const CHUNK_SIZE = 15;

interface UseInfiniteScrollOptions {
  rootMargin?: string;
}

function useInfiniteScroll(
  setDisplayCount: React.Dispatch<React.SetStateAction<number>>,
  excerpts: Excerpt[],
  options: UseInfiniteScrollOptions = { rootMargin: '500px' }
): RefObject<HTMLDivElement> {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prevCount => Math.min(prevCount + CHUNK_SIZE, excerpts.length));
      }
    }, options);

    let observerRefValue: HTMLDivElement | null = null;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
      observerRefValue = loadMoreRef.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [setDisplayCount, options, excerpts]);

  return loadMoreRef;
}

export default useInfiniteScroll;
