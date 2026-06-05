export interface Project {
  title: string;
  category: string;
  role: string;
  tools: string;
  description: string;
  outcome: string;
  image: string;
  link?: string;
  type?: string;
}

const projects: Project[] = [
  {
    title: "Eatopia",
    category: "Mobile App · UI/UX Design",
    role: "Solo Designer",
    tools: "Figma",
    description:
      "A personal food ordering app concept designed for quick food discovery, browsing, and ordering. Focused on attractive food cards, clear pricing, easy category browsing, and a smooth add-to-cart experience.",
    outcome:
      "A clean, modern, and easy-to-use food app concept reflecting deep understanding of UI structure, user flow, and visual design.",
    image: "/images/eatopia.png",
  },
  {
    title: "VMS",
    category: "College App · Case Study",
    role: "Solo Designer",
    tools: "Figma",
    description:
      "A college-focused mobile app concept designed to make campus activities organized, accessible, and user-friendly. Features an easy-to-use dashboard, organized college information, and a clean mobile interface.",
    outcome:
      "A neat, practical, and user-friendly college app experience that improved understanding of UI structure, user flow, and real-world problem-solving through design.",
    image: "/images/vms.jpg",
  },
  {
    title: "Apple AirPods",
    category: "Website Recreation · Frontend",
    role: "Designer & Developer",
    tools: "HTML, CSS, JavaScript",
    description:
      "A personal learning project recreating an Apple-inspired product landing page with parallax scrolling. Focuses on minimal design, strong product visuals, smooth scrolling, and clean typography for an elegant, immersive product experience.",
    outcome:
      "Improved understanding of scroll-based animations, visual hierarchy, product presentation, and modern web design interactions.",
    image: "/images/airpods.png",
  },
  {
    title: "Shrestha Cloud",
    category: "Corporate Website · Internship",
    role: "UI/UX Design Intern",
    tools: "Figma",
    description:
      "UI design for the live website of Shrestha Cloud Solutions, an IT consulting and software development company. Designed a clean, responsive, and user-friendly website with improved navigation, visual hierarchy, and service-focused layouts.",
    outcome:
      "Delivered a modern corporate website experience that enhances usability and strengthens the company's online presence.",
    image: "/images/Shrestha mockup.png",
    type: "Live Client Project",
  },
  {
    title: "Konnectly",
    category: "SaaS Platform · Internship",
    role: "UI/UX Design Intern",
    tools: "Figma",
    description:
      "UI design for Konnectly — a live SaaS CRM platform helping businesses manage customer relationships, automate communication, and leverage AI-powered tools. Created intuitive UI screens with clear navigation, structured data visualization, and a modern design system.",
    outcome:
      "Delivered a professional and responsive user experience that improved accessibility, streamlined workflows, and supported the platform's business management goals.",
    image: "/images/sketches mockup.png",
    type: "Live Client Project · CRM, AI & Business Automation",
  },
    {
    title: "Scent Branding platform",
    category: "SaaS Platform · Internship",
    role: "UI/UX Design Intern",
    tools: "Figma",
    description:
      "UI design for Scent branding— a live SaaS CRM platform helping businesses manage customer relationships, automate communication, and leverage AI-powered tools. Created intuitive UI screens with clear navigation, structured data visualization, and a modern design system.",
    outcome:
      "Delivered a professional and responsive user experience that improved accessibility, streamlined workflows, and supported the platform's business management goals.",
    image: "/images/poster mockup.png",
    type: "Branding Promotions",
  },
];

export default projects;
