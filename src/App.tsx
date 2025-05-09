import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [scrollY, setScrollY] = useState(0);
  
  const toggleModal = () => {
    setShowModal(!showModal);
    // Prevent scrolling when modal is open
    if (!showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Handle scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer functionality
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('August 17, 2025 18:00:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Event has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation
    
    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const countdownVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.02, 1],
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse" as const, 
        duration: 1.5 
      }
    }
  };

  return (
    <div className="font-sans bg-black">
      {/* Navigation */}
      <motion.nav 
        className="bg-black/80 backdrop-blur-md text-white p-4 fixed w-full z-10 border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            GRANDE FIESTA
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['accueil', 'evenement', 'artistes', 'billets', 'contact'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                className="hover:text-pink-400 transition relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-300 to-pink-500 w-0 group-hover:w-full"
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </motion.a>
            ))}
          </div>
          
          <motion.button 
            className="md:hidden text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ☰
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="accueil" 
        className="relative pt-24 bg-black text-white min-h-screen flex items-center overflow-hidden"
      >
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?senegal,festival,night')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-0"></div>
        </div>
        
        <div className="container mx-auto text-center z-10 px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-amber-300 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  GRANDE FIESTA
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Une expérience inoubliable au cœur du Sénégal
              </p>
            </motion.div>
            
            {/* Countdown Timer */}
            <motion.div 
              variants={fadeInUp}
              className="mb-10"
            >
              <p className="text-xl mb-6">Rendez-vous le 17 Août 2025</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "Jours", value: timeLeft.days },
                  { label: "Heures", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Secondes", value: timeLeft.seconds }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={countdownVariants}
                    initial="initial"
                    animate="animate"
                    className="bg-black/40 backdrop-blur-md p-6 rounded-2xl w-20 md:w-28 border border-white/10 shadow-lg shadow-pink-500/20"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={item.value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="text-3xl md:text-5xl font-bold mb-1"
                      >
                        {String(item.value).padStart(2, '0')}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-sm text-pink-200">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row justify-center gap-4 md:gap-6"
            >
              <motion.button 
                onClick={toggleModal} 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Réserver Maintenant
              </motion.button>
              <motion.a 
                href="#evenement" 
                className="bg-transparent border-2 border-white/30 hover:border-pink-500 text-white font-bold py-4 px-8 rounded-full text-lg transition"
                whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                En Savoir Plus
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section id="evenement" className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  L'Événement
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Une célébration culturelle et musicale unique qui réunit les plus grands talents du Sénégal 
                et d'ailleurs pour une nuit inoubliable à Saint Louis.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "⏱️",
                    title: "Date & Heure",
                    details: ["17 Août 2025", "18h00 - 04h00"]
                  },
                  {
                    icon: "📍",
                    title: "Lieu",
                    details: ["Place Faidherbe", "Saint Louis, Sénégal"]
                  },
                  {
                    icon: "🎭",
                    title: "Programme",
                    details: ["Musique Live", "Danse & Spectacles"]
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gradient-to-br from-black to-purple-900/30 p-8 rounded-2xl border border-pink-500/10 backdrop-blur-sm"
                    whileHover={{ y: -10, boxShadow: "0 10px 30px -15px rgba(236, 72, 153, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-5xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-lg text-gray-300">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artistes" className="py-24 bg-gradient-to-b from-black to-purple-900/40 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  Artistes
                </span>
              </h2>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid md:grid-cols-4 gap-6"
            >
              {[1, 2, 3, 4].map((item) => (
                <motion.div 
                  key={item} 
                  className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden group border border-white/5"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-80 relative overflow-hidden">
                    <motion.img 
                      src={`https://source.unsplash.com/random/400x600/?artist,performer,${item}`} 
                      alt="Artiste" 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <motion.div 
                    className="p-6"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * item }}
                  >
                    <h3 className="text-2xl font-bold mb-1">Artiste {item}</h3>
                    <p className="text-pink-300">Performance spéciale</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="billets" className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  Billets
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Standard",
                  price: "15 000 FCFA",
                  features: [
                    { text: "Entrée générale", included: true },
                    { text: "Accès à tous les spectacles", included: true },
                    { text: "Zone VIP", included: false },
                    { text: "Boissons incluses", included: false }
                  ],
                  popular: false
                },
                {
                  title: "Premium",
                  price: "25 000 FCFA",
                  features: [
                    { text: "Entrée prioritaire", included: true },
                    { text: "Accès à tous les spectacles", included: true },
                    { text: "Accès zone VIP", included: true },
                    { text: "Boissons incluses", included: false }
                  ],
                  popular: true
                },
                {
                  title: "VIP",
                  price: "50 000 FCFA",
                  features: [
                    { text: "Entrée prioritaire", included: true },
                    { text: "Accès à tous les spectacles", included: true },
                    { text: "Accès zone VIP", included: true },
                    { text: "Boissons incluses", included: true }
                  ],
                  popular: false
                }
              ].map((ticket, index) => (
                <motion.div 
                  key={index}
                  className={`${
                    ticket.popular 
                      ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-pink-500/30"
                      : "bg-black/40 border-white/10"
                  } p-8 rounded-2xl text-center backdrop-blur-sm border relative`}
                  variants={pulseVariants}
                  initial="initial"
                  animate={ticket.popular ? "animate" : "initial"}
                  whileHover={{ y: -10, boxShadow: ticket.popular ? "0 10px 30px -10px rgba(236, 72, 153, 0.5)" : "0 10px 30px -10px rgba(255, 255, 255, 0.1)" }}
                >
                  {ticket.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-1 px-4 rounded-full text-sm">
                        POPULAIRE
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{ticket.title}</h3>
                  <div className="text-4xl font-bold my-6 bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                    {ticket.price}
                  </div>
                  <ul className="mb-8 text-left space-y-3">
                    {ticket.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className={`mr-2 text-xl ${feature.included ? "text-green-400" : "text-red-400"}`}>
                          {feature.included ? "✓" : "✕"}
                        </span>
                        <span className={feature.included ? "text-white" : "text-gray-400"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <motion.button 
                    onClick={toggleModal}
                    className={`w-full ${
                      ticket.popular 
                        ? "bg-gradient-to-r from-pink-500 to-purple-600" 
                        : "bg-white/10 hover:bg-white/20"
                    } text-white font-bold py-3 px-6 rounded-full`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Réserver
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Alimentaires */}
      <section className="py-24 bg-gradient-to-b from-black to-purple-900/40 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  Sponsors Alimentaires
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
                Découvrez les saveurs authentiques du Sénégal avec nos partenaires culinaires qui vous feront vivre une expérience gastronomique inoubliable.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Poulet Boukanée du Sénégal",
                  description: "Savourez l'authentique poulet boukanée sénégalais, mariné dans des épices traditionnelles et grillé à la perfection.",
                  icon: "🍗",
                  speciality: "Spécialité: Poulet mariné aux épices locales"
                },
                {
                  name: "Street Chicken",
                  description: "Une fusion moderne de saveurs de rue, proposant des recettes de poulet innovantes inspirées par la cuisine sénégalaise contemporaine.",
                  icon: "🍖",
                  speciality: "Spécialité: Wraps de poulet épicé"
                },
                {
                  name: "Saveurs du Terroir",
                  description: "Des plats traditionnels sénégalais préparés avec des ingrédients locaux et biologiques pour une expérience culinaire authentique.",
                  icon: "🥘",
                  speciality: "Spécialité: Thieboudienne et Mafé"
                }
              ].map((sponsor, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-black to-purple-900/20 p-8 rounded-2xl border border-pink-500/10 backdrop-blur-sm"
                  whileHover={{ y: -10, boxShadow: "0 10px 30px -15px rgba(236, 72, 153, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl mb-6">{sponsor.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                    {sponsor.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{sponsor.description}</p>
                  <p className="text-pink-300 font-medium">{sponsor.speciality}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expérience Culinaire (Remplace la Galerie) */}
      <section className="py-24 bg-gradient-to-b from-purple-900/40 to-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  Expérience Culinaire
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
                GRANDE FIESTA n'est pas seulement une fête pour les oreilles, mais aussi pour les papilles. Découvrez les délices qui vous attendent.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeInUp}
                className="space-y-8"
              >
                <motion.div 
                  className="bg-gradient-to-br from-black to-purple-900/20 p-6 rounded-xl border border-pink-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold mb-2 text-pink-300">Cuisine Locale</h3>
                  <p className="text-gray-300">
                    Des plats traditionnels sénégalais préparés par des chefs locaux, mettant en valeur les saveurs authentiques de la région.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-black to-purple-900/20 p-6 rounded-xl border border-pink-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold mb-2 text-pink-300">Fusion Moderne</h3>
                  <p className="text-gray-300">
                    Des créations culinaires innovantes qui mélangent les techniques modernes avec les ingrédients traditionnels sénégalais.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-black to-purple-900/20 p-6 rounded-xl border border-pink-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold mb-2 text-pink-300">Boissons Artisanales</h3>
                  <p className="text-gray-300">
                    Des cocktails et boissons inspirés par les fruits et épices locaux, créés spécialement pour l'événement.
                  </p>
                </motion.div>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                className="relative h-[500px] rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-pink-900/60 mix-blend-multiply z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://source.unsplash.com/random/800x1000/?senegal,food,african')",
                    backgroundPosition: "center"
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-center p-8">
                    <div className="text-7xl mb-4">🍽️</div>
                    <h3 className="text-3xl font-bold mb-2 text-white">Saveurs du Sénégal</h3>
                    <p className="text-xl text-white/80">Une expérience gastronomique unique</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  Questions Fréquentes
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Comment puis-je acheter des billets ?",
                  answer: "Vous pouvez réserver vos billets directement sur ce site en cliquant sur le bouton \"Réserver\" ou aux points de vente officiels à Saint Louis."
                },
                {
                  question: "Y a-t-il une limite d'âge ?",
                  answer: "L'événement est ouvert à tous, mais les mineurs doivent être accompagnés d'un adulte."
                },
                {
                  question: "Puis-je obtenir un remboursement ?",
                  answer: "Les billets ne sont pas remboursables, mais ils peuvent être transférés à une autre personne."
                },
                {
                  question: "Que comprend le billet VIP ?",
                  answer: "Le billet VIP comprend un accès prioritaire, une zone réservée avec vue privilégiée sur la scène, et des boissons incluses."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-r from-black to-purple-900/20 p-6 rounded-xl border border-pink-500/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(236, 72, 153, 0.2)" }}
                >
                  <h3 className="text-xl font-bold mb-2 text-pink-300">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact/Footer */}
      <footer id="contact" className="py-24 bg-gradient-to-b from-black to-purple-950 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                  Contact
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Rejoignez-nous pour une nuit inoubliable de musique, de danse et de célébration
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="grid md:grid-cols-3 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">
                    GRANDE FIESTA
                  </h3>
                  <p className="mb-6 text-gray-300">
                    La plus grande fête de l'année à Saint Louis, Sénégal. Une expérience inoubliable avec musique, danse et célébration.
                  </p>
                  <div className="flex space-x-4">
                    {['instagram', 'twitter', 'facebook', 'youtube'].map((social) => (
                      <motion.a 
                        key={social}
                        href="#" 
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl hover:bg-pink-500 transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social === 'instagram' && '📸'}
                        {social === 'twitter' && '🐦'}
                        {social === 'facebook' && '📘'}
                        {social === 'youtube' && '📹'}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-6 text-pink-300">Contact</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <span className="mr-3 text-pink-400">📧</span>
                      <span>info@radofest.com</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-pink-400">📞</span>
                      <span>+221 XX XXX XXXX</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-pink-400">📍</span>
                      <span>Saint Louis, Sénégal</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-6 text-pink-300">Newsletter</h3>
                  <p className="mb-4 text-gray-300">
                    Inscrivez-vous pour recevoir les dernières nouvelles et mises à jour.
                  </p>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Votre email" 
                      className="p-3 rounded-l-lg w-full bg-white/10 border border-white/20 focus:outline-none focus:border-pink-500 text-white"
                    />
                    <motion.button 
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-r-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      OK
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="border-t border-white/10 pt-8 text-center"
            >
              <p className="text-gray-400">
                &copy; 2024 GRANDE FIESTA. Tous droits réservés.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-purple-900/80 to-black/80 p-8 rounded-2xl max-w-md w-full relative border border-pink-500/20 backdrop-blur-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <motion.button 
                onClick={toggleModal}
                className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                ✕
              </motion.button>
              
              <motion.h2 
                className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Réservation de Billets
              </motion.h2>
              
              <motion.form className="space-y-5">
                {[
                  { label: "Nom complet", type: "text" },
                  { label: "Email", type: "email" },
                  { label: "Téléphone", type: "tel" }
                ].map((field, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                  >
                    <label className="block text-pink-200 mb-2 text-sm">{field.label}</label>
                    <input 
                      type={field.type} 
                      className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/20 text-white focus:outline-none focus:border-pink-500"
                    />
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-pink-200 mb-2 text-sm">Type de billet</label>
                  <select className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/20 text-white focus:outline-none focus:border-pink-500">
                    <option>Standard - 15 000 FCFA</option>
                    <option>Premium - 25 000 FCFA</option>
                    <option>VIP - 50 000 FCFA</option>
                  </select>
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-pink-200 mb-2 text-sm">Nombre de billets</label>
                  <input 
                    type="number" 
                    min="1" 
                    defaultValue="1" 
                    className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/20 text-white focus:outline-none focus:border-pink-500"
                  />
                </motion.div>
                
                <motion.button 
                  type="button" 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-full mt-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Confirmer la Réservation
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;