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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
            }
        ],
        journey: [
            {
                journey_title: "Arrival & Purification at Ramkund",
                journey_desc: "Welcome to the spiritual heart of Maharashtra. Upon arrival, check into your heritage suite. As the sun dips below the horizon, witness the mesmerizing Ganga Aarti at Ramkund, where thousands of diyas light up the Godavari.",
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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
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
                in_icon: ""
            },
            {
                in_title: "Meals",
                in_icon: ""
            },
            {
                in_title: "Sightseeing",
                in_icon: ""
            },
            {
                in_title: "Transport",
                in_icon: ""
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
        name: 'Trimbakeshwar Temple',
        description: 'One of the twelve Jyotirlingas, sacred abode of Lord Shiva',
        location: '28 km from Nashik',
        image: "/images/sacred-destination-1.jpg"
    },
    {
        name: 'Ramkund',
        description: 'Sacred bathing ghat on Godavari River, where Lord Rama bathed',
        location: 'Central Nashik',
        image: "/images/sacred-destination-2.jpg"
    },
    {
        name: 'Panchavati',
        description: 'Holy place where Lord Rama, Sita, and Lakshmana resided during exile',
        location: '8 km from Nashik',
        image: "/images/kumbhamela-img-3.jpg"
    },
    {
        name: 'Kalaram Temple',
        description: 'Ancient temple dedicated to Lord Rama with black stone idol',
        location: 'Panchavati, Nashik',
        image: "/images/sacred-destination-3.jpg"
    },
    {
        name: "Godavari Ghats",
        description: "Historic river ghats with spiritual bathing rituals",
        location: "Nashik",
        image: "/images/sacred-destination-2.jpg"
    },
    {
        name: 'Saptashrungi Devi',
        description: 'Famous Shakti Peetha temple of Goddess Saptashrungi on hilltop',
        location: '60 km from Nashik',
        image: "/images/sacred-destination-4.jpg"
    },
    {
        name: "Sita Gufa",
        description: "Sacred cave where Goddess Sita meditated",
        location: "Nashik",
        image: "/images/sita-gufa.webp"
    },
    {
        name: 'Muktidham Temple',
        description: 'White marble temple complex with replicas of 12 Jyotirlingas',
        location: 'Nashik Road',
        image: "/images/sacred-destination-5.jpg"
    },
    {
        name: "Kapaleshwar Temple",
        description: "Ancient Shiva temple on hill with scenic views",
        location: "Nashik",
        image: "/images/sacred-destination-2.jpg"
    },
    {
        name: "Anjaneri",
        description: "Birthplace of Lord Hanuman with trekking path",
        location: "Near Nashik",
        image: "/images/anjaneri.webp"
    }
];

