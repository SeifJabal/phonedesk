'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Tablet, Laptop, Watch, Gamepad2, Shield, Clock, Star, Gift, MapPin, Phone as PhoneIcon, Mail, ChevronDown, Home } from 'lucide-react';
import { useState } from 'react';

export default function RepairShopHome() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const deviceTypes = [
    { 
      icon: Smartphone, 
      name: 'Smartphone', 
      description: 'iPhone, Samsung, Huawei...',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'
    },
    { 
      icon: Tablet, 
      name: 'Tablette', 
      description: 'iPad, Samsung Tab...',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'
    },
    { 
      icon: Laptop, 
      name: 'Ordinateur', 
      description: 'MacBook, PC...',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'
    },
    { 
      icon: Gamepad2, 
      name: 'Console', 
      description: 'PlayStation, Xbox...',
      image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&q=80'
    },
    { 
      icon: Watch, 
      name: 'Montre', 
      description: 'Apple Watch, Galaxy Watch...',
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80'
    },
  ];

  const brands = [
    { name: 'Apple', logo: '🍎' },
    { name: 'Samsung', logo: '📱' },
    { name: 'Google', logo: '🔍' },
    { name: 'Huawei', logo: '📲' },
    { name: 'Xiaomi', logo: '📱' },
    { name: 'Oppo', logo: '📞' },
  ];

  const services = [
    { title: 'Vitre arrière', description: 'Remplacement professionnel de la façade arrière de votre appareil' },
    { title: 'Déverrouillage', description: 'Déverrouillage de votre appareil' },
    { title: 'Réparation avec pièce client', description: 'Réparation effectuée avec votre propre pièce de rechange' },
    { title: 'Micro-soudure', description: 'Réparation avancée de composants électroniques par micro-soudure sur carte mère' },
  ];

  const expertiseServices = [
    { title: 'Restauration ou effacement des données', description: 'Restauration de vos données depuis une sauvegarde ou effacement complet de l\'appareil' },
    { title: 'Transfert de données', description: 'Transfert de vos données vers un nouvel appareil' },
    { title: 'Paramétrage eSim', description: 'Installation et configuration d\'une carte SIM virtuelle' },
    { title: 'Contrôle parental', description: 'Configuration et gestion du contrôle parental sur l\'appareil' },
  ];

  const reviews = [
    {
      name: 'Aline C',
      rating: 5,
      text: 'Je donne 5 étoiles sans hésiter ⭐⭐⭐⭐⭐ Un réparateur très professionnel, sérieux et honnête. Il a réparé mon téléphone parfaitement et très rapidement. Le travail est propre et de grande qualité.',
    },
    {
      name: 'Mouna Otmani',
      rating: 5,
      text: 'Incroyable ! Mon iPhone 16 était complètement éclaté (écran et châssis HS), et il a été littéralement remis à neuf. Travail de précision, le résultat est impeccable.',
    },
    {
      name: 'Colestine Gomes',
      rating: 5,
      text: 'J\'ai pris rdv pour faire remplacer la batterie de mon Galaxy ZFold 5. Devis annoncé, moins de 100 euros, réalisé en moins d\'une heure d\'attente !! Batteries d\'origine je précise.',
    },
    {
      name: 'Riri Pike',
      rating: 5,
      text: 'J\'ai fait réparer l\'écran de mon Google pixel 9a, Réparation rapide. Présent au rendez-vous à 10h comme convenu Service de qualité. Je recommande ce magasin !',
    },
    {
      name: 'Hakima Moussayir',
      rating: 5,
      text: 'Boutique de réparation téléphone très professionnelle ! Le diagnostic a été réalisé rapidement et avec beaucoup de sérieux. Le réparateur est honnête et explique clairement le problème.',
    },
  ];

  const faqs = [
    {
      question: 'Où se situe l\'atelier de réparation ?',
      answer: 'Notre atelier est situé à Louviers. Vous pouvez consulter notre adresse exacte dans la section "Notre localisation" en bas de page.',
    },
    {
      question: 'Comment se rendre chez le réparateur ?',
      answer: 'Nous sommes facilement accessibles en voiture ou en transports en commun. Une carte interactive est disponible sur notre page de contact.',
    },
    {
      question: 'Quels sont les jours d\'ouverture ?',
      answer: 'Nous sommes ouverts du lundi au samedi de 10h00 à 19h00. Fermé le dimanche.',
    },
    {
      question: 'Est-il possible de faire réparer mon smartphone à domicile ?',
      answer: 'Oui ! Nos techniciens qualifiés se déplacent directement chez vous ou sur votre lieu de travail pour effectuer les réparations.',
    },
    {
      question: 'Les interventions sont-elles couvertes par une garantie ?',
      answer: 'Absolument ! Toutes nos réparations sont garanties 6 mois minimum pour votre tranquillité d\'esprit.',
    },
  ];

  const openingHours = [
    { day: 'Lundi', hours: '10:00 - 19:00' },
    { day: 'Mardi', hours: '10:00 - 19:00' },
    { day: 'Mercredi', hours: '10:00 - 19:00' },
    { day: 'Jeudi', hours: '10:00 - 19:00' },
    { day: 'Vendredi', hours: '10:00 - 19:00' },
    { day: 'Samedi', hours: '10:00 - 19:00' },
    { day: 'Dimanche', hours: 'Fermé' },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-24 overflow-hidden">
        {/* Background Image - Phone Repair Store */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1920&q=80" 
            alt="Phone Repair Store"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              VOTRE RÉPARATEUR
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Réparation Téléphone à Louviers
            </h2>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-semibold">4.9/5</span>
              <span className="text-indigo-100">Basé sur plus de 1200 avis</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 text-lg" asChild>
                <Link href="/devis">
                  Obtenir un devis gratuit
                </Link>
              </Button>
              <Button size="lg" className="bg-green-500 text-white hover:bg-green-600 px-8 text-lg shadow-lg" asChild>
                <a href="tel:0123456789">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Appeler maintenant
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/150?img=1" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=5" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=8" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=12" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=15" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <p className="text-indigo-100">Plus de 5000 clients satisfaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Device Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Que souhaitez-vous réparer aujourd'hui ?
            </h2>
            <p className="text-lg text-gray-600">
              Choisissez le type d'appareil que vous souhaitez réparer et découvrez nos services adaptés à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {deviceTypes.map((device, index) => (
              <Link key={index} href="/devis">
                <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-indigo-500 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-40 w-full overflow-hidden">
                      <img 
                        src={device.image} 
                        alt={device.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{device.name}</h3>
                      <p className="text-sm text-gray-500">{device.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Offer Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-12 w-12" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Cadeau offert
                </h2>
              </div>
              <p className="text-xl text-indigo-100 mb-6">
                Un cadeau est offert pour toute réparation : <strong>Film de protection hydrogel</strong> d'une valeur de 20€ pour le mobile de votre choix (pour toute réparation facturée d'un montant supérieur ou égal à 49€).
              </p>
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
                <Link href="/devis">
                  Obtenez un devis gratuit
                </Link>
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
                <Gift className="h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 bg-indigo-50 rounded-full flex items-center justify-center">
                <Shield className="h-32 w-32 text-indigo-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Garantie sur nos réparations
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Nous vous offrons une garantie sur les prestations associées à votre réparation !
              </p>
              <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-8 w-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-gray-900">GARANTIE</h3>
                </div>
                <p className="text-gray-700">
                  VOTRE TRANQUILLITÉ, GARANTIE SANS SOUCI NI FRAIS. Toutes nos réparations sont couvertes pendant 6 mois minimum.
                </p>
              </div>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <Link href="/devis">
                  Obtenez un devis gratuit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les plus grandes marques
            </h2>
            <p className="text-lg text-gray-600">
              Notre savoir-faire couvre l'ensemble des modèles du marché, des plus récents aux plus anciens.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <Link key={index} href="/devis">
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-3">{brand.logo}</div>
                    <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nous réparons rapidement
            </h2>
            <p className="text-lg text-gray-600">
              Notre équipe d'experts s'engage à fournir des réparations rapides et efficaces pour tous vos appareils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all border-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Home Service Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Réparation à votre domicile ou sur votre lieu de travail
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Home className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Service à domicile disponible</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Intervention rapide</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Techniciens certifiés</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Garantie sur toutes les réparations</h3>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              Nos techniciens qualifiés se déplacent directement chez vous ou sur votre lieu de travail pour effectuer les réparations de vos appareils. Plus besoin de vous déplacer, nous venons à vous !
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/devis">
                Obtenez un devis gratuit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expertise Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-lg text-gray-600">
              De la simple panne à la réparation la plus complexe, nous maîtrisons toutes les compétences pour redonner vie à vos appareils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all border-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez ce que nos clients disent de nos services de réparation et de notre expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-indigo-600">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Encore des questions ? On a les réponses
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Vous n'avez pas trouvé votre bonheur ?
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/devis">
                Obtenir un devis gratuit
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre localisation
            </h2>
            <p className="text-lg text-gray-600">
              Retrouvez-nous à notre adresse ou consultez nos horaires d'ouverture pour planifier votre visite.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Adresse</h3>
                    <p className="text-gray-600">
                      Centre-ville, Louviers<br />
                      27400 Louviers, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <PhoneIcon className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Téléphone</h3>
                    <a href="tel:0123456789" className="text-indigo-600 hover:underline">
                      01 23 45 67 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Email</h3>
                    <a href="mailto:contact@repair-shop.fr" className="text-indigo-600 hover:underline">
                      contact@repair-shop.fr
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-6">Horaires d'ouverture</h3>
                <div className="space-y-3">
                  {openingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                      <span className={schedule.hours === 'Fermé' ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" variant="outline" className="border-2" asChild>
              <a href="https://www.google.com/maps/search/?api=1&query=Louviers" target="_blank" rel="noopener noreferrer">
                <MapPin className="h-5 w-5 mr-2" />
                Voir sur Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à réparer votre appareil ?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits. Obtenez votre devis gratuit dès maintenant !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8" asChild>
              <Link href="/devis">
                Obtenir un devis gratuit
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8" asChild>
              <a href="tel:0123456789">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Appeler maintenant
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
