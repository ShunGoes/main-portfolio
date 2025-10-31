"use client";

import { useState, useEffect } from 'react';
import { motion } from '@/components/motion';
import { 
  Layers, 
  Code2, 
  Database, 
  Paintbrush, 
  Wrench, 
  LineChart 
} from 'lucide-react';

const skills = [
  // {
  //   title: "WordPress Development",
  //   description: "Custom themes, plugin development, Divi expertise",
  //   icon: Layers,
  //   delay: 0
  // },
  {
    title: "Front-End Development",
    description: "HTML, CSS, TailwindCss, JavaScript, Typescript, React, Next.js",
    icon: Code2,
    delay: 0.1
  },
  {
    title: "Back-End Development",
    description: "Node.js, Express, RESTful APIs",
    icon: Database,
    delay: 0.2
  },
  {
    title: "Dev Tools & Workflow",
    description: "Version Control, Deployment & Hosting, Performance Optimization",
    icon: Paintbrush,
    delay: 0.3
  },
  {
    title: "Client Facing",
    description: "Communication, Project Management, Client Support",
    icon: Wrench,
    delay: 0.4
  },
  {
    title: "Performance Optimization",
    description: "Website speed, Core Web Vitals, SEO",
    icon: LineChart,
    delay: 0.5
  }
];

export default function Skills() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('skills-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills-section" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-2">My Skills</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            I've developed a diverse skill set that allows me to handle projects from concept to deployment. 
            Here are some of the key areas where I excel:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: skill.delay }}
              className="bg-card hover:bg-card/80 p-6 rounded-lg border border-border transition-colors duration-300"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <skill.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}