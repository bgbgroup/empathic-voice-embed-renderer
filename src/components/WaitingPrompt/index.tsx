import { useDerivedLayoutState } from '@/store/useDerivedLayoutState';
import { cn } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {getQueryParams} from '@/utils';

const prompts = [
  "How do you compe with your disease?",
  'Show me a day in your life',
];

export const WaitingPrompt = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const { isShortFrame } = useDerivedLayoutState();

  const [showPrompts, setshowPrompts] = useState<boolean>(true);
  useEffect(() => {
    const params = getQueryParams();
    if( params['hidePrompt']) {
      setshowPrompts(false)
    }
  }, [window.location.href]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prevIndex) =>
        prevIndex === prompts.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex select-none flex-col justify-center gap-12 text-center"
    >
      <div
        className={cn(
          'font-mono uppercase text-black/50',
          isShortFrame && 'pt-4',
        )}
      >
        Try saying...
      </div>
      {showPrompts ? <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromptIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className={cn(
              'mt-12 rounded-full bg-tan-200/50 px-3 py-1',
              isShortFrame ? 'mt-12' : 'mt-20',
            )}
          >
            "{prompts[currentPromptIndex]}"
          </motion.div>
        </AnimatePresence>
      </motion.div> : null}
    </motion.div>
  );
};
