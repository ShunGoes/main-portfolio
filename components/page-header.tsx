"use client";

import { useState, useEffect } from 'react';
import { motion } from '@/components/motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="text-center mb-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        {title}
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isLoaded ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-24 h-1 bg-primary mx-auto mb-6 origin-center"
      />
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl text-muted-foreground max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}