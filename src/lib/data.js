export const hotels = [
    {
        name: 'The Gateway Hotel Nashik',
        location: 'Ambad, Nashik',
        price: 5999,
        rating: 4.5,
        images: ['/images/hotel-1.jpg', '/images/the-gatway-hotel-nashik-2.webp', '/images/the-gatway-hotel-nashik-3.webp'],
        features: ['Free WiFi', 'Free Parking', 'Restaurant', 'Pool'],
        type: 'Luxury',
    },
    {
        name: 'Heritage Inn Nashik',
        location: 'Panchavati, Nashik',
        price: 3499,
        rating: 4.2,
        images: ['/images/hotel-2.jpg', '/images/heritage-inn-nashik-2.avif'],
        features: ['Free WiFi', 'Breakfast', 'AC Rooms', 'Valet'],
        type: 'Heritage',
    },
    {
        name: 'Kumbh Residency',
        location: 'Nashik Road, Nashik',
        price: 2299,
        rating: 4.0,
        images: ['/images/hotel-3.jpg', '/images/kumbh-residency-2.avif', '/images/kumbh-residency-3.avif'],
        features: ['Free WiFi', 'Breakfast', 'Ghat View', 'Travel Desk'],
        type: 'Budget',
    },
    {
        name: 'The Gateway Hotel Nashik',
        location: 'Ambad, Nashik',
        price: 5999,
        rating: 4.5,
        images: ['/images/hotel-1.jpg', '/images/the-gatway-hotel-nashik-2.webp', '/images/the-gatway-hotel-nashik-3.webp'],
        features: ['Free WiFi', 'Free Parking', 'Restaurant', 'Pool'],
        type: 'Luxury',
    },
    {
        name: 'Heritage Inn Nashik',
        location: 'Panchavati, Nashik',
        price: 3499,
        rating: 4.2,
        images: ['/images/hotel-2.jpg', '/images/heritage-inn-nashik-2.avif'],
        features: ['Free WiFi', 'Breakfast', 'AC Rooms', 'Valet'],
        type: 'Heritage',
    },
];

