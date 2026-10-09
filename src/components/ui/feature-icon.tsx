import { BrainCircuit, Network, Blocks, TrendingUp, MessagesSquare, ChartNoAxesCombined, Users, HeartHandshake, Radio, Database, LockKeyhole, ShieldCheck, type LucideIcon } from "lucide-react";
import type { IconName } from "@/types/content";
const icons: Record<IconName, LucideIcon> = { BrainCircuit, Network, Blocks, TrendingUp, MessagesSquare, ChartNoAxesCombined, Users, HeartHandshake, Radio, Database, LockKeyhole, ShieldCheck };
export function FeatureIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} size={25} strokeWidth={1.7} aria-hidden="true" />;
}
