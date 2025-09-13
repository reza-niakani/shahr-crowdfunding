import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Navigated to:', pathname);

    // Attempt to scroll main content container
    const mainContent = document.querySelector('.main-content'); // Adjust selector
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    } else {
      // Fallback to window scroll
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
