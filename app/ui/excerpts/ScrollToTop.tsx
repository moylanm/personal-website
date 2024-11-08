'use client'

import { useCallback, useState, useEffect } from 'react';
import { ScrollToTopButton } from '../style';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible]);

  const handleClick = useCallback(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <ScrollToTopButton onClick={handleClick}>
          Scroll to top
        </ScrollToTopButton>
      )}
    </>
  );
}