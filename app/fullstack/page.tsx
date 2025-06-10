"use client";

import { useState, useEffect } from 'react';
import PageHeader from '@/components/page-header';
import ProjectCard from '@/components/project-card';
import { fullstackProjects } from '@/data/projects';
import { motion } from '@/components/motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FullStackPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProjects = filter === "all" 
    ? fullstackProjects 
    : fullstackProjects.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <PageHeader 
        title="Full Stack Development" 
        subtitle="Building modern web applications with React, Next.js, Node.js and more"
      />
      
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-lg text-muted-foreground">
          I create scalable, performant full-stack applications using modern technologies.
          My expertise spans from responsive front-end interfaces to robust back-end systems.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto mb-12">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
          <TabsTrigger value="react" onClick={() => setFilter("react")}>React</TabsTrigger>
          <TabsTrigger value="next" onClick={() => setFilter("next")}>Next.js</TabsTrigger>
          <TabsTrigger value="node" onClick={() => setFilter("node")}>Node.js</TabsTrigger>
          <TabsTrigger value="typescript" onClick={() => setFilter("typescript")}>TypeScript</TabsTrigger>
          <TabsTrigger value="api" onClick={() => setFilter("api")}>APIs</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-8"></TabsContent>
        <TabsContent value="react" className="mt-8"></TabsContent>
        <TabsContent value="next" className="mt-8"></TabsContent>
        <TabsContent value="node" className="mt-8"></TabsContent>
        <TabsContent value="typescript" className="mt-8"></TabsContent>
        <TabsContent value="api" className="mt-8"></TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredProjects.map((project, index) => (
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