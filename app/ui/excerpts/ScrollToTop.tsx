'use client'

import { useCallback, useState, useEffect } from 'react';
import { ScrollToTopButton } from '../style';
import Image from 'next/image';

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
  }, [toggleVisibility]);

  return (
    <>
      {isVisible && (
        <ScrollToTopButton onClick={handleClick}>
          <Image
            width={24}
            height={24}
            src='/up-arrow.png'
            alt='Scroll to top'
            title='Scroll to top'
          />
        </ScrollToTopButton>
      )}
    </>
  );
}