export const tourPackages = [
    {
        id: 1,
        name: "Essential Darshan",
        image: "/images/essential.png",
        duration: "3 Days / 2 Nights",
        price: 12999,
        priceUnit: "per person",
        mainDesc: "A curated immersion into Nashik’s spiritual heritage, featuring private ceremonies and sunset meditations.",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Arrival & Purification at Ramkund",
                journey_desc: "Welcome to the spiritual heart of Maharashtra. Upon arrival, check into your heritage suite. As the sun dips below the horizon, witness the mesmerizing Ganga Aarti at Ramkund, where thousands of diyas light up the Godavari. Welcome to the spiritual heart of Maharashtra. Upon arrival, check into your heritage suite. As the sun dips below the horizon, witness the mesmerizing Ganga Aarti at Ramkund, where thousands of diyas light up the Godavari.",
                journey_src: "/images/tour-demo-1.png"
            },
            {
                journey_title: "Trimbakeshwar: The Source of Life",
                journey_desc: "A pre-dawn luxury transfer takes you to the foothills of Brahmagiri. Experience a private 'Rudrabhishek' ceremony at the ancient Trimbakeshwar Temple, one of the twelve Jyotirlingas, before exploring the origin of the Godavari.",
                journey_src: "/images/tour-demo-2.png"
            },
            {
                journey_title: "Vineyards & Verses",
                journey_desc: "Nashik is also the wine capital of India. Spend your afternoon at a premier boutique vineyard for a private tasting and organic farm-to-table lunch, blending the sacred with the earthly delights of the region.",
                journey_src: "/images/tour-demo-3.png"
            }
        ],
        features: [
            "Accommodation",
            "Shahi Snan Access",
            "Temple Visits",
            "Local Transport"
        ],
        tourRoute: ["Nashik", "Trimbakeshwar", "Ramkund", "Saptashrungi Temple"],
        cancellationPolicy: [
            { days: "61-120", percent: 10 },
            { days: "31-60", percent: 25 },
            { days: "15-30", percent: 50 },
            { days: "0-14", percent: 100 },
        ],
        isPopular: false,
        departureDate: "19 Oct 2026",
        type: "Essential"
    },
    {
        id: 2,
        name: "Premium Pilgrimage",
        image: "/images/premium.png",
        duration: "5 Days / 4 Nights",
        price: 24999,
        priceUnit: "per person",
        mainDesc: "A curated immersion into Nashik’s spiritual heritage, featuring private ceremonies and sunset meditations.",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Spiritual Experience Day 1",
                journey_desc: "Detailed spiritual journey description with rituals, guided tours, and premium experiences.",
                journey_src: ""
            },
            {
                journey_title: "Spiritual Experience Day 2",
                journey_desc: "Detailed spiritual journey description with rituals, guided tours, and premium experiences.",
                journey_src: ""
            },
            {
                journey_title: "Spiritual Experience Day 3",
                journey_desc: "Detailed spiritual journey description with rituals, guided tours, and premium experiences.",
                journey_src: ""
            }
        ],
        features: [
            "Deluxe Hotel Stay",
            "All Meals Included",
            "Guided Tours",
            "VIP Darshan Pass"
        ],
        tourRoute: ["Nashik", "Trimbakeshwar", "Ramkund", "Saptashrungi Temple"],
        cancellationPolicy: [
            { days: "91-180", percent: 10, color: "green" },
            { days: "46-90", percent: 20, color: "green" },
            { days: "16-45", percent: 40, color: "orange" },
            { days: "0-15", percent: 100, color: "red" },
        ],
        isPopular: true, // For the "Most Popular" badge
        departureDate: "20 Oct 2026",
        type: "Premium"
    },
    {
        id: 3,
        name: "Luxury Spiritual",
        image: "/images/luxury.png",
        duration: "7 Days / 6 Nights",
        price: 49999,
        priceUnit: "per person",
        mainDesc: "A curated immersion into Nashik’s spiritual heritage, featuring private ceremonies and sunset meditations.",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Spiritual Experience Day 1",
                journey_desc: "Detailed spiritual journey description with rituals, guided tours, and premium experiences.",
                journey_src: ""
            },
            {
                journey_title: "Spiritual Experience Day 2",
                journey_desc: "Detailed spiritual journey description with rituals, guided tours, and premium experiences.",
                journey_src: ""
            },
            {
                journey_title: "Spiritual Experience Day 3",
                journey_desc: "Detailed spiritual journey description with rituals, guided tours, and premium experiences.",
                journey_src: ""
            }
        ],
        features: [
            "5-Star Accommodation",
            "Private Car & Driver",
            "Personal Guide",
            "Airport Transfers"
        ],
        tourRoute: ["Nashik", "Trimbakeshwar", "Ramkund", "Saptashrungi Temple"],
        cancellationPolicy: [
            { days: "121-365", percent: 5, color: "green" },
            { days: "61-120", percent: 15, color: "green" },
            { days: "31-60", percent: 30, color: "orange" },
            { days: "0-30", percent: 100, color: "red" },
        ],
        isPopular: false,
        departureDate: "21 Oct 2026",
        type: "Luxury"
    },
    {
        id: 4,
        name: "Jyotirlinga Maharashtra Darshan",
        image: "/images/jyotirlinga-banner.jpg", // main banner
        duration: "6 Days / 5 Nights",
        price: 28999,
        priceUnit: "per person",
        mainDesc: "Embark on a divine journey to Maharashtra’s sacred Jyotirlinga shrines. Experience the spiritual energy of Trimbakeshwar, Grishneshwar, Bhimashankar, and seek blessings at Shirdi and Shani Shingnapur. A perfect blend of devotion, culture, and natural beauty.",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Trimbakeshwar – Origin of Godavari",
                journey_desc: "Begin your sacred journey at Trimbakeshwar Jyotirlinga, nestled in the Brahmagiri hills. Perform rituals and explore the origin of the holy Godavari river.",
                journey_src: ""
            },
            {
                journey_title: "Grishneshwar & Ellora Caves",
                journey_desc: "Visit Grishneshwar Jyotirlinga near Ellora caves. Witness ancient rock-cut architecture and divine spiritual vibrations.",
                journey_src: ""
            },
            {
                journey_title: "Bhimashankar – Forest Shrine",
                journey_desc: "Travel through scenic Sahyadri forests to Bhimashankar Jyotirlinga. Experience peaceful surroundings and sacred darshan.",
                journey_src: ""
            },
            {
                journey_title: "Shirdi – Sai Baba Darshan",
                journey_desc: "Seek blessings at the holy town of Shirdi. Visit Sai Baba Temple and experience spiritual peace and devotion.",
                journey_src: ""
            },
            {
                journey_title: "Shani Shingnapur – Divine Justice",
                journey_desc: "Visit the famous Shani temple village known for houses without doors and strong faith in Lord Shani.",
                journey_src: ""
            }
        ],
        features: [
            "Jyotirlinga Temple Visits",
            "Comfortable Stay",
            "Private Transport",
            "Spiritual Guide",
            "Daily Meals"
        ],
        tourRoute: ["Nashik", "Trimbakeshwar", "Grishneshwar", "Ellora Caves", "Bhimashankar"],
        cancellationPolicy: [
            { days: "45-90", percent: 15, color: "green" },
            { days: "15-44", percent: 50, color: "orange" },
            { days: "0-14", percent: 100, color: "red" },
        ],
        isPopular: true,
        departureDate: "17 Oct 2026",
        type: "Jyotirlinga"
    },
    {
        id: 5,
        name: "Nashik to Saptashrungi & Dindori Darshan",
        image: "/images/saptashrungi-tour-banner.jpg",
        duration: "1 Day Trip",
        price: 1999,
        priceUnit: "per person",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Departure from Nashik",
                journey_desc: "Start your spiritual journey early morning from Nashik with a comfortable drive towards the sacred hills of Vani.",
                journey_src: "/images/nashik-start.jpg"
            },
            {
                journey_title: "Saptashrungi Devi Darshan",
                journey_desc: "Visit the powerful Saptashrungi Mata temple located in the Sahyadri hills. Seek blessings of the goddess and enjoy scenic surroundings.",
                journey_src: "/images/saptashrungi.jpg"
            },
            {
                journey_title: "Swami Samarth Mandir Dindori",
                journey_desc: "Proceed to Dindori to visit the peaceful Swami Samarth temple. Experience divine calm and spiritual energy.",
                journey_src: "/images/dindori-swami-samarth.jpg"
            },
            {
                journey_title: "Return to Nashik",
                journey_desc: "After completing darshan, return comfortably to Nashik by evening with divine memories.",
                journey_src: "/images/return-nashik.jpg"
            }
        ],
        features: [
            "Same Day Return",
            "Temple Darshan",
            "Comfort Travel",
            "Scenic Route",
            "Spiritual Experience"
        ],
        tourRoute: ["Nashik", "Saptashrungi Devi", "Swami Samarth Mandir Dindori"],
        cancellationPolicy: [
            { days: "45-90", percent: 15, color: "green" },
            { days: "15-44", percent: 50, color: "orange" },
            { days: "0-14", percent: 100, color: "red" },
        ],
        isPopular: false,
        departureDate: "19 Oct 2026",
        type: "One Day Trip"
    },
    {
        id: 6,
        name: "Nashik to Shani Shingnapur & Shirdi Sai Darshan",
        image: "/images/shani-shignapur-tour-banner.jpg",
        duration: "1 Day Trip",
        price: 2499,
        priceUnit: "per person",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Early Departure from Nashik",
                journey_desc: "Begin your journey early morning from Nashik towards Shani Shingnapur with a comfortable drive.",
                journey_src: "/images/nashik-start.jpg"
            },
            {
                journey_title: "Shani Shingnapur Darshan",
                journey_desc: "Visit the famous Shani temple known for its unique open shrine and strong faith traditions.",
                journey_src: "/images/shani-shingnapur.jpg"
            },
            {
                journey_title: "Shirdi Sai Baba Temple",
                journey_desc: "Proceed to Shirdi for Sai Baba darshan. Experience devotion at one of India's most sacred pilgrimage sites.",
                journey_src: "/images/shirdi.jpg"
            },
            {
                journey_title: "Return to Nashik",
                journey_desc: "After completing darshan, return to Nashik by evening with peaceful and divine memories.",
                journey_src: "/images/return-nashik.jpg"
            }
        ],
        features: [
            "Same Day Return",
            "Shani & Sai Darshan",
            "Comfort Travel",
            "Spiritual Experience",
            "Well-Planned Route"
        ],
        tourRoute: ["Nashik", "Shani Shingnapur", "Shirdi Sai Baba Temple"],
        cancellationPolicy: [
            { days: "45-90", percent: 15, color: "green" },
            { days: "15-44", percent: 50, color: "orange" },
            { days: "0-14", percent: 100, color: "red" },
        ],
        isPopular: true,
        departureDate: "25 Oct 2026",
        type: "One Day Trip"
    },
    {
        id: 9,
        name: "Trimbakeshwar Jyotirling & Nashik Sightseeing",
        image: "/images/trimbakeshwar-tour-banner.jpg",
        duration: "1 Day Trip",
        price: 1799,
        priceUnit: "per person",
        inclusion: [
            {
                in_title: "Hotel",
                in_icon: "Building2"
            },
            {
                in_title: "Meals",
                in_icon: "Utensils"
            },
            {
                in_title: "Sightseeing",
                in_icon: "Camera"
            },
            {
                in_title: "Transport",
                in_icon: "CarTaxiFront"
            }
        ],
        journey: [
            {
                journey_title: "Departure from Nashik",
                journey_desc: "Start your journey from Nashik with a scenic drive towards Trimbakeshwar through lush green hills.",
                journey_src: "/images/nashik-start.jpg"
            },
            {
                journey_title: "Trimbakeshwar Jyotirling Darshan",
                journey_desc: "Visit the sacred Trimbakeshwar temple, one of the twelve Jyotirlingas and source of the Godavari river.",
                journey_src: "/images/trimbakeshwar.jpg"
            },
            {
                journey_title: "Nashik Local Sightseeing",
                journey_desc: "Explore Ramkund, Panchavati, Sita Gufa and Kalaram Temple, key spiritual and historical landmarks.",
                journey_src: "/images/panchavati.jpg"
            },
            {
                journey_title: "Return to Nashik",
                journey_desc: "Complete your trip and return comfortably with divine blessings and memorable experiences.",
                journey_src: "/images/return-nashik.jpg"
            }
        ],
        features: [
            "Jyotirlinga Darshan",
            "Local Sightseeing",
            "Same Day Return",
            "Comfort Travel",
            "Spiritual Experience"
        ],
        tourRoute: ["Nashik", "Trimbakeshwar", "Ramkund", "Sita Gufa", "Kalaram Temple"],
        cancellationPolicy: [
            { days: "45-90", percent: 15, color: "green" },
            { days: "15-44", percent: 50, color: "orange" },
            { days: "0-14", percent: 100, color: "red" },
        ],
        isPopular: true,
        departureDate: "28 Oct 2026",
        type: "One Day Trip"
    }
];

