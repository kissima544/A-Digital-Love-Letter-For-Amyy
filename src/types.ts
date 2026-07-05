export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  iconName: string; // Dynamic rendering of Lucide icons
  imageUrl?: string;
}

export interface AmazingCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorClass: string; // Tailwind color class for hover glows
}

export interface PolaroidImage {
  id: string;
  url: string;
  caption: string;
  date: string;
  aspect: "portrait" | "landscape" | "square";
  rotation: number; // For elegant random tilt look
}
