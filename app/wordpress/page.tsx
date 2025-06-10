"use client";

import { useState, useEffect } from 'react';
import PageHeader from '@/components/page-header';
import ProjectCard from '@/components/project-card';
import { wordpressProjects } from '@/data/projects';
import { motion } from '@/components/motion';

export default function WordPressPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <PageHeader 
        title="WordPress Development" 
        subtitle="Crafting beautiful WordPress sites with the Divi theme and custom functionality"
      />
      
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-lg text-muted-foreground">
          As a WordPress specialist, I leverage the power of the Divi theme to create 
          stunning, customizable websites that are easy to maintain and update.
          Below are some examples of my WordPress projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {wordpressProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}