'use client';

import { useEffect } from 'react';

export default function DisableCopy() {
  useEffect(() => {
    // Disable Right-Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable Key Combinations (Ctrl+C, Ctrl+U, Ctrl+S, F12)
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) || // Copy
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) || // View Source
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) || // Save Page
        (e.ctrlKey && (e.key === 'a' || e.key === 'A')) || // Select All
        e.key === 'F12' // Developer Tools
      ) {
        e.preventDefault();
      }
    };

    // Disable Copy Event Directly
    const handleCopy = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
}