export const rentalCar = [
    {
        id: 1,
        name: "Sedan Car",
        image: "/images/rental-car-1.png",
        capacity: "4 Seater",
        features: ["AC", "Driver", "Fuel"],
        price: 1999,
        type: "Sedan"
    },
    {
        id: 2,
        name: "SUV / MUV",
        image: "/images/rental-car-2.png",
        capacity: "7 Seater",
        features: ["AC", "Driver", "Fuel", "Luggage"],
        price: 2999,
        type: "SUV"
    },
    {
        id: 3,
        name: "Tempo Traveller",
        image: "/images/rental-car-3.png",
        capacity: "12 Seater",
        features: ["AC", "Driver", "Fuel", "Group Travel"],
        price: 4999,
        type: "Traveller"
    },
    {
        id: 4,
        name: "Luxury Car",
        image: "/images/rental-car-1.png",
        capacity: "4 Seater",
        features: ["AC", "Driver", "Fuel"],
        price: 1999,
        type: "Luxury"
    },
    {
        id: 5,
        name: "SUV / MUV",
        image: "/images/rental-car-2.png",
        capacity: "7 Seater",
        features: ["AC", "Driver", "Fuel", "Luggage"],
        price: 2999,
        type: "SUV"
    },
    // {
    //     id: 6,
    //     name: "Tempo Traveller",
    //     image: "/images/rental-car-3.png",
    //     capacity: "12 Seater",
    //     features: ["AC", "Driver", "Fuel", "Group Travel"],
    //     price: 4999,
    //     type: "Traveller"
    // },
    // {
    //     id: 7,
    //     name: "Sedan Car",
    //     image: "/images/rental-car-1.png",
    //     capacity: "4 Seater",
    //     features: ["AC", "Driver", "Fuel"],
    //     price: 1999,
    //     type: "Sedan"
    // },
    // {
    //     id: 8,
    //     name: "SUV / MUV",
    //     image: "/images/rental-car-2.png",
    //     capacity: "7 Seater",
    //     features: ["AC", "Driver", "Fuel", "Luggage"],
    //     price: 2999,
    //     type: "SUV"
    // },
    // {
    //     id: 9,
    //     name: "Tempo Traveller",
    //     image: "/images/rental-car-3.png",
    //     capacity: "12 Seater",
    //     features: ["AC", "Driver", "Fuel", "Group Travel"],
    //     price: 4999,
    //     type: "Traveller"
    // },
];

