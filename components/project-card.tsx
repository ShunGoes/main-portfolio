"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Info, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectMedia =
  | string
  | { type: "youtube" | "video" | "image"; url: string };

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  media?: ProjectMedia[];
  link: string;
  technologies: string[];
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  if (!url.includes("youtube.com") && !url.includes("youtu.be")) return null;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="w-full h-full object-cover"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  const thumbUrl = thumbError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="relative w-full h-full cursor-pointer group/yt bg-black flex items-center justify-center"
      onClick={() => setIsPlaying(true)}
    >
      <img
        src={thumbUrl}
        alt={`${title} video thumbnail`}
        className="w-full h-full object-cover"
        onError={() => setThumbError(true)}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/yt:bg-transparent transition-colors">
        <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center group-hover/yt:bg-red-700 transition-colors shadow-lg">
          <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const mediaItems =
    project.media && project.media.length > 0 ? project.media : [project.image];

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length,
    );
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100",
          )}
        />
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{project.title}</h3>

          <Dialog>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Click to view screenshots and details of the project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
                <DialogDescription>
                  Project details and technologies used
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="relative h-64 overflow-hidden rounded-md group bg-muted/20 flex items-center justify-center">
                  {(() => {
                    const currentMediaItem = mediaItems[currentMediaIndex];
                    const currentMediaUrl =
                      typeof currentMediaItem === "string"
                        ? currentMediaItem
                        : currentMediaItem.url;

                    const isExplicitYoutube =
                      typeof currentMediaItem !== "string" &&
                      currentMediaItem.type === "youtube";
                    const isExplicitVideo =
                      typeof currentMediaItem !== "string" &&
                      currentMediaItem.type === "video";

                    const ytId = isExplicitYoutube
                      ? getYouTubeId(currentMediaUrl) || currentMediaUrl
                      : getYouTubeId(currentMediaUrl);

                    if (ytId) {
                      return (
                        <YouTubeEmbed
                          key={currentMediaIndex}
                          videoId={ytId}
                          title={project.title}
                        />
                      );
                    }

                    if (
                      isExplicitVideo ||
                      currentMediaUrl.match(/\.(mp4|webm|ogg)$/i)
                    ) {
                      return (
                        <video
                          src={currentMediaUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="object-cover w-full h-full"
                        />
                      );
                    }

                    return (
                      <Image
                        src={currentMediaUrl}
                        alt={`${project.title} media ${currentMediaIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    );
                  })()}

                  {mediaItems.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full bg-background/80 hover:bg-background z-10"
                        onClick={handlePrevMedia}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full bg-background/80 hover:bg-background z-10"
                        onClick={handleNextMedia}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-black/20 p-1.5 rounded-full backdrop-blur-sm z-10">
                        {mediaItems.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === currentMediaIndex
                                ? "w-4 bg-white"
                                : "w-1.5 bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Project Overview</h4>
                  <p className="text-muted-foreground">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button asChild>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 pt-2">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline">+{project.technologies.length - 3}</Badge>
          )}
        </div>

        <Button asChild variant="default" size="sm" className="group">
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
