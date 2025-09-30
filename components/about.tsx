"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from '@/components/motion';
import { cn } from '@/lib/utils';

export default function About() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('about-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-section" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className={cn(
              "relative w-full h-[400px] rounded-lg overflow-hidden",
              "before:absolute before:inset-0 before:border-8 before:border-primary/20 before:rounded-lg before:-m-3"
            )}>
              <Image 
                src="/frontend/my-dp.avif" 
                alt="Developer portrait" 
                fill
                className="object-cover "
              />
            </div>
          </motion.div>
          
          {/* Right side: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg mb-4">
               I build fast websites, solve tricky bugs, and bring life to every project I touch. From snappy UIs to smooth backend logic, I combine creativity, code, and a little caffeine  to get things done.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg mb-6">
               I dabble in React, WordPress, Node.js,Express, Typescript and Next.js, and always striving to stay updated with the latest trends in web development.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              <div>
                <h3 className="font-bold text-xl mb-2">WordPress</h3>
                <p className="text-muted-foreground">
                  Custom themes, Divi specialist.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Full Stack</h3>
                <p className="text-muted-foreground">
                  React, Next.js, Node.js/Express.js, Typescript
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
