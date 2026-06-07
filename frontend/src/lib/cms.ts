// ─── CMS Content Types ─────────────────────────────────────────────────────

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  price: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

export interface RealisationItem {
  title: string;
  description: string;
  category: string;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  rating: number;
  text: string;
  device: string;
}

export interface HourItem {
  day: string;
  hours: string;
}

export interface CmsContent {
  services: {
    hero: { title: string; subtitle: string };
    items: ServiceItem[];
  };
  about: {
    hero: { title: string; subtitle: string };
    story: string;
    stats: AboutStat[];
    values: AboutValue[];
  };
  realisations: {
    hero: { title: string; subtitle: string };
    items: RealisationItem[];
  };
  faq: {
    hero: { title: string; subtitle: string };
    items: FaqItem[];
  };
  temoignages: {
    hero: { title: string; subtitle: string };
    items: TestimonialItem[];
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    mapUrl: string;
    hours: HourItem[];
  };
}

// ─── Default Content ────────────────────────────────────────────────────────

export const defaultCmsContent: CmsContent = {
  services: {
    hero: {
      title: 'Nos Services de Réparation',
      subtitle: 'Des experts à votre service pour réparer tous vos appareils, rapidement et avec garantie.',
    },
    items: [
      { icon: '📱', title: "Remplacement d'écran", description: 'Réparation et remplacement de tous types d\'écrans : LCD, OLED, AMOLED.', price: 'À partir de 49€' },
      { icon: '🔋', title: 'Remplacement de batterie', description: 'Batterie originale ou certifiée, autonomie restaurée, garantie 6 mois.', price: 'À partir de 39€' },
      { icon: '📷', title: 'Réparation caméra', description: 'Caméra avant et arrière, objectif, module photo, FaceID.', price: 'À partir de 59€' },
      { icon: '🔌', title: 'Réparation port de charge', description: 'Connecteur USB-C, Lightning, micro-USB défaillant.', price: 'À partir de 49€' },
      { icon: '💧', title: 'Dégât des eaux', description: 'Nettoyage, séchage et traitement des dommages dus à l\'humidité.', price: 'Sur devis' },
      { icon: '🔲', title: 'Vitre arrière', description: 'Remplacement de la façade arrière en verre avec collage professionnel.', price: 'À partir de 69€' },
      { icon: '🔊', title: 'Réparation audio', description: 'Haut-parleur, écouteur interne, microphone défectueux.', price: 'À partir de 39€' },
      { icon: '⚙️', title: 'Micro-soudure', description: 'Réparation avancée de composants électroniques sur carte mère.', price: 'Sur devis' },
      { icon: '📤', title: 'Transfert de données', description: 'Migration complète de vos données vers un nouvel appareil.', price: 'À partir de 29€' },
      { icon: '🔒', title: 'Déverrouillage', description: "Déverrouillage réseau, code ou compte pour libérer votre appareil.", price: 'Sur devis' },
      { icon: '🧹', title: 'Nettoyage & maintenance', description: 'Nettoyage interne, remplacement pâte thermique, ventilateur.', price: 'À partir de 29€' },
      { icon: '🐛', title: 'Bug logiciel', description: 'Réinitialisation, désinfection, restauration système.', price: 'À partir de 29€' },
    ],
  },
  about: {
    hero: {
      title: 'À Propos de Nous',
      subtitle: 'Passionnés de technologie, engagés pour votre satisfaction depuis plusieurs années.',
    },
    story: 'PhoneRepair Louviers est né de la passion pour la technologie et du désir d\'offrir un service de réparation de qualité, honnête et transparent. Installés à Louviers depuis plusieurs années, nous avons développé un savoir-faire reconnu par des milliers de clients satisfaits. Notre équipe de techniciens certifiés s\'engage à donner une seconde vie à vos appareils avec des pièces de qualité et un service irréprochable. Nous croyons que chaque réparation doit être effectuée avec soin, dans les délais annoncés, au prix convenu.',
    stats: [
      { value: '5 000+', label: 'Clients satisfaits' },
      { value: '1 200+', label: 'Avis positifs' },
      { value: '6 mois', label: 'Garantie réparations' },
      { value: '4.9/5', label: 'Note moyenne' },
    ],
    values: [
      { icon: '🏆', title: 'Expertise', description: 'Techniciens certifiés avec des années d\'expérience sur toutes les marques et tous les modèles.' },
      { icon: '🔍', title: 'Transparence', description: 'Devis gratuit, prix annoncés à l\'avance, aucune mauvaise surprise à la facturation.' },
      { icon: '⚡', title: 'Rapidité', description: 'La plupart des réparations courantes sont effectuées le jour même, en moins d\'une heure.' },
      { icon: '🛡️', title: 'Garantie', description: 'Toutes nos réparations sont garanties 6 mois minimum pour votre tranquillité d\'esprit.' },
    ],
  },
  realisations: {
    hero: {
      title: 'Nos Réalisations',
      subtitle: 'Quelques exemples concrets de réparations effectuées par notre équipe.',
    },
    items: [
      { title: 'iPhone 15 Pro Max – Écran OLED', description: 'Remplacement complet de l\'écran OLED après chute violente. Résultat comme neuf, FaceID conservé.', category: 'Smartphone', result: 'Réparé en 45 min' },
      { title: 'Samsung Galaxy S24 Ultra – Vitre arrière', description: 'Remplacement de la vitre arrière brisée avec collage professionnel et traitement anti-UV.', category: 'Smartphone', result: 'Réparé en 1h' },
      { title: 'MacBook Pro 14" – Clavier et batterie', description: 'Remplacement du clavier AZERTY complet et de la batterie gonflée. Ordinateur comme neuf.', category: 'Ordinateur', result: 'Réparé en 2h' },
      { title: 'PlayStation 5 – Nettoyage complet', description: 'Nettoyage approfondi, remplacement de la pâte thermique, ventilateur silencieux à nouveau.', category: 'Console', result: 'Réparé en 1h30' },
      { title: 'iPad Pro 12.9" – Port USB-C', description: 'Remplacement du connecteur USB-C défaillant. Charge et synchronisation restaurées.', category: 'Tablette', result: 'Réparé en 1h' },
      { title: 'Galaxy Z Fold 5 – Batterie', description: 'Remplacement batterie avec pièce d\'origine Samsung. Autonomie entièrement restaurée.', category: 'Smartphone', result: 'Réparé en 1h15' },
    ],
  },
  faq: {
    hero: {
      title: 'Questions Fréquentes',
      subtitle: 'Toutes les réponses à vos questions sur nos services de réparation.',
    },
    items: [
      { question: 'Où se situe l\'atelier de réparation ?', answer: 'Notre atelier est situé au centre-ville de Louviers (27400). Consultez la page Contact pour l\'adresse exacte et un itinéraire.' },
      { question: 'Quels sont vos horaires d\'ouverture ?', answer: 'Nous sommes ouverts du lundi au samedi de 10h00 à 19h00. Fermé le dimanche.' },
      { question: 'Combien de temps dure une réparation ?', answer: 'La plupart des réparations courantes (écran, batterie, connecteur) sont effectuées en moins d\'une heure. Les réparations complexes peuvent nécessiter 24 à 48h.' },
      { question: 'Est-ce que vous offrez une garantie ?', answer: 'Oui, toutes nos réparations sont garanties 6 mois minimum. En cas de problème lié à la réparation, nous intervenons gratuitement.' },
      { question: 'Proposez-vous des réparations à domicile ?', answer: 'Oui ! Nos techniciens peuvent se déplacer chez vous ou sur votre lieu de travail pour les réparations. Contactez-nous pour organiser une intervention.' },
      { question: 'Quelles marques réparez-vous ?', answer: 'Nous réparons toutes les grandes marques : Apple, Samsung, Google, Huawei, Xiaomi, Sony, OnePlus, Motorola, et bien d\'autres. Toutes marques confondues.' },
      { question: 'Puis-je apporter ma propre pièce de rechange ?', answer: 'Oui, nous acceptons les pièces fournies par le client. Signalez-le lors de votre demande de devis en cochant la case correspondante.' },
      { question: 'Comment obtenir un devis ?', answer: 'Remplissez notre formulaire de devis en ligne en moins de 2 minutes. Le service est 100% gratuit, sans engagement et sans création de compte.' },
      { question: 'Utilisez-vous des pièces d\'origine ?', answer: 'Nous proposons des pièces d\'origine constructeur ou des pièces certifiées de haute qualité selon votre budget. Le choix vous appartient et est indiqué dans le devis.' },
      { question: 'Que faire si mon appareil ne s\'allume plus ?', answer: 'Apportez-le directement à notre atelier ou demandez un devis en ligne. Nous effectuons un diagnostic gratuit pour identifier la cause du problème.' },
    ],
  },
  temoignages: {
    hero: {
      title: 'Témoignages Clients',
      subtitle: 'Plus de 1 200 avis positifs. Découvrez ce que nos clients pensent de nous.',
    },
    items: [
      { name: 'Aline C.', rating: 5, text: 'Je donne 5 étoiles sans hésiter ! Un réparateur très professionnel, sérieux et honnête. Il a réparé mon téléphone parfaitement et très rapidement. Le travail est propre et de grande qualité.', device: 'iPhone 14 Pro' },
      { name: 'Mouna O.', rating: 5, text: 'Incroyable ! Mon iPhone 16 était complètement éclaté (écran et châssis HS), et il a été littéralement remis à neuf. Travail de précision, le résultat est impeccable.', device: 'iPhone 16' },
      { name: 'Colestine G.', rating: 5, text: 'J\'ai pris rdv pour faire remplacer la batterie de mon Galaxy ZFold 5. Devis annoncé, moins de 100 euros, réalisé en moins d\'une heure ! Batteries d\'origine je précise.', device: 'Samsung Galaxy Z Fold 5' },
      { name: 'Riri P.', rating: 5, text: 'J\'ai fait réparer l\'écran de mon Google Pixel 9a. Réparation rapide. Présent au rendez-vous à 10h comme convenu. Service de qualité. Je recommande ce magasin !', device: 'Google Pixel 9a' },
      { name: 'Hakima M.', rating: 5, text: 'Boutique de réparation très professionnelle ! Le diagnostic a été réalisé rapidement et avec beaucoup de sérieux. Le réparateur est honnête et explique clairement le problème.', device: 'Samsung Galaxy S23' },
      { name: 'Thomas D.', rating: 5, text: 'Service excellent ! Mon MacBook Pro a été réparé en 2h, prix annoncé respecté, rien à redire. Technicien très compétent et sympathique. Je reviendrai sans hésiter.', device: 'MacBook Pro 14"' },
      { name: 'Léa M.', rating: 5, text: 'Super expérience ! Écran de mon Samsung remplacé en moins d\'une heure, qualité irréprochable. Le prix était très correct par rapport à d\'autres boutiques.', device: 'Samsung Galaxy S22' },
      { name: 'Karim B.', rating: 5, text: 'Réparation rapide et efficace. Mon iPad avait le port de charge cassé, problème réglé en 1h. Bon accueil, bon prix, garantie 6 mois. Top !', device: 'iPad Pro 11"' },
    ],
  },
  contact: {
    address: 'Centre-ville, Louviers, 27400, France',
    phone: '02 XX XX XX XX',
    email: 'contact@phonerepair-louviers.fr',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Louviers+27400',
    hours: [
      { day: 'Lundi', hours: '10:00 - 19:00' },
      { day: 'Mardi', hours: '10:00 - 19:00' },
      { day: 'Mercredi', hours: '10:00 - 19:00' },
      { day: 'Jeudi', hours: '10:00 - 19:00' },
      { day: 'Vendredi', hours: '10:00 - 19:00' },
      { day: 'Samedi', hours: '10:00 - 19:00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export function loadCmsContent(): CmsContent {
  if (typeof window === 'undefined') return defaultCmsContent;
  try {
    const stored = localStorage.getItem('cms_content');
    if (!stored) return defaultCmsContent;
    const parsed = JSON.parse(stored) as Partial<CmsContent>;
    return {
      services: {
        ...defaultCmsContent.services,
        ...parsed.services,
        hero: { ...defaultCmsContent.services.hero, ...parsed.services?.hero },
        items: parsed.services?.items ?? defaultCmsContent.services.items,
      },
      about: {
        ...defaultCmsContent.about,
        ...parsed.about,
        hero: { ...defaultCmsContent.about.hero, ...parsed.about?.hero },
        stats: parsed.about?.stats ?? defaultCmsContent.about.stats,
        values: parsed.about?.values ?? defaultCmsContent.about.values,
      },
      realisations: {
        ...defaultCmsContent.realisations,
        ...parsed.realisations,
        hero: { ...defaultCmsContent.realisations.hero, ...parsed.realisations?.hero },
        items: parsed.realisations?.items ?? defaultCmsContent.realisations.items,
      },
      faq: {
        ...defaultCmsContent.faq,
        ...parsed.faq,
        hero: { ...defaultCmsContent.faq.hero, ...parsed.faq?.hero },
        items: parsed.faq?.items ?? defaultCmsContent.faq.items,
      },
      temoignages: {
        ...defaultCmsContent.temoignages,
        ...parsed.temoignages,
        hero: { ...defaultCmsContent.temoignages.hero, ...parsed.temoignages?.hero },
        items: parsed.temoignages?.items ?? defaultCmsContent.temoignages.items,
      },
      contact: {
        ...defaultCmsContent.contact,
        ...parsed.contact,
        hours: parsed.contact?.hours ?? defaultCmsContent.contact.hours,
      },
    };
  } catch {
    return defaultCmsContent;
  }
}

export function saveCmsContent(content: CmsContent): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cms_content', JSON.stringify(content));
}