export const sacredDestinations = [
  {
    name: "Trimbakeshwar Temple",
    history: "Trimbakeshwar Temple is one of the twelve sacred Jyotirlingas of Lord Shiva and is among the most important pilgrimage sites in India. Situated at the foothills of Brahmagiri Hills, the temple is closely associated with the origin of the holy Godavari River. According to Hindu scriptures, Sage Gautama performed severe penance here, after which Lord Shiva brought the sacred Ganga to earth in the form of the Godavari. The present structure was rebuilt in the 18th century by Peshwa Balaji Baji Rao and is admired for its black stone architecture and intricate carvings. Unlike most Jyotirlingas, the sanctum houses three lingas symbolizing Brahma, Vishnu, and Mahesh. Devotees visit throughout the year for darshan, Rudrabhishek rituals, and spiritual ceremonies. The temple gains special significance during Kumbh Mela when millions of pilgrims gather in Nashik and Trimbakeshwar. Its religious importance, mythological connections, and serene surroundings make it one of Maharashtra's most revered spiritual destinations.",
    routeFromNashik: 'Trimbakeshwar is approximately 28 km west of Nashik via Nashik–Trimbak Road. The journey takes around 45–60 minutes by road.',
    travelOptions: "Private taxi, rental car, state transport bus, shared jeep, tour package, self-drive vehicle.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Visitors can easily reach by local Public transport or taxis",
    image: "/images/sacred-destination-1.jpg"
  },

  {
    name: "Ramkund",
    history: "Ramkund is one of the holiest locations in Nashik and holds immense importance in Hindu tradition. Situated on the banks of the Godavari River, it is believed to be the sacred bathing place of Lord Rama during his exile. According to legends, Lord Rama performed rituals and offered prayers here while residing in Panchavati with Sita and Lakshmana. The kund is considered highly auspicious for performing ancestral rites and immersion ceremonies. Pilgrims believe that taking a holy dip in Ramkund helps purify the soul and wash away sins. The site has been an important religious center for centuries and plays a central role during Kumbh Mela celebrations. Numerous temples and ghats surrounding Ramkund contribute to its spiritual atmosphere. Saints, devotees, and travelers from across India visit throughout the year to seek blessings and experience the sacred environment. Ramkund remains one of the most recognized symbols of Nashik's religious and cultural heritage.",
    routeFromNashik: 'Ramkund is located in the heart of Nashik city near Panchavati, approximately 3–5 km from major city areas.',
    travelOptions: "Auto-rickshaw, city bus, taxi, rental car, local sightseeing package.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Visitors can easily reach by local Public transport or taxis",
    image: "/images/sacred-destination-2.jpg"
  },

  {
    name: "Panchavati",
    history: "Panchavati is one of the most sacred places associated with the Ramayana and forms the spiritual heart of Nashik. The name Panchavati means 'garden of five banyan trees' and refers to the area where Lord Rama, Goddess Sita, and Lakshmana spent a significant portion of their fourteen-year exile. Many events from the Ramayana are believed to have taken place here, including the encounter with Shurpanakha and the events leading to Sita's abduction by Ravana. The region contains several important temples, ghats, caves, and shrines connected to these legends. Pilgrims visit Panchavati to experience the living heritage of the Ramayana and seek blessings from Lord Rama. Over centuries, the area developed into a major religious center with continuous worship and cultural activities. During festivals and Kumbh Mela, Panchavati becomes a vibrant destination for devotees from across India. Its blend of mythology, spirituality, and history makes it one of Nashik's most significant pilgrimage sites.",
    routeFromNashik: 'Panchavati is located about 5–8 km from most parts of Nashik city and can be reached within 15–20 minutes by road. Comfortable local transport can be arranged through',
    travelOptions: "Auto-rickshaw, local taxi, city bus, rental car, guided pilgrimage tour.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Visitors can easily reach by local Public transport or taxis",
    image: "/images/kumbhamela-img-3.jpg"
  },

  {
    name: "Kalaram Temple",
    history: "Kalaram Temple is one of the most prominent temples dedicated to Lord Rama in Maharashtra. Located in Panchavati, the temple derives its name from the black-colored stone idol of Lord Rama installed within the sanctum. The temple was constructed in the 18th century by Sardar Rangarao Odhekar and showcases impressive black stone architecture inspired by ancient temple styles. It holds great significance among devotees due to its association with the Ramayana and the Panchavati region. Kalaram Temple also occupies an important place in India's social history because Dr. B. R. Ambedkar led a temple entry movement here in 1930 advocating equal rights and social justice. The temple attracts thousands of pilgrims during Ram Navami and other Hindu festivals. Its elegant structure, spiritual importance, and historical relevance make it one of Nashik's most visited religious landmarks. Visitors often include Kalaram Temple as a key stop during spiritual tours of Nashik.",
    routeFromNashik: 'Located in Panchavati, Kalaram Temple is approximately 5 km from central Nashik and easily accessible by road.',
    travelOptions: "Taxi, auto-rickshaw, city bus, rental car, heritage tour package.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Visitors can easily reach by local Public transport or taxis",
    image: "/images/sacred-destination-3.jpg"
  },

  {
    name: "Godavari Ghats",
    history: "The Godavari Ghats of Nashik are among the most sacred riverfronts in India and serve as important centers for religious rituals, pilgrimages, and festivals. Built along the banks of the Godavari River, the ghats have witnessed centuries of spiritual activity and cultural traditions. Devotees gather here for holy baths, prayer ceremonies, ancestral rituals, and festival celebrations. The ghats are closely connected with the legends of Lord Rama and the sacred geography of Panchavati. During the Kumbh Mela, millions of pilgrims visit the Godavari Ghats to participate in ritual bathing, making it one of the largest religious gatherings in the world. Numerous temples and shrines line the riverbanks, creating a spiritually vibrant atmosphere. The architecture of the ghats reflects the historical development of Nashik as a major pilgrimage destination. Today, the Godavari Ghats remain a symbol of faith, devotion, and cultural continuity, attracting visitors from all parts of India and beyond.",
    routeFromNashik: 'Godavari Ghats are situated in central Nashik near Ramkund and Panchavati. They can be reached within minutes from most city locations. Local transportation and rental vehicles are available through',
    travelOptions: "Taxi, auto-rickshaw, city bus, rental car, walking tour.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Visitors can easily reach by local Public transport or taxis",
    image: "/images/sacred-destination-2.jpg"
  },
//     {
//     name: "Saptashrungi Devi",
//     history: "Saptashrungi Devi Temple is one of the most revered Shakti Peethas in Maharashtra and is dedicated to Goddess Saptashrungi Nivasini. Situated amidst seven mountain peaks in the Sahyadri range, the temple derives its name from the Sanskrit words 'Sapta' meaning seven and 'Shrungi' meaning peaks. According to Hindu mythology, the goddess is believed to be an incarnation of Durga who defeated powerful demons to protect righteousness. The idol of the goddess, carved into the mountain rock, stands approximately ten feet tall and is adorned with ornaments and weapons symbolizing divine power. For centuries, devotees have undertaken pilgrimages to seek blessings for prosperity, courage, and protection. The temple holds immense significance during Navratri when thousands of devotees gather to participate in religious celebrations. Surrounded by scenic hills and spiritual ambiance, Saptashrungi has become one of the most important pilgrimage destinations in Maharashtra. Its combination of natural beauty, mythology, and faith attracts devotees and tourists alike throughout the year.",
//     routeFromNashik: 'Saptashrungi Devi Temple is located near Vani, approximately 60 km from Nashik. The journey takes around 1.5 to 2 hours via Nashik–Vani Road.',
//     travelOptions: "Private taxi, rental car, state transport bus to Vani, shared jeep, pilgrimage tour package.",
//     routeLink: "/hotel/rental-car",
//     transportOptions:"Pilgrims can easily reach by local Public transport or taxis",
//     image: "/images/sacred-destination-4.jpg"
//   },

  {
    name: "Sita Gufa",
    history: "Sita Gufa is a sacred cave located in Panchavati and is deeply associated with the Ramayana. According to tradition, this cave served as a place where Goddess Sita spent time during her stay in the Panchavati region alongside Lord Rama and Lakshmana. It is also believed to be connected with the events leading to her abduction by Ravana. The cave has become an important pilgrimage site for devotees seeking to experience locations linked to the epic Ramayana. Visitors enter through a narrow passage that leads to small shrines dedicated to Lord Rama, Goddess Sita, and Lakshmana. Over the years, Sita Gufa has become one of the most visited spiritual landmarks in Nashik, attracting pilgrims from across India. The cave's unique atmosphere, mythological significance, and close proximity to other sacred sites in Panchavati make it an essential stop for devotees. It continues to preserve the cultural and religious heritage associated with one of Hinduism's most cherished epics.",
    routeFromNashik: 'Sita Gufa is situated in Panchavati, around 5 km from central Nashik.',
    travelOptions: "Auto-rickshaw, taxi, city bus, rental car, guided religious tour.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Pilgrims can easily reach by local Public transport or taxis",
    image: "/images/sita-gufa.webp"
  },

  {
    name: "Muktidham Temple",
    history: "Muktidham Temple is one of Nashik's most recognized modern spiritual landmarks. Constructed entirely from white marble, the temple complex was built by the late Shri Jayrambhai Bytco in memory of his mother. The temple is renowned for housing replicas of all twelve Jyotirlingas of India, allowing devotees to symbolically visit these sacred shrines in one location. The walls of the temple are inscribed with verses from the Bhagavad Gita, offering spiritual inspiration to visitors. The peaceful surroundings and elegant marble architecture create an atmosphere of devotion and reflection. Muktidham has become a popular destination for pilgrims, tourists, and families visiting Nashik. Its convenient location near Nashik Road railway station makes it easily accessible to travelers arriving from different parts of India. Over the years, the temple has established itself as an important center for worship, religious learning, and cultural appreciation. It continues to attract visitors seeking both spiritual fulfillment and architectural beauty.",
    routeFromNashik: 'Muktidham Temple is located at Nashik Road, approximately 8–10 km from central Nashik city.',
    travelOptions: "Taxi, auto-rickshaw, city bus, rental car, local sightseeing package.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Pilgrims can easily reach by local Public transport or taxis",
    image: "/images/sacred-destination-5.jpg"
  },

  {
    name: "Kapaleshwar Temple",
    history: "Kapaleshwar Temple is an ancient temple dedicated to Lord Shiva and is considered one of the most unique Shiva temples in India. Located near Ramkund on a small hillock, the temple is associated with a fascinating legend in which Lord Shiva sought redemption after accidentally taking a life. According to local traditions, Shiva was guided by a sacred cow and performed penance at this location. Unlike most Shiva temples, Kapaleshwar Temple does not have a Nandi idol facing the sanctum, making it distinctive among Hindu shrines. The temple has been an important place of worship for centuries and is frequently visited by devotees seeking blessings and spiritual peace. Its elevated location provides scenic views of the surrounding area, adding to its appeal. During festivals such as Mahashivratri, the temple receives large numbers of pilgrims. Kapaleshwar remains an integral part of Nashik's sacred landscape and reflects the city's deep-rooted religious traditions.",
    routeFromNashik: 'Kapaleshwar Temple is situated near Ramkund and Panchavati, approximately 4–5 km from central Nashik.',
    travelOptions: "Taxi, auto-rickshaw, city bus, rental car, pilgrimage tour package.",
    routeLink: "/hotel/rental-car",
    transportOptions:"It can be conveniently reached through local transport or rental vehicles arranged by",
    image: "/images/sacred-destination-2.jpg"
  },

  {
    name: "Anjaneri",
    history: "Anjaneri is a historically and spiritually significant hill located near Nashik and is widely believed to be the birthplace of Lord Hanuman. Named after Anjani Mata, the mother of Hanuman, the site holds immense importance in Hindu mythology. The hill is dotted with ancient temples, caves, and ruins that reflect centuries of religious activity. Pilgrims and trekkers alike visit Anjaneri to experience its spiritual atmosphere and scenic beauty. The trek to the summit passes through lush greenery and offers breathtaking views of the surrounding Sahyadri ranges. According to tradition, Lord Hanuman spent his early years in this region before becoming one of the greatest devotees of Lord Rama. The site has gained popularity not only among devotees but also among nature enthusiasts and adventure seekers. Anjaneri beautifully combines mythology, history, and natural landscapes, making it one of the most unique destinations near Nashik. Its spiritual significance continues to attract visitors throughout the year.",
    routeFromNashik: 'Anjaneri is located approximately 20 km from Nashik on the Nashik–Trimbakeshwar route. The drive takes around 30–40 minutes.',
    travelOptions: "Private taxi, rental car, state transport bus, trekking group transport, guided tour package.",
    routeLink: "/hotel/rental-car",
    transportOptions:"Pilgrims can easily reach by local Public transport or taxis, Visitors can arrange transportation and trekking trips through",
    image: "/images/anjaneri.webp"
  }
];

