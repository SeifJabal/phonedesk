'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ChevronDown } from 'lucide-react';
import { loadCmsContent } from '@/lib/cms';
import Link from 'next/link';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

const QUICK_REPLIES = [
  '🕙 Horaires',
  '📍 Adresse',
  '🔧 Services',
  '💰 Tarifs',
  '📅 Prendre RDV',
  '🛡️ Garantie',
];

function getTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function getBotResponse(input: string, cms: ReturnType<typeof loadCmsContent>): string {
  const q = input.toLowerCase().trim();

  // Greeting
  if (/^(bonjour|salut|hello|bonsoir|coucou|hi|hey|bonne? ?(matin|soir|nuit))/.test(q))
    return `Bonjour ! 👋 Je suis l'assistant virtuel de **PhoneRepair Louviers**. Comment puis-je vous aider aujourd'hui ?`;

  // Hours
  if (/horaire|ouvert|heure|ferme|fermé|ouverture|ouvrante|joignable/.test(q)) {
    const hrs = cms.contact.hours.map(h => `• ${h.day} : **${h.hours}**`).join('\n');
    return `🕙 **Nos horaires d'ouverture :**\n${hrs}`;
  }

  // Address
  if (/adresse|où|localisation|situe|situé|trouver|plan|maps|venir|itinéraire|lieu|quartier/.test(q))
    return `📍 **Notre adresse :**\n${cms.contact.address}\n\n👉 [Voir sur Google Maps](${cms.contact.mapUrl})`;

  // Phone / Contact
  if (/téléphone|phone|appeler|appel|contact|joindre|numéro|email|mail/.test(q))
    return `📞 **Téléphone :** ${cms.contact.phone}\n📧 **Email :** ${cms.contact.email}\n\nOu remplissez notre [formulaire de contact](/contact) directement en ligne !`;

  // Services
  if (/service|services|réparer|réparation|réparations|propose|faites|prise en charge|capables|pouvez/.test(q))
    return `🔧 **Nos principales réparations :**\n• 📱 Smartphones & tablettes\n• 💻 Ordinateurs\n• 🎮 Consoles\n• ⌚ Montres connectées\n\nPannes : écran cassé, batterie, port de charge, caméra, dégât des eaux, vitre arrière…\n\n👉 Consultez [tous nos services](/services)`;

  // Pricing
  if (/prix|tarif|tarifs|coût|combien|cher|coûte|tarification|budget/.test(q))
    return `💰 **Nos tarifs indicatifs :**\n• Écran : à partir de **49€**\n• Batterie : à partir de **39€**\n• Port de charge : à partir de **49€**\n• Caméra : à partir de **59€**\n• Vitre arrière : à partir de **69€**\n\nObtenez un devis précis et gratuit ➜ [Devis gratuit](/devis)`;

  // Warranty
  if (/garantie|garanti|garantis|remboursement|assurance|couvert/.test(q))
    return `🛡️ Toutes nos réparations sont garanties **6 mois minimum**. Si un problème survient après l'intervention, nous intervenons gratuitement. Votre tranquillité d'esprit est notre priorité.`;

  // Duration / delay
  if (/délai|temps|durée|rapide|long|attente|combien de temps|vite/.test(q))
    return `⚡ La plupart des réparations courantes sont effectuées **en moins d'une heure** (écran, batterie, connecteur). Les réparations plus complexes peuvent prendre 24 à 48h. Nous vous prévenons toujours à l'avance.`;

  // Appointment / booking
  if (/rendez-vous|rdv|réserver|booking|prendre|programmer|appointment/.test(q))
    return `📅 Réservez votre créneau en ligne en 2 minutes !\n\n👉 [Obtenir un devis gratuit](/devis)\n\nC'est gratuit, sans engagement et sans création de compte.`;

  // Devis
  if (/devis|gratuit|estimer|estimation|quote/.test(q))
    return `🎯 Notre service de devis est **100% gratuit et sans engagement** !\n\n👉 [Démarrer mon devis](/devis)\n\nMoins de 2 minutes pour décrire votre panne et choisir votre créneau.`;

  // Home service
  if (/domicile|déplace|déplacement|maison|bureau|lieu de travail|livraison/.test(q))
    return `🚗 Oui, nous proposons des **réparations à domicile** ! Nos techniciens se déplacent chez vous ou sur votre lieu de travail. Contactez-nous pour organiser l'intervention.`;

  // Brands
  if (/apple|iphone|samsung|galaxy|google|pixel|huawei|xiaomi|sony|oneplus|motorola|marque/.test(q))
    return `✅ Nous réparons **toutes les grandes marques** : Apple, Samsung, Google, Huawei, Xiaomi, Sony, OnePlus, Motorola, et bien d'autres. Toutes marques et tous modèles confondus.`;

  // IMEI
  if (/imei|imei|numéro série|numero serie/.test(q))
    return `📟 Pour trouver votre numéro IMEI, composez **\*#06#** sur votre téléphone. Vous pouvez l'indiquer lors de votre demande de devis pour un suivi précis.`;

  // FAQ
  if (/faq|question|questions|aide|help|savoir|info|information/.test(q))
    return `❓ Retrouvez toutes les réponses dans notre [FAQ](/faq). Pour une question spécifique, je suis là ! Tapez votre question directement.`;

  // Testimonials
  if (/avis|témoignage|client|clients|recommande|satisfaction/.test(q))
    return `⭐ Nous avons **4.9/5** basé sur plus de 1 200 avis ! Découvrez ce que nos clients disent de nous ➜ [Témoignages](/temoignages)`;

  // Thanks
  if (/merci|super|parfait|ok|bien|génial|excellent|top|sympa|bonne journée/.test(q))
    return `Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions. Bonne journée ! 🌟`;

  // Goodbye
  if (/au revoir|bye|goodbye|à bientôt|bonne journée|bonne soirée/.test(q))
    return `Au revoir ! 👋 À bientôt chez PhoneRepair Louviers ! N'hésitez pas à revenir si vous avez besoin.`;

  // Default
  return `Je n'ai pas bien compris votre question 🤔 Essayez l'une des suggestions ci-dessous, ou contactez-nous directement :\n\n📞 ${cms.contact.phone}\n📧 ${cms.contact.email}`;
}

