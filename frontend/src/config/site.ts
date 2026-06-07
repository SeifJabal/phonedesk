export const siteConfig = {
  name: "PhoneDesk",
  description: "Trouvez le meilleur réparateur de téléphone près de chez vous",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/phonodesk",
    instagram: "https://instagram.com/phonodesk",
    facebook: "https://facebook.com/phonodesk",
  },
  contact: {
    email: "contact@phonodesk.fr",
    phone: "+33 1 23 45 67 89",
  },
};

export const navigation = {
  main: [
    { name: "Nos Services", href: "/services" },
    { name: "À Propos", href: "/about" },
    { name: "Réalisations", href: "/realisations" },
    { name: "FAQ", href: "/faq" },
    { name: "Témoignages", href: "/temoignages" },
    { name: "Contact", href: "/contact" },
  ],
  footer: [
    {
      title: "Navigation",
      links: [
        { name: "Accueil", href: "/" },
        { name: "Nos Services", href: "/services" },
        { name: "Réalisations", href: "/realisations" },
        { name: "À Propos", href: "/about" },
      ],
    },
    {
      title: "Informations",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Témoignages", href: "/temoignages" },
        { name: "Contact", href: "/contact" },
        { name: "Devis gratuit", href: "/devis" },
      ],
    },
    {
      title: "Légal",
      links: [
        { name: "Mentions légales", href: "/legal" },
        { name: "CGU", href: "/terms" },
        { name: "Politique de confidentialité", href: "/privacy" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
  ],
};

export const deviceTypes = [
  { value: "smartphone", label: "Smartphone", icon: "Smartphone" },
  { value: "tablet", label: "Tablette", icon: "Tablet" },
  { value: "computer", label: "Ordinateur", icon: "Laptop" },
  { value: "console", label: "Console", icon: "Gamepad2" },
  { value: "watch", label: "Montre", icon: "Watch" },
];

export const brands = [
  { value: "apple", label: "Apple", popular: true },
  { value: "samsung", label: "Samsung", popular: true },
  { value: "google", label: "Google", popular: true },
  { value: "huawei", label: "Huawei", popular: false },
  { value: "xiaomi", label: "Xiaomi", popular: true },
  { value: "oppo", label: "Oppo", popular: false },
  { value: "oneplus", label: "OnePlus", popular: false },
  { value: "sony", label: "Sony", popular: false },
  { value: "lg", label: "LG", popular: false },
  { value: "motorola", label: "Motorola", popular: false },
];

export const serviceTypes = [
  { value: "screen", label: "Écran", icon: "Monitor" },
  { value: "battery", label: "Batterie", icon: "Battery" },
  { value: "camera", label: "Caméra", icon: "Camera" },
  { value: "speaker", label: "Haut-parleur", icon: "Volume2" },
  { value: "microphone", label: "Microphone", icon: "Mic" },
  { value: "charging-port", label: "Port de charge", icon: "Usb" },
  { value: "buttons", label: "Boutons", icon: "SquareMousePointer" },
  { value: "water-damage", label: "Dégât des eaux", icon: "Droplets" },
  { value: "back-glass", label: "Vitre arrière", icon: "Square" },
  { value: "data-recovery", label: "Récupération de données", icon: "HardDrive" },
];