export const bathingDates = [
    {
        dateOccation: "Dhwajarohan – Flag Hoisting",
        title: "Official Commencement",
        day: "31",
        month: "October",
        year: "2026",
        isKeyDate: false
    },
    {
        dateOccation: "Nashik Kumbh Mela 2027",
        title: "Flag Hoisting Ceremony",
        day: "24",
        month: "July",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "Ashadh Somvati Amavasya",
        title: "First Amrit Snan",
        day: "2",
        month: "August",
        year: "2027",
        isKeyDate: true
    },
    {
        dateOccation: "Shravan Amavasya",
        title: "Second Amrit Snan",
        day: "31",
        month: "August",
        year: "2027",
        isKeyDate: true
    },
    {
        dateOccation: "",
        title: "Rishi Panchami",
        day: "5",
        month: "September",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "Bhadrapada Shuddha Ekadashi",
        title: "Third Amrit Snan - Vaishnava",
        day: "11",
        month: "September",
        year: "2027",
        isKeyDate: true
    },
    {
        dateOccation: "Kushavarta Tirtha, Trimbakeshwar",
        title: "Third Amrit Snan - Shaiva",
        day: "12",
        month: "September",
        year: "2027",
        isKeyDate: true
    },
    {
        dateOccation: "",
        title: "Bhadrapada Purnima",
        day: "15",
        month: "September",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Ashwin Shudh Ekadashi",
        day: "11",
        month: "October",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Ashwin Purnima",
        day: "15",
        month: "October",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Kartik Shudh Ekadashi",
        day: "10",
        month: "November",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Kartik Purnima",
        day: "22", // Note: Image only specifies 'November 2027'
        month: "November",
        year: "2027",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Mouni Amavasya",
        day: "26",
        month: "January",
        year: "2028",
        isKeyDate: true
    },
    {
        dateOccation: "",
        title: "Vasant Panchami",
        day: "1",
        month: "February",
        year: "2028",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Ganga Godavari Mahotsav",
        day: "8",
        month: "February",
        year: "2028",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Maha Shivratri",
        day: "27",
        month: "February",
        year: "2028",
        isKeyDate: false
    },
    {
        dateOccation: "",
        title: "Ganga Dussehra Utsav",
        day: "25",
        month: "May - June",
        year: "2028",
        isKeyDate: false
    },
    {
        dateOccation: "Flag Lowering Ceremony",
        title: "Official Conclusion",
        day: "24",
        month: "July",
        year: "2028",
        isKeyDate: false
    },
];

