'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Smartphone, Tablet, Laptop, Watch, Gamepad2, CheckCircle2, Calendar, Clock, MapPin, Phone as PhoneIcon, Mail } from 'lucide-react';

export default function DevisPage() {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showAllDysfonctionnements, setShowAllDysfonctionnements] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [imei, setImei] = useState('');
  const [hasPart, setHasPart] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showBrandSearch, setShowBrandSearch] = useState(false);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const deviceTypes = [
    { icon: Smartphone, name: 'Smartphone', value: 'smartphone' },
    { icon: Tablet, name: 'Tablette', value: 'tablet' },
    { icon: Laptop, name: 'Ordinateur', value: 'computer' },
    { icon: Gamepad2, name: 'Console', value: 'console' },
    { icon: Watch, name: 'Montre', value: 'watch' },
  ];

  const brandsByDevice: Record<string, Array<{name: string, logo: string}>> = {
    smartphone: [
      { name: 'Apple', logo: '🍎' },
      { name: 'Samsung', logo: '📱' },
      { name: 'Google', logo: '🔍' },
      { name: 'Huawei', logo: '📲' },
      { name: 'Xiaomi', logo: '📱' },
      { name: 'Oppo', logo: '📞' },
      { name: 'OnePlus', logo: '📱' },
      { name: 'Sony', logo: '📱' },
    ],
    tablet: [
      { name: 'Apple', logo: '🍎' },
      { name: 'Samsung', logo: '📱' },
      { name: 'Huawei', logo: '📲' },
      { name: 'Xiaomi', logo: '📱' },
      { name: 'Lenovo', logo: '💻' },
      { name: 'Microsoft', logo: '🪟' },
    ],
    computer: [
      { name: 'Apple', logo: '🍎' },
      { name: 'Dell', logo: '💻' },
      { name: 'HP', logo: '💻' },
      { name: 'Lenovo', logo: '💻' },
      { name: 'Asus', logo: '💻' },
      { name: 'Acer', logo: '💻' },
      { name: 'MSI', logo: '🎮' },
      { name: 'Microsoft', logo: '🪟' },
    ],
    console: [
      { name: 'Sony PlayStation', logo: '🎮' },
      { name: 'Microsoft Xbox', logo: '🎮' },
      { name: 'Nintendo', logo: '🎮' },
      { name: 'Steam Deck', logo: '🎮' },
    ],
    watch: [
      { name: 'Apple', logo: '⌚' },
      { name: 'Samsung', logo: '⌚' },
      { name: 'Garmin', logo: '⌚' },
      { name: 'Fitbit', logo: '⌚' },
      { name: 'Huawei', logo: '⌚' },
      { name: 'Xiaomi', logo: '⌚' },
    ],
  };

  const brands = brandsByDevice[selectedDevice] || brandsByDevice.smartphone;

  const allBrands = [
    'Apple', 'Samsung', 'Google', 'Huawei', 'Xiaomi', 'Oppo', 'OnePlus', 'Sony',
    'Nokia', 'Motorola', 'LG', 'HTC', 'Asus', 'Acer', 'Lenovo', 'ZTE', 'Alcatel',
    'Realme', 'Vivo', 'Honor', 'Nothing', 'Fairphone', 'Wiko', 'Blackberry', 'TCL',
    'Meizu', 'Infinix', 'Tecno', 'Poco', 'Redmi', 'Sharp', 'Panasonic', 'Kyocera',
    'Cat', 'Doogee', 'Ulefone', 'Oukitel', 'Blackview', 'Umidigi', 'Cubot',
    'Crosscall', 'Gigaset', 'Archos', 'BQ', 'Hisense', 'Razer', 'ROG', 'Nubia',
    'Red Magic', 'Black Shark', 'Legion', 'iQOO', 'ZTE Blade', 'Coolpad',
    'Dell', 'HP', 'MSI', 'Microsoft', 'Nintendo', 'Steam Deck', 'Garmin', 'Fitbit',
    'Sony PlayStation', 'Microsoft Xbox'
  ];

  const brandKeywords: Record<string, string[]> = {
    'Apple': ['iphone', 'ipad', 'macbook', 'imac', 'airpods', 'apple watch', 'ios', 'mac'],
    'Samsung': ['galaxy', 'note', 'tab', 'samsung'],
    'Google': ['pixel', 'nexus', 'chromebook'],
    'Huawei': ['p30', 'p40', 'p50', 'p60', 'mate', 'nova', 'matepad'],
    'Xiaomi': ['mi ', 'redmi', 'poco', 'miui'],
    'Sony': ['xperia'],
    'Sony PlayStation': ['playstation', 'ps5', 'ps4', 'ps3', 'ps2'],
    'Microsoft Xbox': ['xbox', 'series x', 'series s'],
    'Nintendo': ['switch', 'wii', 'gameboy', 'ds', '3ds'],
    'Microsoft': ['surface', 'lumia'],
    'OnePlus': ['oneplus'],
    'Motorola': ['moto', 'razr'],
    'Nokia': ['nokia'],
    'LG': ['lg'],
    'Oppo': ['reno', 'find x'],
    'Realme': ['realme'],
    'Honor': ['honor'],
    'Nothing': ['nothing phone'],
    'Garmin': ['fenix', 'forerunner', 'vivoactive', 'garmin'],
    'Fitbit': ['fitbit', 'versa', 'sense', 'charge'],
    'Dell': ['xps', 'inspiron', 'latitude', 'precision'],
    'HP': ['pavilion', 'spectre', 'envy', 'elitebook', 'probook'],
    'Lenovo': ['thinkpad', 'ideapad', 'legion pc', 'yoga'],
    'Asus': ['zenfone', 'rog phone', 'zenbook', 'vivobook'],
    'Acer': ['aspire', 'swift', 'predator'],
    'MSI': ['msi'],
    'Steam Deck': ['steam deck', 'steamdeck'],
  };

  const filteredBrands = allBrands.filter(brand => {
    const q = brandSearchQuery.toLowerCase();
    if (brand.toLowerCase().includes(q)) return true;
    const keywords = brandKeywords[brand] || [];
    return keywords.some(kw => kw.includes(q) || q.includes(kw));
  });

  const modelSuggestions: Record<string, string[]> = {
    'Apple': ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini', 'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini', 'iPhone SE (2022)', 'iPhone SE (2020)', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'iPhone 6s Plus', 'iPhone 6s', 'iPhone 6 Plus', 'iPhone 6', 'iPhone SE (2016)', 'iPad Pro 12.9" (2024)', 'iPad Pro 11" (2024)', 'iPad Air (2024)', 'iPad (2024)', 'iPad mini (2024)', 'MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air 15"', 'MacBook Air 13"', 'iMac 24"', 'Apple Watch Ultra 2', 'Apple Watch Series 10', 'Apple Watch Series 9', 'Apple Watch SE (2024)', 'Apple Watch Ultra'],
    'Samsung': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21', 'Galaxy S21 FE', 'Galaxy S20 Ultra', 'Galaxy S20+', 'Galaxy S20', 'Galaxy S20 FE', 'Galaxy S10+', 'Galaxy S10', 'Galaxy S10e', 'Galaxy S9+', 'Galaxy S9', 'Galaxy S8+', 'Galaxy S8', 'Galaxy Z Fold 6', 'Galaxy Z Fold 5', 'Galaxy Z Fold 4', 'Galaxy Z Fold 3', 'Galaxy Z Fold 2', 'Galaxy Z Flip 6', 'Galaxy Z Flip 5', 'Galaxy Z Flip 4', 'Galaxy Z Flip 3', 'Galaxy Z Flip', 'Galaxy A55', 'Galaxy A54', 'Galaxy A53', 'Galaxy A52', 'Galaxy A51', 'Galaxy A50', 'Galaxy A34', 'Galaxy A33', 'Galaxy A32', 'Galaxy A24', 'Galaxy A23', 'Galaxy A22', 'Galaxy A14', 'Galaxy A13', 'Galaxy A12', 'Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+', 'Galaxy Note 10', 'Galaxy Note 9', 'Galaxy Note 8', 'Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab S8', 'Galaxy Tab A9+', 'Galaxy Watch 7', 'Galaxy Watch 6 Classic', 'Galaxy Watch 6', 'Galaxy Watch 5 Pro', 'Galaxy Watch 5', 'Galaxy Watch 4'],
    'Google': ['Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9', 'Pixel 8 Pro', 'Pixel 8', 'Pixel 8a', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 7a', 'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a', 'Pixel 5a 5G', 'Pixel 5', 'Pixel 4a 5G', 'Pixel 4a', 'Pixel 4 XL', 'Pixel 4', 'Pixel 3a XL', 'Pixel 3a', 'Pixel 3 XL', 'Pixel 3', 'Pixel 2 XL', 'Pixel 2', 'Pixel Tablet', 'Pixel Watch 3', 'Pixel Watch 2', 'Pixel Watch'],
    'Huawei': ['P60 Pro', 'P60', 'P50 Pro', 'P50', 'P40 Pro+', 'P40 Pro', 'P40', 'P40 Lite', 'P30 Pro', 'P30', 'P30 Lite', 'P20 Pro', 'P20', 'P20 Lite', 'Mate 60 Pro', 'Mate 50 Pro', 'Mate 50', 'Mate 40 Pro', 'Mate 40', 'Mate 30 Pro', 'Mate 30', 'Mate 20 Pro', 'Mate 20', 'Nova 12 Pro', 'Nova 12', 'Nova 11 Pro', 'Nova 11', 'Nova 10 Pro', 'Nova 10', 'Nova 9', 'Nova 8', 'Nova 7', 'MatePad Pro', 'MatePad 11', 'Watch GT 4', 'Watch GT 3', 'Watch GT 2'],
    'Xiaomi': ['14 Ultra', '14 Pro', '14', '13 Ultra', '13 Pro', '13', '13T Pro', '13T', '13 Lite', '12 Pro', '12', '12T Pro', '12T', '11 Ultra', '11 Pro', '11', '11T Pro', '11T', 'Mi 10', 'Mi 9', 'Mi 8', 'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13', 'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12', 'Redmi Note 11 Pro', 'Redmi Note 11', 'Redmi Note 10 Pro', 'Redmi Note 10', 'Redmi Note 9 Pro', 'Redmi Note 9', 'Poco F6 Pro', 'Poco F6', 'Poco F5 Pro', 'Poco F5', 'Poco X6 Pro', 'Poco X6', 'Poco X5 Pro', 'Poco X5', 'Poco M6 Pro', 'Poco M6', 'Pad 6 Pro', 'Pad 6', 'Watch S3', 'Watch S2', 'Watch S1'],
    'Oppo': ['Find X7 Ultra', 'Find X7', 'Find X6 Pro', 'Find X6', 'Find X5 Pro', 'Find X5', 'Find X3 Pro', 'Find X3', 'Reno 11 Pro', 'Reno 11', 'Reno 10 Pro+', 'Reno 10 Pro', 'Reno 10', 'Reno 9 Pro', 'Reno 9', 'Reno 8 Pro', 'Reno 8', 'Reno 7', 'Reno 6 Pro', 'Reno 6', 'Reno 5', 'A98', 'A78', 'A58', 'A38', 'A18', 'Pad Air', 'Watch X'],
    'OnePlus': ['12', '11', '10 Pro', '10T', '9 Pro', '9', '8 Pro', '8T', '8', '7T Pro', '7T', '7 Pro', '7', 'Nord 4', 'Nord 3', 'Nord 2', 'Nord CE 4', 'Nord CE 3', 'Nord CE 2', 'Nord N30', 'Nord N20', 'Nord N10', 'Pad', 'Watch 2'],
    'Sony': ['Xperia 1 VI', 'Xperia 1 V', 'Xperia 1 IV', 'Xperia 1 III', 'Xperia 5 V', 'Xperia 5 IV', 'Xperia 5 III', 'Xperia 10 VI', 'Xperia 10 V', 'Xperia 10 IV', 'Xperia 10 III', 'Xperia PRO-I', 'PlayStation 5', 'PlayStation 5 Slim', 'PlayStation 5 Digital', 'PlayStation 4 Pro', 'PlayStation 4'],
    'Sony PlayStation': ['PlayStation 5', 'PlayStation 5 Slim', 'PlayStation 5 Digital Edition', 'PlayStation 4 Pro', 'PlayStation 4 Slim', 'PlayStation 4'],
    'Microsoft Xbox': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S', 'Xbox One'],
    'Microsoft': ['Surface Pro 10', 'Surface Pro 9', 'Surface Laptop 6', 'Surface Laptop 5', 'Surface Go 4', 'Surface Book 3', 'Xbox Series X', 'Xbox Series S'],
    'Nintendo': ['Switch OLED', 'Switch', 'Switch Lite', '3DS XL', '3DS'],
    'Steam Deck': ['Steam Deck OLED 1TB', 'Steam Deck OLED 512GB', 'Steam Deck 512GB', 'Steam Deck 256GB'],
    'Nokia': ['X30', 'X20', 'X10', 'G60', 'G50', 'G42', 'G22', 'G21', 'C32', 'C21', '8.3', '7.2', '6.2', '5.4', '3.4', '2.4'],
    'Motorola': ['Edge 50 Ultra', 'Edge 50 Pro', 'Edge 50', 'Edge 40 Pro', 'Edge 40', 'Edge 30 Ultra', 'Edge 30 Pro', 'Razr 50 Ultra', 'Razr 50', 'Razr 40 Ultra', 'Razr 40', 'Moto G84', 'Moto G73', 'Moto G62', 'Moto G54', 'Moto G34', 'Moto G24', 'Moto G14'],
    'Realme': ['GT 6', 'GT 5 Pro', 'GT 5', 'GT 3', 'GT 2 Pro', '12 Pro+', '12 Pro', '12', '11 Pro+', '11 Pro', '11', 'C67', 'C65', 'C55', 'C53', 'C35', 'Pad 2'],
    'Vivo': ['X100 Pro', 'X100', 'X90 Pro', 'X90', 'V30 Pro', 'V30', 'V29 Pro', 'V29', 'Y200', 'Y100', 'Y56', 'Y36', 'Y27', 'Y17'],
    'Honor': ['Magic 6 Pro', 'Magic 6', 'Magic 5 Pro', 'Magic 5', '200 Pro', '200', '90 Pro', '90', 'X9b', 'X8b', 'X7b', 'X6b', 'Pad 9', 'Watch 4'],
    'Nothing': ['Phone (2a)', 'Phone (2)', 'Phone (1)'],
    'Asus': ['Zenfone 11 Ultra', 'Zenfone 10', 'Zenfone 9', 'ROG Phone 8 Pro', 'ROG Phone 8', 'ROG Phone 7', 'ROG Phone 6 Pro', 'ROG Phone 6', 'Vivobook Pro', 'Zenbook', 'ROG Strix'],
    'Poco': ['F6 Pro', 'F6', 'F5 Pro', 'F5', 'X6 Pro 5G', 'X6 5G', 'M6 Pro', 'M6', 'C65'],
    'Dell': ['XPS 15', 'XPS 13', 'Inspiron 15', 'Inspiron 14', 'Latitude 7440', 'Alienware m18'],
    'HP': ['Spectre x360', 'Envy 15', 'Pavilion 15', 'EliteBook 840', 'Omen 16'],
    'Lenovo': ['ThinkPad X1 Carbon', 'ThinkPad T14', 'IdeaPad 5', 'Yoga 9i', 'Legion 5 Pro', 'Tab P12', 'Tab M10'],
    'Acer': ['Swift 3', 'Aspire 5', 'Predator Helios 300', 'Nitro 5'],
    'MSI': ['GE78 Raider', 'GP76 Leopard', 'Stealth 15M', 'Modern 14'],
    'Garmin': ['fenix 7X', 'fenix 7', 'fenix 6', 'Forerunner 965', 'Forerunner 265', 'Venu 3', 'Venu 2', 'Instinct 2'],
    'Fitbit': ['Sense 2', 'Versa 4', 'Charge 6', 'Inspire 3', 'Luxe'],
  };

  // Smart search: if brand has models, filter them. Otherwise search all models
  const filteredModels = (() => {
    if (selectedBrand && modelSuggestions[selectedBrand]) {
      return modelSuggestions[selectedBrand].filter(model =>
        model.toLowerCase().includes(modelSearchQuery.toLowerCase())
      );
    }
    // Fallback: search across all models
    if (modelSearchQuery.length >= 2) {
      const allModels: string[] = [];
      Object.values(modelSuggestions).forEach(models => allModels.push(...models));
      return allModels.filter(model =>
        model.toLowerCase().includes(modelSearchQuery.toLowerCase())
      ).slice(0, 10); // Limit to 10 results
    }
    return [];
  })();

  const dysfonctionnements = [
    { name: 'Écran', description: 'Écran cassé, affichage défaillant, tactile défectueux', icon: '📱' },
    { name: 'Batterie', description: "Batterie gonflée, qui se décharge rapidement, ou s'éteint soudainement", icon: '🔋' },
    { name: 'Problème de charge', description: 'Appareil qui refuse de se recharger, ou charge anormalement lente', icon: '🔌' },
    { name: 'Problème de connectivité', description: 'Problème général de connectivité (Wi-Fi, Bluetooth, réseau mobile)', icon: '📶' },
    { name: 'Caméra avant', description: 'Ne fonctionne plus, floue, photos tâchées, poussière gênante, plus de FaceID', icon: '🤳' },
    { name: 'Caméra arrière', description: 'Ne fonctionne plus, floue, photos tâchées, poussière gênante', icon: '📷' },
    { name: 'Dommage liquide', description: "Dégradation des composants internes due à l'humidité ou à l'eau", icon: '💧' },
    { name: 'Surchauffe', description: 'Appareil qui chauffe anormalement', icon: '🌡️' },
    { name: 'Problème Audio', description: 'Problème de haut-parleur, de micro, de volume, de son', icon: '🔊' },
    { name: 'Appareil verrouillé', description: 'Appareil verrouillé par un code, un compte ou une protection', icon: '🔒' },
    { name: 'Façade arrière', description: 'Verre arrière cassée ou endommagé', icon: '🔲' },
    { name: 'Déformation', description: 'Appareil déformé', icon: '📐' },
    { name: 'Microphone', description: "On ne m'entend plus ou on m'entend mal", icon: '🎙️' },
    { name: 'Écouteur interne', description: 'Écouteur interne qui ne fonctionne plus lors des appels téléphoniques', icon: '👂' },
    { name: "Bouton d'alimentation", description: "Bouton d'alimentation qui ne répond plus ou qui est bloqué", icon: '⏻' },
    { name: 'Boutons de volume', description: 'Boutons de volume qui ne répondent plus ou qui sont bloqués', icon: '🔘' },
    { name: 'Vibreur', description: 'Vibreur inopérant ou qui produit un bruit anormal', icon: '📳' },
    { name: 'Façade avant', description: 'Façade avant endommagée ou vitre avant cassée', icon: '🪟' },
    { name: 'Châssis', description: "Châssis ou cadre de l'appareil déformé ou endommagé", icon: '🔩' },
    { name: "Capteur d'empreinte", description: "Capteur d'empreinte digitale qui ne reconnaît plus les empreintes", icon: '👆' },
    { name: 'Reconnaissance faciale', description: 'Reconnaissance faciale qui ne fonctionne plus correctement', icon: '🙂' },
    { name: 'Problème Bluetooth', description: 'Problème de connexion Bluetooth ou appareils non détectés', icon: '🔵' },
    { name: 'Réseau mobile', description: 'Problème de réception réseau mobile ou signal faible', icon: '📡' },
    { name: 'Lecteur de carte SIM', description: 'Lecteur de carte SIM qui ne détecte plus la carte ou qui cause des problèmes de réseau', icon: '💳' },
    { name: 'Lecteur de carte SD', description: 'Lecteur de carte SD qui ne détecte plus la carte mémoire', icon: '💾' },
    { name: 'Capteur de proximité', description: 'Capteur de proximité qui ne détecte plus correctement les objets', icon: '📏' },
    { name: 'Capteur de mouvement', description: 'Capteur de mouvement qui ne détecte plus les mouvements correctement', icon: '🏃' },
    { name: 'Gyroscope', description: 'Gyroscope qui ne fonctionne plus correctement', icon: '🌀' },
    { name: 'Prise casque', description: 'Prise casque pour écouteurs qui ne fonctionne plus', icon: '🎧' },
    { name: 'Bug logiciel', description: "Bug logiciel, virus, plantage de l'appareil, redémarre en boucle", icon: '🐛' },
    { name: 'Écran tactile', description: 'Écran tactile qui ne répond plus ou qui réagit de manière erratique', icon: '✋' },
    { name: 'Manette / Joystick', description: 'Manette ou joystick qui ne répond plus ou qui dérive', icon: '🕹️' },
    { name: 'Lecteur de carte de jeu', description: 'Lecteur de carte de jeu qui ne détecte plus les cartes', icon: '🎮' },
    { name: 'Lecteur de disque (CD/DVD/Blu-ray)', description: 'Lecteur de disque (CD/DVD/Blu-ray) qui ne lit plus les disques', icon: '💿' },
    { name: 'Clavier', description: 'Clavier qui ne répond plus ou certaines touches qui ne fonctionnent plus', icon: '⌨️' },
    { name: 'Pavé tactile', description: 'Pavé tactile qui ne répond plus ou qui réagit de manière erratique', icon: '🖱️' },
    { name: 'Disque dur / SSD', description: 'Disque dur ou SSD qui ne fonctionne plus ou qui produit des erreurs', icon: '💽' },
    { name: 'Mémoire RAM', description: 'Mémoire RAM défectueuse causant des plantages ou ralentissements', icon: '🧠' },
    { name: 'Processeur', description: 'Processeur qui surchauffe ou qui ne fonctionne plus correctement', icon: '⚙️' },
    { name: 'Carte mère', description: 'Carte mère endommagée causant des dysfonctionnements multiples', icon: '🔧' },
    { name: 'Carte graphique', description: 'Carte graphique qui ne fonctionne plus ou qui affiche des artefacts', icon: '🖥️' },
    { name: 'Ventilateur de refroidissement', description: 'Ventilateur de refroidissement qui ne tourne plus ou qui fait du bruit', icon: '🌬️' },
    { name: 'Bracelet', description: 'Bracelet de montre endommagé ou qui ne se fixe plus correctement', icon: '⌚' },
    { name: 'Capteur', description: 'Capteur qui ne fonctionne plus correctement', icon: '📡' },
    { name: 'Haut-parleur (Driver)', description: 'Haut-parleur des écouteurs ou casque qui ne produit plus de son', icon: '🔉' },
    { name: 'Câble', description: 'Câble endommagé ou qui ne transmet plus le signal correctement', icon: '🔌' },
    { name: 'Connecteur jack', description: 'Connecteur jack endommagé ou qui ne fonctionne plus', icon: '🎵' },
    { name: 'Autre', description: 'Autre problème non listé ci-dessus', icon: '❓' },
  ];

  const servicesAssistance = [
    { name: 'Transfert de données', description: 'Transfert de vos données vers un nouvel appareil', icon: '📤' },
    { name: 'Restauration ou effacement des données', description: "Restauration de vos données depuis une sauvegarde ou effacement complet de l'appareil", icon: '🔄' },
    { name: 'Contrôle parental', description: "Configuration et gestion du contrôle parental sur l'appareil", icon: '👪' },
    { name: 'Paramétrage de la eSim', description: "Installation et configuration d'une carte SIM virtuelle", icon: '📶' },
    { name: 'Sauvegarde de données', description: 'Sauvegarde complète de vos données sur un support externe ou dans le cloud', icon: '☁️' },
    { name: "Paramétrage de l'appareil", description: 'Configuration complète de votre nouvel appareil selon vos préférences', icon: '⚙️' },
    { name: 'Accompagnement mise à jour', description: "Assistance pour mettre à jour le système d'exploitation de votre appareil", icon: '🔁' },
    { name: 'Nettoyage console', description: 'Nettoyage approfondi de votre console de jeu', icon: '🧹' },
    { name: 'Diagnostic matériel', description: 'Diagnostic complet des composants matériels de votre ordinateur', icon: '🔍' },
    { name: 'Optimisation système', description: 'Optimisation des performances et de la vitesse de votre ordinateur', icon: '⚡' },
    { name: 'Installation pilotes', description: 'Installation et mise à jour des pilotes de périphériques', icon: '💾' },
    { name: 'Autres', description: "Autre service d'assistance personnalisé selon vos besoins", icon: '🛠️' },
  ];

  const toggleIssue = (name: string) => {
    setSelectedIssues(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const frDayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const frMonthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const upcomingDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const nextStep = () => {
    if (step === 1 && selectedDevice) setStep(2);
    else if (step === 2 && selectedBrand) setStep(3);
    else if (step === 3 && selectedModel) setStep(4);
    else if (step === 4 && selectedIssues.length > 0) setStep(5);
    else if (step === 5) setStep(6);
    else if (step === 6 && selectedDate && selectedTime) setStep(7);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    
    // Get admin email from localStorage if set
    const adminEmail = localStorage.getItem('admin_email') || undefined;
    
    const payload = {
      device: selectedDevice,
      brand: selectedBrand,
      model: selectedModel,
      issues: selectedIssues,
      issueDescription,
      imei,
      hasPart,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
      adminEmail, // Include admin email for notifications
    };
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/v1/devis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur serveur');
      // Also save to localStorage for admin dashboard fallback
      try {
        const stored = JSON.parse(localStorage.getItem('devis') || '[]');
        stored.push({ id: data.devisId, createdAt: new Date().toISOString(), status: 'pending', ...payload });
        localStorage.setItem('devis', JSON.stringify(stored));
      } catch {}
    } catch (err: any) {
      // Still proceed to confirmation; notifications may have partially sent
      console.warn('[Devis] API error:', err.message);
      try {
        const stored = JSON.parse(localStorage.getItem('devis') || '[]');
        stored.push({ id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending', ...payload });
        localStorage.setItem('devis', JSON.stringify(stored));
      } catch {}
    } finally {
      setSubmitting(false);
      setStep(8);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Réparations rapides, transparentes et fiables
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge variant="secondary" className="bg-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Service 100% gratuit
            </Badge>
            <Badge variant="secondary" className="bg-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Aucune carte de crédit requise
            </Badge>
            <Badge variant="secondary" className="bg-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sans création de compte
            </Badge>
            <Badge variant="secondary" className="bg-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Réparateurs certifiés
            </Badge>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`h-2 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Appareil</p>
            </div>
            <div className="flex-1 ml-2">
              <div className={`h-2 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Marque</p>
            </div>
            <div className="flex-1 ml-2">
              <div className={`h-2 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Modèle</p>
            </div>
            <div className="flex-1 ml-2">
              <div className={`h-2 rounded-full ${step >= 4 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Panne</p>
            </div>
            <div className="flex-1 ml-2">
              <div className={`h-2 rounded-full ${step >= 5 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Détails</p>
            </div>
            <div className="flex-1 ml-2">
              <div className={`h-2 rounded-full ${step >= 6 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Rendez-vous</p>
            </div>
            <div className="flex-1 ml-2">
              <div className={`h-2 rounded-full ${step >= 7 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <p className="text-xs mt-2 text-center font-semibold">Coordonnées</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Device Type */}
          {step === 1 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Quel appareil souhaitez-vous réparer ?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {deviceTypes.map((device) => (
                    <button
                      key={device.value}
                      onClick={() => setSelectedDevice(device.value)}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        selectedDevice === device.value
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <device.icon className="h-12 w-12 mx-auto mb-3 text-indigo-600" />
                      <p className="font-semibold text-gray-900">{device.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Brand */}
          {step === 2 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Quelle est la marque de votre appareil ?
                </h2>
                
                {!showBrandSearch ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {brands.map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => { setSelectedBrand(brand.name); setStep(3); }}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          selectedBrand === brand.name
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="text-4xl mb-2">{brand.logo}</div>
                        <p className="font-semibold text-gray-900">{brand.name}</p>
                      </button>
                    ))}
                    <button
                      onClick={() => setShowBrandSearch(true)}
                      className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-all"
                    >
                      <div className="text-4xl mb-2">🔍</div>
                      <p className="font-semibold text-gray-900">Autre</p>
                    </button>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Rechercher une marque..."
                        value={brandSearchQuery}
                        onChange={(e) => setBrandSearchQuery(e.target.value)}
                        className="text-lg p-6 pr-12"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setShowBrandSearch(false);
                          setBrandSearchQuery('');
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    {brandSearchQuery && (
                      <div className="mt-4 max-h-64 overflow-y-auto border rounded-lg bg-white shadow-lg">
                        {filteredBrands.length > 0 ? (
                          filteredBrands.map((brand) => (
                            <button
                              key={brand}
                              onClick={() => {
                                setSelectedBrand(brand);
                                setShowBrandSearch(false);
                                setBrandSearchQuery('');
                                setStep(3);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors border-b last:border-b-0"
                            >
                              <p className="font-semibold text-gray-900">{brand}</p>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500">
                            Aucune marque trouvée
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Model */}
          {step === 3 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Quel est le modèle exact ?
                </h2>
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Ex: iPhone 15 Pro, Galaxy S24, etc."
                      value={modelSearchQuery || selectedModel}
                      onChange={(e) => {
                        setModelSearchQuery(e.target.value);
                        setSelectedModel(e.target.value);
                        setShowModelSuggestions(true);
                      }}
                      onFocus={() => setShowModelSuggestions(true)}
                      className="text-lg p-6"
                    />
                    {showModelSuggestions && modelSearchQuery && filteredModels.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 max-h-64 overflow-y-auto border rounded-lg bg-white shadow-lg">
                        {filteredModels.map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setModelSearchQuery(model);
                              setShowModelSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors border-b last:border-b-0"
                          >
                            <p className="font-semibold text-gray-900">{model}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Entrez le modèle exact de votre appareil pour un devis précis
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Issue */}
          {step === 4 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Quel le problème de votre appareil ?
                </h2>
                <p className="text-center text-gray-500 mb-6">Sélectionner les dysfonctionnements</p>

                {/* Dysfonctionnements */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Types de dysfonctionnements</h3>
                  <p className="text-sm text-gray-500 mb-4">Problèmes matériels ou logiciels de votre appareil</p>
                  <div className="space-y-2">
                    {(showAllDysfonctionnements ? dysfonctionnements : dysfonctionnements.slice(0, 8)).map((issue) => (
                      <button
                        key={issue.name}
                        onClick={() => toggleIssue(issue.name)}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                          selectedIssues.includes(issue.name)
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300 bg-white'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{issue.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{issue.name}</p>
                          <p className="text-sm text-gray-500">{issue.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center ${
                          selectedIssues.includes(issue.name) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                        }`}>
                          {selectedIssues.includes(issue.name) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllDysfonctionnements(!showAllDysfonctionnements)}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    {showAllDysfonctionnements ? '↑ Voir moins' : `↓ Voir plus (${dysfonctionnements.length - 8} de plus)`}
                  </button>
                </div>

                {/* Services d'assistance */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{"Services d'assistance"}</h3>
                  <p className="text-sm text-gray-500 mb-4">Aide à la configuration, au paramétrage ou à la maintenance</p>
                  <div className="space-y-2">
                    {(showAllServices ? servicesAssistance : servicesAssistance.slice(0, 5)).map((service) => (
                      <button
                        key={service.name}
                        onClick={() => toggleIssue(service.name)}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                          selectedIssues.includes(service.name)
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300 bg-white'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{service.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center ${
                          selectedIssues.includes(service.name) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                        }`}>
                          {selectedIssues.includes(service.name) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    {showAllServices ? '↑ Voir moins' : `↓ Voir plus (${servicesAssistance.length - 5} de plus)`}
                  </button>
                </div>

                {selectedIssues.length > 0 && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-sm font-semibold text-indigo-700 mb-2">Sélectionné ({selectedIssues.length}) :</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedIssues.map(issue => (
                        <span key={issue} className="inline-flex items-center gap-1 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                          {issue}
                          <button onClick={(e) => { e.stopPropagation(); toggleIssue(issue); }} className="hover:text-indigo-200 ml-1">✕</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 5: Issue Details */}
          {step === 5 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Détails de la panne
                </h2>
                <p className="text-center text-gray-500 mb-8">
                  Apportez des précisions sur le problème si besoin, indiquez éventuellement le numéro IMEI de votre appareil
                </p>

                <div className="max-w-xl mx-auto space-y-6">
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description du problème
                    </label>
                    <textarea
                      placeholder="Décrivez le problème (optionnel)"
                      value={issueDescription}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) setIssueDescription(e.target.value);
                      }}
                      rows={5}
                      className="w-full rounded-lg border border-gray-300 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <p className="text-right text-xs text-gray-400 mt-1">{issueDescription.length} / 500</p>
                  </div>

                  {/* IMEI */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Numéro IMEI <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: 356938035643809"
                      value={imei}
                      onChange={(e) => setImei(e.target.value)}
                      className="p-4"
                      maxLength={20}
                    />
                    <p className="text-xs text-gray-400 mt-1">Composez *#06# pour afficher votre IMEI</p>
                  </div>

                  {/* Has Part checkbox — shown only when screen-related issue selected */}
                  <div
                    className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
                    onClick={() => setHasPart(!hasPart)}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${hasPart ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                      {hasPart && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {"J'ai déjà la pièce pour "}
                        {selectedIssues.length > 0 ? selectedIssues[0].toLowerCase() : "la réparation"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Cochez si vous possédez déjà la pièce de rechange pour{' '}
                        {selectedIssues.length > 0 ? selectedIssues[0].toLowerCase() : "cette réparation"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 6: Date & Time */}
          {step === 6 && (
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Choisissez votre créneau</h2>
                  <p className="text-gray-500 mt-1">Sélectionnez un jour et une heure qui vous conviennent</p>
                </div>

                {/* Day picker */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <span className="font-semibold text-gray-700">Choisir un jour</span>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-3">
                    {upcomingDays.map((day, i) => {
                      const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={dateStr}
                          onClick={() => { setSelectedDate(dateStr); setSelectedTime(''); }}
                          className={`flex-shrink-0 flex flex-col items-center justify-center w-[62px] h-[78px] rounded-2xl border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg scale-105'
                              : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-gray-700'
                          }`}
                        >
                          <span className={`text-[11px] font-medium mb-0.5 ${
                            isSelected ? 'text-indigo-200' : 'text-gray-400'
                          }`}>
                            {i === 0 ? 'Auj.' : frDayNames[day.getDay()]}
                          </span>
                          <span className="text-xl font-bold leading-none">{day.getDate()}</span>
                          <span className={`text-[11px] mt-0.5 ${
                            isSelected ? 'text-indigo-200' : 'text-gray-400'
                          }`}>
                            {frMonthNames[day.getMonth()]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots — revealed after a day is chosen */}
                {selectedDate && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-gray-700">Choisir une heure</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                            selectedTime === time
                              ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                              : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirmation summary */}
                {selectedDate && selectedTime && (() => {
                  const d = new Date(selectedDate + 'T00:00:00');
                  return (
                    <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0" />
                      <p className="text-sm font-semibold text-indigo-700">
                        Créneau sélectionné&nbsp;: {frDayNames[d.getDay()]} {d.getDate()} {frMonthNames[d.getMonth()]} à {selectedTime}
                      </p>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Step 7: Customer Info */}
          {step === 7 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Vos coordonnées
                </h2>
                <div className="max-w-md mx-auto space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                      <Input
                        type="text"
                        placeholder="Jean"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                        className="p-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                      <Input
                        type="text"
                        placeholder="Dupont"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                        className="p-4"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="jean.dupont@email.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="p-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <PhoneIcon className="inline h-4 w-4 mr-2" />
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="p-4"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 8: Confirmation */}
          {step === 8 && (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Rendez-vous confirmé !
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Votre demande de devis a été enregistrée. Vous recevrez une confirmation par email et SMS.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Récapitulatif</h3>
                  <div className="space-y-2 text-left">
                    <p><strong>Appareil:</strong> {selectedBrand} {selectedModel}</p>
                    <p><strong>Problème(s):</strong> {selectedIssues.join(', ')}</p>
                    <p><strong>Date:</strong> {selectedDate} à {selectedTime}</p>
                    <p><strong>Client:</strong> {customerInfo.firstName} {customerInfo.lastName}</p>
                  </div>
                </div>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href="/">
                    Retour à l'accueil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          {step < 8 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={prevStep}
                disabled={step === 1}
                className="px-8"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour
              </Button>
              {step === 7 ? (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={submitting || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone}
                  className="bg-indigo-600 hover:bg-indigo-700 px-8"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Confirmer le rendez-vous
                      <CheckCircle2 className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !selectedDevice) ||
                    (step === 2 && !selectedBrand) ||
                    (step === 3 && !selectedModel) ||
                    (step === 4 && selectedIssues.length === 0) ||
                    (step === 6 && (!selectedDate || !selectedTime))
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 px-8"
                >
                  Continuer
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