// Render text with **bold** and [links](url)
function RenderText({ text }: { text: string }) {
  const parts = text.split('\n');
  return (
    <div className="space-y-0.5">
      {parts.map((line, i) => {
        // Parse bold and links
        const segments = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
        return (
          <div key={i} className={line === '' ? 'h-2' : ''}>
            {segments.map((seg, j) => {
              if (/^\*\*(.+)\*\*$/.test(seg)) {
                return <strong key={j}>{seg.replace(/\*\*/g, '')}</strong>;
              }
              const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (linkMatch) {
                return (
                  <Link key={j} href={linkMatch[2]} className="underline font-medium text-indigo-200 hover:text-white">
                    {linkMatch[1]}
                  </Link>
                );
              }
              return <span key={j}>{seg}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: 'bot',
      text: 'Bonjour ! 👋 Je suis l\'assistant de **PhoneRepair Louviers**. Je peux répondre à vos questions sur nos services, horaires, tarifs… Comment puis-je vous aider ?',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cms] = useState(() => loadCmsContent());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text: trimmed, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(trimmed, cms);
      const botMsg: Message = { id: Date.now() + 1, from: 'bot', text: response, time: getTime() };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 700 + Math.random() * 400);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ouvrir le chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {open ? <ChevronDown className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          style={{ height: '520px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Assistant PhoneRepair</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-indigo-200 text-xs">En ligne</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.from === 'bot' && (
                  <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-indigo-700 text-white rounded-tl-sm'
                }`}>
                  <RenderText text={msg.text} />
                  <p className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-indigo-200 text-right' : 'text-indigo-200'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-indigo-700 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t border-gray-100 bg-white">
            {QUICK_REPLIES.map(qr => (
              <button
                key={qr}
                onClick={() => handleQuickReply(qr)}
                className="flex-shrink-0 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium px-3 py-1.5 rounded-full transition-colors border border-indigo-100"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Écrivez votre message…"
              className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
