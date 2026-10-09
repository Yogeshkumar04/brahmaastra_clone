import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col"><Container className="ds-section text-center">
      <SectionHeading as="h1" align="center" eyebrow="404" title="Page not found" description="The page you’re looking for doesn’t exist." />
      <Button href="/" className="mt-8">Back to home</Button>
    </Container></main>
  );
}
