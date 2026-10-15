import {
  Activity,
  BatteryCharging,
  Building2,
  Layers,
  RefreshCw,
  Search,
  Sun,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Maps the `icon` key in the service data to a lucide icon component. */
const iconMap: Record<string, LucideIcon> = {
  sun: Sun,
  battery: BatteryCharging,
  layers: Layers,
  refresh: RefreshCw,
  search: Search,
  activity: Activity,
  building: Building2,
  wrench: Wrench,
  zap: Zap,
};

export function ServiceIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = iconMap[name] ?? Sun;
  return <Icon aria-hidden="true" size={size} />;
}