export const planTabData = [
    {
        id: 1,
        tabIcon: "",
        tabName: "How to Reach",
        tabDesc: "Explore seamless travel options by air, rail, or road, and start your journey effortlessly.",
        list: [
            {
                image: "/images/by-air.webp", // Replace with your actual image path
                title: "By Air (Flights)",
                description: "Fly into Nashik Ozar Airport (ISK) located 20 km from the center for direct domestic flights from Mumbai and Delhi. Alternatively, international travelers can land at Mumbai Airport (BOM) and take a scenic 3–4 hour road or rail trip to Nashik."
            },
            {
                image: "/images/by-train.webp", // Replace with your actual image path
                title: "By Train (Railways)",
                description: "Nashik Road Railway Station (NK) is a major central rail hub with excellent connectivity across India. Daily express and superfast trains connect Mumbai (CSMT/Dadar) directly to Nashik, completing the journey in just 3 to 3.5 hours."
            },
            {
                image: "/images/by-road.webp", // Replace with your actual image path
                title: "By Road (Highways & Buses)",
                description: "Nashik is seamlessly connected via smooth national highways like the Mumbai-Nashik Expressway (NH-160). State-run MSRTC buses, luxury private AC sleepers, and outstation cabs operate 24/7 from Mumbai, Pune, and surrounding regions."
            }
        ]
    },
    {
        id: 2,
        tabIcon: "",
        tabName: "Local Transport",
        tabDesc: "Explore our curated list of accommodations and book your serene retreat.",
        list: [
            {
                image: "/images/citilinc-bus.webp", // Replace with your actual image path
                title: "Citilinc Public Buses (NMPML)",
                description: "Nashik's official Citilinc bus network will operate special, high-frequency shuttle services during the event. These routes directly connect the railway station, main bus depots, and key city hubs straight to the primary Mela grounds."
            },
            {
                image: "/images/auto-rickshaw.webp", // Replace with your actual image path
                title: "Auto-Rickshaws",
                description: "Three-wheelers are widely available for quick transit across the city. Note that auto-rickshaw access will be restricted or zoned off around the core bathing areas on peak shahi snan (holy bathing) days to manage crowd density."
            },
            {
                image: "/images/walking-path.webp", // Replace with your actual image path
                title: "Pedestrian Walkways (On Foot)",
                description: "Walking is the most efficient way to navigate the immediate Mela zones and reach the bathing ghats. The administration is setting up dedicated pedestrian-only barricaded lanes to ensure safe, smooth, and vehicle-free movement."
            }
        ]
    },
    {
        id: 3,
        tabIcon: "",
        tabName: "Safety Guidelines",
        tabDesc: "Categorized list of public utilities, designed to make it accessible for tourists and pilgrims",
        list: [
            {
                image: "/images/crowd-safety.webp", // Replace with your actual image path
                title: "Crowd Safety & Awareness",
                description: "Stay with your group and establish clear meeting points. Follow directions from police and trained volunteers, and remain highly alert of your personal belongings in crowded areas to avoid pickpockets."
            },
            {
                image: "/images/hydration-food.webp", // Replace with your actual image path
                title: "Hydration & Safe Eating",
                description: "Carry a reusable water bottle and stay well-hydrated throughout the day. Avoid unhygienic street food and strictly opt for freshly prepared meals to prevent stomach infections."
            },
            {
                image: "/images/personal-hygiene.webp", // Replace with your actual image path
                title: "Personal Hygiene & Protection",
                description: "Keep a personal hygiene kit handy with hand sanitizer, tissues, and essential medications. Wear a face mask while moving around the grounds to safeguard against heavy dust and airborne pollutants."
            },
            {
                image: "/images/medical-services.webp", // Replace with your actual image path
                title: "Emergency Medical Services",
                description: "Familiarize yourself with the location of emergency medical camps. The Mela administration will have multiple temporary medical tents and fully equipped first-aid centers distributed across the venue."
            }
        ]
    },
    {
        id: 5,
        tabIcon: "",
        tabName: "Helpline",
        tabDesc: "Emergency: 100 | Tourist Helpline: 1800-XXX-XXXX | Medical Help: 108 | Available 24/7",
        list: [
            {
                image: "",
                title: "",
                description: ""
            },
            {
                image: "",
                title: "",
                description: ""
            },
            {
                image: "",
                title: "",
                description: ""
            },
            {
                image: "",
                title: "",
                description: ""
            }
        ],
    },
    // {
    //     id: 6,
    //     tabIcon: "",
    //     tabName: "Do's & Don'ts",
    //     tabDesc: "Designated parking areas available. Use local transport, shuttles, or auto-rickshaws for ghat access.",
    //     list: [
    //         {
    //             top: [
    //                 "Dress modestly in traditional attire",
    //                 "Respect local customs and traditions",
    //                 "Take only holy dips at designated ghats",
    //                 "Carry sufficient drinking water",
    //                 "Keep identity documents with you",
    //                 "Follow instructions of volunteers"
    //             ],
    //             bottom: [
    //                 "Don't litter the ghats or river",
    //                 "Avoid plastic bags and bottles",
    //                 "Don't take photographs without permission",
    //                 "Don't push or rush in crowds",
    //                 "Avoid carrying valuables",
    //                 "Don't ignore health advisories"
    //             ]
    //         }
    //     ],
    // },
]

// faq
export const faqData = [
    {
        id: "0",
        question: "How do I book a private vehicle for the Shahi Snan?",
        answer: "Private vehicle access is restricted near the main ghats on Shahi Snan days. We recommend booking at least 48 hours in advance. Our premium fleet includes specialized permissions for inner-city transit to authorized drop-off points."
    },
    {
        id: "1",
        question: "Is there specialized VVIP assistance available for seniors?",
        answer: "Yes, we offer a 'Seamless Pilgrimage' package specifically designed for senior citizens and those with limited mobility, including electric cart transfers and reserved seating for spiritual discourses."
    },
    {
        id: "2",
        question: "Can you arrange for helicopter transfers?",
        answer: "Helicopter transfers from Mumbai and Pune are available through our luxury partner network. Please submit a custom inquiry via the form above for flight paths and landing permissions."
    }
];

