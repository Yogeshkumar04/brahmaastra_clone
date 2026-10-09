import type {
  Article, ChatMessage, FaqItem, Feature, Integration, Metric, NavigationItem,
  Partner, PlatformCard, Product, Testimonial, WorkflowTopic,
} from "@/types/content";

// Copy/order: docs/section-inventory.md. Reference asset paths are inventory
// identifiers, not local files; resolve approved replacements before rendering.
export const home = {
  hero: {
    title: "AI workspace.\nBuilt for real estate.",
    lead: "From first lead to final closing.",
    description: "Your team, conversations and next steps—in one place.",
    cta: { label: "Book a Live Demo", href: "https://calendly.com/bramhastraai/30min" },
    secondaryCta: { label: "Explore REOS AI", href: "/rios" },
    floatingCta: { label: "Ask REOS anything...", href: "/rios" },
    badges: ["Official Meta Partner", "WhatsApp Business Solution Provider"],
  },
  announcement: {
    badge: "NEW",
    text: "Explore our new flagship product Trishul",
    cta: { label: "Explore Now", href: "/trishul" },
  },
  navigation: [
    { label: "Trishul", href: "/trishul" },
    { label: "REOS", href: "/rios" },
    { label: "Chanakaya Astra", href: "/chanakaya-astra" },
    { label: "Agency", href: "/for-agency" },
    { label: "About", href: "/about" },
    { label: "Broker", href: "/broker" },
    { label: "Labs", href: "/labs" },
    { label: "Pricing", href: "/pricing" },
  ] satisfies readonly NavigationItem[],
  products: [
    { name: "Trishul", description: "Real estate operating system", href: "/trishul" },
    { name: "REOS", description: "AI intelligence engine", href: "/rios" },
    { name: "Chanakaya Astra", description: "Channel partner growth engine", href: "/chanakaya-astra" },
  ] satisfies readonly Product[],
  enterprise: {
    title: "The enterprise AI platform powering the next generation of real estate",
    description: "Enterprise AI built for real estate—automating operations, accelerating growth, and transforming customer engagement.",
    features: [
      { id: "foundation", title: "AI-First Foundation", description: "Create an AI-ready business built for the future.", icon: "BrainCircuit" },
      { id: "ecosystem", title: "Intelligent AI Ecosystem", description: "Power every workflow with purpose-built AI products.", icon: "Network" },
      { id: "enterprise", title: "Enterprise Ready", description: "Seamlessly integrate with your existing tech stack.", icon: "Blocks" },
      { id: "advantage", title: "Competitive Advantage", description: "Stay ahead with AI built for tomorrow's market.", icon: "TrendingUp" },
    ] satisfies readonly Feature[],
  },
  workflow: {
    eyebrow: "One platform, every workflow",
    title: "Built around the work that moves real estate forward.",
    topics: [
      { id: "sales", number: "01", title: "Sales and pre sales", description: "Turn every enquiry into a timely, qualified conversation.", icon: "MessagesSquare", accent: "primary" },
      { id: "intelligence", number: "02", title: "AI and intelligence", description: "Give your team context, speed, and smarter next steps.", icon: "BrainCircuit", accent: "secondary" },
      { id: "reporting", number: "03", title: "Reporting and analysis", description: "See what is working across every campaign and pipeline.", icon: "ChartNoAxesCombined", accent: "primary" },
      { id: "partners", number: "04", title: "Channel Partners", description: "Keep every partner aligned from first lead to final close.", icon: "Users", accent: "secondary" },
      { id: "experience", number: "05", title: "Customer Experience hub", description: "Make every interaction feel personal, consistent, and easy.", icon: "HeartHandshake", accent: "primary" },
      { id: "communication", number: "06", title: "Communication hub", description: "Reach leads on their preferred channel and log it all.", icon: "Radio", accent: "secondary" },
    ] satisfies readonly WorkflowTopic[],
  },
  statistics: [
    { value: 50, suffix: "%", label: "increase in sales conversions" },
    { value: 60, suffix: "%", label: "reduction in operational costs" },
  ] satisfies readonly Metric[],
  platform: {
    title: "The heartbeat of high-performance agencies",
    cards: [
      { id: "platform", eyebrow: "AGENTIC AI FOR REAL ESTATE", title: "One AI Platform. Every Real Estate Workflow.", description: "Automate lead capture, buyer qualification, follow-ups, site visits, and customer communication with AI Employees that work 24×7.", referenceImage: "/images/newhome/card1.webp", reverse: false },
      { id: "evolution", eyebrow: "PRODUCT EVOLUTION", title: "Built for Tomorrow's Real Estate.", description: "Brahmaastra evolves with your business, delivering AI innovations and automation that help brokers, builders, and sales teams work smarter, respond faster, and close more deals.", referenceImage: "/images/newhome/card2.webp", reverse: true },
      { id: "growth", eyebrow: "GROWING TOGETHER", title: "We Grow As You Grow.", description: "Brahmaastra is your AI-powered growth partner, helping brokers, builders, and real estate teams automate repetitive work, scale effortlessly, and focus on closing more deals.", referenceImage: "/images/newhome/card3.webp", reverse: false },
    ] satisfies readonly PlatformCard[],
  },
  benefits: {
    eyebrow: "GROWING TOGETHER",
    title: "Why Leading Real Estate Teams Choose Brahmaastra.",
    description: "Brahmaastra brings AI Employees, automation, and every essential real estate workflow into one platform—helping your team capture leads, automate follow-ups, close more deals, and scale effortlessly.",
    cta: { label: "Get a Call Back", href: "https://calendly.com/bramhastraai/30min" },
  },
  reos: {
    title: "REOS. Your AI Sales Assistant.",
    description: "Talk, ask, and get things done. REOS handles follow-ups, reminders, site visits and everything in between. So you can focus on closing more deals.",
    cta: { label: "Ask REOS anything...", href: "/rios" },
    messages: [
      { sender: "user", text: "Find me hot 3BHK leads in South Mumbai under 2.5 Cr" },
      { sender: "ai", text: "Found 14 qualified leads! Top 3 matches dispatched to your WhatsApp." },
      { sender: "user", text: "Schedule site visit with Mr. Sharma for tomorrow 4 PM" },
      { sender: "ai", text: "Site visit confirmed! Calendar invite & location sent to Mr. Sharma." },
      { sender: "user", text: "Send project brochure and pricing PDF to lead #204" },
      { sender: "ai", text: "Brochure PDF delivered via WhatsApp & Email. Lead engaged!" },
    ] satisfies readonly ChatMessage[],
  },
  integrations: {
    title: "All your real estate agency tools, connected.",
    description: "Stop juggling multiple systems. Brahmaastra unifies your CRM, AI automation, customer communication, and sales operations into one seamless platform.",
    items: [
      { name: "Meta Leads", referenceAsset: "/svg/integrations/meta.svg" },
      { name: "WhatsApp API", referenceAsset: "/svg/integrations/whatsapp.svg" },
      { name: "MagicBricks", referenceAsset: "/images/integrations/magicbricks.png" },
      { name: "Housing.com", referenceAsset: "/images/integrations/housing.png" },
      { name: "Facebook Ads", referenceAsset: "/svg/integrations/facebook.svg" },
      { name: "Google Ads", referenceAsset: "/images/homeview/google.png" },
      { name: "Zoho CRM", referenceAsset: "/svg/integrations/zoho.svg" },
    ] satisfies readonly Integration[],
  },
  partners: {
    eyebrow: "Our Partners",
    title: "Developers We Work With",
    items: [
      { name: "VIDA Realty", referenceAsset: "/svg/newhome/blogo1.svg" },
      { name: "Disha Elysium", referenceAsset: "/svg/newhome/blogo2.svg" },
      { name: "Emperor Group", referenceAsset: "/svg/newhome/blogo3.svg" },
      { name: "Tulsi Realty", referenceAsset: "/svg/newhome/blogo5.jpeg" },
      { name: "Rutu Group of Companies", referenceAsset: "/svg/newhome/blogo6.jpeg" },
      { name: "Superb Group", referenceAsset: "/svg/newhome/superb.png" },
      { name: "Maa Group of Companies", referenceAsset: "/svg/newhome/maa.png" },
    ] satisfies readonly Partner[],
  },
  security: {
    title: "Enterprise-grade\nsecurity & privacy",
    description: "We take security and compliance seriously. Brahmaastra is SOC 2 Type II and GDPR compliant, trusted by thousands of real estate teams to build secure and compliant AI Agents.",
    features: [
      { id: "ownership", title: "Your data stays yours", description: "Your data is only accessible to your AI agent and is never used to train models.", icon: "Database" },
      { id: "encryption", title: "Data encryption", description: "All data is encrypted at rest and in transit. We use industry-standard encryption algorithms.", icon: "LockKeyhole" },
      { id: "integrations", title: "Secure integrations", description: "We use verified variables to ensure users can access only their own data in your systems.", icon: "ShieldCheck" },
    ] satisfies readonly Feature[],
  },
  testimonials: {
    title: "Loved by real estate teams everywhere",
    description: "Brokers, builders, and agencies running their AI workforce on Brahmaastra.",
    items: [
    {
        "quote": "Brahmaastra turned every WhatsApp enquiry into a qualified lead. Our response time went from hours to seconds.",
        "name": "Rohan Mehta",
        "role": "Founder, Mehta Realty"
    },
    {
        "quote": "REOS handles our first response, follow-ups, and site visit scheduling — our team only steps in to close.",
        "name": "Kavita Desai",
        "role": "Sales Head, Skyline Developers"
    },
    {
        "quote": "Setup took a single day and it was already answering pricing and availability questions better than our juniors.",
        "name": "Arjun Nair",
        "role": "Founder, UrbanNest Properties"
    },
    {
        "quote": "Our site visit conversions went up because buyers get instant, consistent answers instead of waiting on a callback.",
        "name": "Meera Iyer",
        "role": "Marketing Head, Greenfield Builders"
    },
    {
        "quote": "It never sleeps and never loses a lead in a spreadsheet. It's like adding a full sales desk overnight.",
        "name": "Sanjay Kapoor",
        "role": "Director, Kapoor Constructions"
    },
    {
        "quote": "What impressed me most is how naturally it switches between Hindi and English — exactly how our buyers talk to us.",
        "name": "Priyanka Rao",
        "role": "Broker, Rao Realty Partners"
    },
    {
        "quote": "The AI Employees plugged straight into our existing CRM. No migration headaches, just instant automation.",
        "name": "Vikram Shetty",
        "role": "CTO, Horizon Group"
    },
    {
        "quote": "Follow-ups that used to fall through the cracks now happen automatically, every single time.",
        "name": "Ananya Bhatt",
        "role": "Operations Lead, Prestige Homes"
    },
    {
        "quote": "Our brokers now spend their time closing deals instead of typing the same answers fifty times a day.",
        "name": "Rahul Kulkarni",
        "role": "Founder, Kulkarni Estates"
    },
    {
        "quote": "Every lead gets a reply within seconds, day or night. Our conversion rate has never looked better.",
        "name": "Divya Menon",
        "role": "Sales Director, Coastline Properties"
    },
    {
        "quote": "Rolling it out across three cities took days, not months. The AI Employees just picked up the local context.",
        "name": "Karan Malhotra",
        "role": "CEO, Malhotra Infra"
    },
    {
        "quote": "It qualifies buyers before our team even picks up the phone. We only speak to people who are ready.",
        "name": "Neha Choudhary",
        "role": "Head of Sales, Orchid Group"
    }
] satisfies readonly Testimonial[],
  },
  blog: {
    title: "Insights & Real Estate AI Trends",
    description: "Actionable strategies, industry guides, and automation playbooks for modern real estate teams.",
    cta: { label: "View All Articles", href: "/blog" },
    articles: [
    {
        "title": "What Is Brahmaastra.ai? India's AI Operating System Company Explained (2026 Guide)",
        "href": "/blog/what-is-brahmaastra-ai-india-guide",
        "category": "Company",
        "date": "2026-07-17",
        "readTime": "5 min read",
        "excerpt": "Brahmaastra.ai is an Indian AI infrastructure company building organizational intelligence — Trishul (AI engine) and REOS (Real Estate Operating System). Complete 2026 guide.",
        "referenceImage": "/images/newhome/banner1.webp"
    },
    {
        "title": "Trishul AI Explained: Inside India's Intelligence Engine for Business (2026)",
        "href": "/blog/trishul-ai-explained-india-2026",
        "category": "Trishul AI",
        "date": "2026-07-17",
        "readTime": "5 min read",
        "excerpt": "Trishul is Brahmaastra.ai's AI intelligence engine — organizational memory, reasoning and agent orchestration in one architecture. How it works and why India needs it.",
        "referenceImage": "/images/newhome/banner2.webp"
    },
    {
        "title": "Enterprise AI in India 2026: Adoption Data, Maturity Gaps, and Where Brahmaastra.ai Fits",
        "href": "/blog/enterprise-ai-india-2026-data-brahmaastra",
        "category": "Market Data",
        "date": "2026-07-17",
        "readTime": "6 min read",
        "excerpt": "India leads global peers in at-scale AI adoption (Deloitte 2026), yet most enterprises are stuck scaling pilots. The data, the maturity gap, and the infrastructure answer.",
        "referenceImage": "/images/newhome/card1.webp"
    },
    {
        "title": "AI for Real Estate Developers in India: Why the Industry Needs an Operating System, Not More Apps",
        "href": "/blog/ai-real-estate-developers-india-operating-system",
        "category": "Real Estate AI",
        "date": "2026-07-17",
        "readTime": "6 min read",
        "excerpt": "India's PropTech market is growing double digits, yet developers still lose leads in WhatsApp threads. The research case for a Real Estate Operating System — and how REOS works.",
        "referenceImage": "/images/newhome/banner1.webp"
    },
    {
        "title": "Agentic AI in India: How Trishul Brings Working AI Agents to Indian Business (2026)",
        "href": "/blog/agentic-ai-india-trishul-2026",
        "category": "Agentic AI",
        "date": "2026-07-17",
        "readTime": "6 min read",
        "excerpt": "Agentic AI is 2026's enterprise frontier. What AI agents actually do in Indian business contexts, why orchestration and memory decide success, and how Trishul is built for it.",
        "referenceImage": "/images/newhome/banner2.webp"
    },
    {
        "title": "Organizational Memory: The Advantage Indian Businesses Are Losing Every Day (And How to Keep It)",
        "href": "/blog/organizational-memory-indian-business-advantage",
        "category": "Organizational Memory",
        "date": "2026-07-17",
        "readTime": "6 min read",
        "excerpt": "India's businesses run on WhatsApp conversations that evaporate daily. Why organizational memory is the AI era's real moat — and how Brahmaastra.ai captures it.",
        "referenceImage": "/images/newhome/card1.webp"
    }
] satisfies readonly Article[],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Everything you need to know about transforming your real estate agency with Brahmaastra AI.",
    items: [
    {
        "question": "How does Brahmaastra AI integrate with our existing real estate CRM?",
        "answer": "Brahmaastra seamlessly connects with leading real estate CRMs (Meta, WhatsApp API, MagicBricks, Housing.com, Salesforce, HubSpot, and custom APIs). Leads captured across all channels are instantly synced and processed by your AI Employees in real time."
    },
    {
        "question": "Can REOS AI handle site visit scheduling automatically?",
        "answer": "Yes! REOS AI qualifies buyer intent, checks property availability, suggests optimal time slots, confirms site visits, and sends calendar invites and Google Maps location pins directly to buyers via WhatsApp."
    },
    {
        "question": "Is our agency lead data secure and private?",
        "answer": "Absolutely. All data is encrypted at rest and in transit using enterprise-grade encryption. Your agency data is stored securely in your private tenant and is never used to train public AI models."
    },
    {
        "question": "What real estate workflows can Brahmaastra automate?",
        "answer": "Brahmaastra automates 24/7 lead capture, instant qualification, WhatsApp follow-ups, brochure delivery, site visit booking, agent task assignment, and post-visit feedback collection."
    },
    {
        "question": "How long does it take to deploy Brahmaastra for our sales team?",
        "answer": "Deployment typically takes less than 24 hours. Our white-glove onboarding team helps connect your channels, upload your inventory/brochures, and configure REOS AI to match your brand voice."
    }
] satisfies readonly FaqItem[],
  },
  footer: {
    company: "Good Old Delight LLP",
    socialPlatforms: ["Instagram", "LinkedIn", "YouTube"],
    address: "1009, Satra Plaza, Plot No. 19 & 20,\nSector 19D, Palm Beach Road,\nVashi, Navi Mumbai – 400703",
    phone: { label: "+91 70358 44444", href: "tel:+917035844444" },
    emails: [
      { label: "Admin@brahmaastra.ai", href: "mailto:Admin@brahmaastra.ai" },
      { label: "Sales@brahmaastra.ai", href: "mailto:Sales@brahmaastra.ai" },
    ] satisfies readonly NavigationItem[],
    support: { label: "bramhastraai@gmail.com", href: "mailto:bramhastraai@gmail.com" },
    quickLinks: [
      { label: "Chanakaya Astra", href: "/chanakaya-astra" },
      { label: "Agency", href: "/for-agency" },
      { label: "About Us", href: "/about" },
      { label: "Broker", href: "/broker" },
      { label: "Pricing", href: "/pricing" },
      { label: "AI Consultancy", href: "/consultancy" },
    ] satisfies readonly NavigationItem[],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Refund Policy", href: "/refund-policy" },
    ] satisfies readonly NavigationItem[],
  },
} as const;

// Preserve the observed mobile ordering, including Home and Broker before About.
export const mobileNavigation = [
  { label: "Home", href: "/" },
  ...home.navigation.slice(0, 4),
  home.navigation[5], home.navigation[4], ...home.navigation.slice(6),
] as const satisfies readonly NavigationItem[];

export type HomeContent = typeof home;
