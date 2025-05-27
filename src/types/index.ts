export interface DashboardCardData {
  title: string;
  count: number;
  icon: React.ReactNode;
  color?: string;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}