export const bathingDates = [
    {
        title: "Official Commencement (Dhwajarohan – Flag Hoisting)",
        day: "31",
        month: "October",
        year: "2026",
        isKeyDate: false
    },
    {
        title: "Flag Hoisting Ceremony (Nashik Kumbh Mela 2027)",
        day: "24",
        month: "July",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "First Amrit Snan (Ashadh Somvati Amavasya)",
        day: "2",
        month: "August",
        year: "2027",
        isKeyDate: true
    },
    {
        title: "Second Amrit Snan (Shravan Amavasya)",
        day: "31",
        month: "August",
        year: "2027",
        isKeyDate: true
    },
    {
        title: "Rishi Panchami",
        day: "5",
        month: "September",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "Third Amrit Snan - Vaishnava (Bhadrapada Shuddha Ekadashi)",
        day: "11",
        month: "September",
        year: "2027",
        isKeyDate: true
    },
    {
        title: "Third Amrit Snan - Shaiva (Kushavarta Tirtha, Trimbakeshwar)",
        day: "12",
        month: "September",
        year: "2027",
        isKeyDate: true
    },
    {
        title: "Bhadrapada Purnima",
        day: "15",
        month: "September",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "Ashwin Shudh Ekadashi",
        day: "11",
        month: "October",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "Ashwin Purnima",
        day: "15",
        month: "October",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "Kartik Shudh Ekadashi",
        day: "10",
        month: "November",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "Kartik Purnima",
        day: "", // Note: Image only specifies 'November 2027'
        month: "November",
        year: "2027",
        isKeyDate: false
    },
    {
        title: "Mouni Amavasya",
        day: "26",
        month: "January",
        year: "2028",
        isKeyDate: true
    },
    {
        title: "Vasant Panchami",
        day: "1",
        month: "February",
        year: "2028",
        isKeyDate: false
    },
    {
        title: "Ganga Godavari Mahotsav",
        day: "8",
        month: "February",
        year: "2028",
        isKeyDate: false
    },
    {
        title: "Maha Shivratri",
        day: "27",
        month: "February",
        year: "2028",
        isKeyDate: false
    },
    {
        title: "Ganga Dussehra Utsav",
        day: "25",
        month: "May - June",
        year: "2028",
        isKeyDate: false
    },
    {
        title: "Official Conclusion (Flag Lowering Ceremony)",
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
        tabImages: [
            {
                top: [
                    "/images/tab-img-1.png",
                    "/images/tab-img-2.png",
                    "/images/tab-img-3.png"
                ],
                bottom: [
                    "/images/tab-img-4.png",
                    "/images/tab-img-5.png",
                    "/images/tab-img-6.png"
                ]
            }
        ],
    },
    {
        id: 2,
        tabIcon: "",
        tabName: "Where to Stay",
        tabDesc: "Explore our curated list of accommodations and book your serene retreat.",
        tabImages: [
            {
                top: [
                    "/images/tour-demo-1.png",
                    "/images/tour-demo-2.png",
                    "/images/tour-demo-3.png"
                ],
                bottom: [
                    "/images/tour-demo-1.png",
                    "/images/tour-demo-2.png",
                    "/images/tour-demo-3.png"
                ]
            }
        ],
    },
    {
        id: 3,
        tabIcon: "",
        tabName: "Public Utilities",
        tabDesc: "Categorized list of public utilities, designed to make it accessible for tourists and pilgrims",
        tabImages: [
            {
                top: [
                    "/images/tour-demo-1.png",
                    "/images/tour-demo-2.png",
                    "/images/tour-demo-3.png"
                ],
                bottom: [
                    "/images/tour-demo-4.png",
                    "/images/tour-demo-5.png",
                    "/images/tour-demo-6.png"
                ]
            }
        ],
    },
    {
        id: 4,
        tabIcon: "",
        tabName: "Nearby Attractions",
        tabDesc: "Explore nearby attractions, including popular locations like Varanasi, Ayodhya Dham, and more.",
        tabImages: [
            {
                top: [
                    "/images/tour-demo-1.png",
                    "/images/tour-demo-2.png",
                    "/images/tour-demo-3.png"
                ],
                bottom: [
                    "/images/tour-demo-4.png",
                    "/images/tour-demo-5.png",
                    "/images/tour-demo-6.png"
                ]
            }
        ],
    },
    {
        id: 5,
        tabIcon: "",
        tabName: "Helpline",
        tabDesc: "Emergency: 100 | Tourist Helpline: 1800-XXX-XXXX | Medical Help: 108 | Available 24/7",
        tabImages: [
            {
                top: [
                    "/images/tour-demo-1.png",
                    "/images/tour-demo-2.png",
                    "/images/tour-demo-3.png"
                ],
                bottom: [
                    "/images/tour-demo-4.png",
                    "/images/tour-demo-5.png",
                    "/images/tour-demo-6.png"
                ]
            }
        ],
    },
    {
        id: 6,
        tabIcon: "",
        tabName: "Parking & Transport",
        tabDesc: "Designated parking areas available. Use local transport, shuttles, or auto-rickshaws for ghat access.",
        tabImages: [
            {
                top: [
                    "/images/tour-demo-1.png",
                    "/images/tour-demo-2.png",
                    "/images/tour-demo-3.png"
                ],
                bottom: [
                    "/images/tour-demo-4.png",
                    "/images/tour-demo-5.png",
                    "/images/tour-demo-6.png"
                ]
            }
        ],
    },
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

// Hero Slider Data
export const heroSliderData = [
    {
        id: 1,
        image: "/images/hero-bg-1.webp",
        subHeading: "Experience Unmatched Delight With Us.",
        title: "Where Exceptional Memories Begin",
        description: "Welcome to our Vitour website! We are a professional and reliable tours company that offers a wide range of printing services are many variations of passages.",
    },
    {
        id: 2,
        image: "/images/hero-bg-1.webp",
        subHeading: "The Sacred Confluence of Faith & Time",
        title: "Nashik Kumbh Mela",
        description: "Where millions gather on the banks of the holy Godavari to seek spiritual liberation. Experience the world's largest spiritual congregation at one of India's most sacred pilgrimage sites."
    },
    // {
    //     id: 3,
    //     image: "/images/hero-bg-1.webp",
    //     subHeading: "Experience Unmatched Delight With Us.",
    //     title: "Hero Slider",
    //     description: "Hero Slider Description"
    // }
];