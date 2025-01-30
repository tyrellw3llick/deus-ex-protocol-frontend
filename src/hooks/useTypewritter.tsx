import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 10) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    setIsTyping(true);
    setDisplayedText(''); // Reset when text changes

    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((curr) => curr + text.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { displayedText, isTyping };
};
