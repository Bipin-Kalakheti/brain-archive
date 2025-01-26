"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search, FolderTree, Users, Zap, Shield, Bot } from "lucide-react";
import { Authenticated } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

function AuthRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return null;
}

export default function LandingPage() {
  return (
    <>
      <Authenticated>
        <AuthRedirect />
      </Authenticated>

      <div className="bg-gradient-to-b from-background to-background/50 min-h-screen">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="mx-auto max-w-6xl py-32 sm:py-40">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Image
                  src="/Brain-Archive.png"
                  width="200"
                  height="200"
                  alt="Brain Archive logo"
                  className="mx-auto rounded-2xl mb-8 shadow-xl"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold transform rotate-12 shadow-lg">
                  Portfolio Project
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-7xl mb-8">
                  Brain <span className="text-primary">Archive</span>
                </h1>
                <p className="text-muted-foreground text-xl leading-8 max-w-2xl mx-auto mb-12">
                  A full-stack document management system built with Next.js,
                  Convex, and AI capabilities. Showcasing modern web development
                  practices and real-world application architecture.
                </p>
                <div className="flex items-center justify-center gap-x-6">
                  <Link
                    href="https://github.com/yourusername/brain-archive"
                    target="_blank"
                  >
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      View Source Code
                    </Button>
                  </Link>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    See Features
                    <span
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="py-24 bg-muted/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Built With Modern Technologies
              </h2>
              <p className="text-lg text-muted-foreground">
                Leveraging the latest tools and frameworks for optimal
                performance
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <tech.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {tech.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Key Features Implemented
              </h2>
              <p className="text-lg text-muted-foreground">
                Demonstrating full-stack development capabilities
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const features = [
  {
    title: "Vector Search",
    description:
      "Implemented using OpenAI embeddings for semantic document search capabilities.",
    icon: Search,
  },
  {
    title: "Real-time Updates",
    description:
      "Built with Convex backend for instant data synchronization across clients.",
    icon: Zap,
  },
  {
    title: "Authentication",
    description:
      "Secure user authentication and organization management using Clerk.",
    icon: Shield,
  },
  {
    title: "Document Management",
    description:
      "Full CRUD operations with file upload and processing capabilities.",
    icon: FolderTree,
  },
  {
    title: "Multi-user Support",
    description: "Team collaboration features with role-based access control.",
    icon: Users,
  },
  {
    title: "AI Integration",
    description:
      "ChatGPT integration for intelligent document analysis and querying.",
    icon: Bot,
  },
];

const techStack = [
  {
    name: "Next.js",
    icon: () => (
      <Image
        src="/nextjs.svg"
        width={48}
        height={48}
        alt="Next.js"
        className="dark:invert"
      />
    ),
  },
  {
    name: "TypeScript",
    icon: () => (
      <Image src="/typescript.svg" width={48} height={48} alt="TypeScript" />
    ),
  },
  {
    name: "Tailwind CSS",
    icon: () => (
      <Image src="/tailwind.svg" width={48} height={48} alt="Tailwind" />
    ),
  },
  {
    name: "Convex",
    icon: () => (
      <Image src="/convex.webp" width={48} height={48} alt="Convex" />
    ),
  },
];
