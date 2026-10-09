import type { Metadata } from "next";
import { HomeMotion } from "@/components/motion/home-motion";
import { Fragment } from "react";
import { HomeIntro } from "@/components/home/home-intro";
import { EnterpriseAI } from "@/components/home/enterprise-ai";
import { WorkflowTopics } from "@/components/home/workflow-topics";
import { Stats } from "@/components/home/stats";
import { PlatformStack } from "@/components/home/platform-stack";
import { WhyChoose } from "@/components/home/why-choose";
import { ReosDemo } from "@/components/home/reos-demo";
import { Integrations } from "@/components/home/integrations";
import { Partners } from "@/components/home/partners";
import { Security } from "@/components/home/security";
import { Testimonials } from "@/components/home/testimonials";
import { BlogPreview } from "@/components/home/blog-preview";
import { FAQ } from "@/components/home/faq";
import { Footer } from "@/components/layout/footer";
import { FloatingCTA } from "@/components/home/floating-cta";

export const metadata: Metadata = { alternates: { canonical: "/" } };
const sections = [HomeIntro, EnterpriseAI, WorkflowTopics, Stats, PlatformStack, WhyChoose, ReosDemo, Integrations, Partners, Security, Testimonials, BlogPreview, FAQ];

export default function HomePage() {
  return <HomeMotion><main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">{sections.map((Section, index) => <Fragment key={index}><Section />{index < sections.length - 1 && <div className="home-divider" aria-hidden="true" />}</Fragment>)}</main><Footer /><FloatingCTA /></HomeMotion>;
}
