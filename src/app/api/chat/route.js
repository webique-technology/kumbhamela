import { NextResponse } from "next/server";
import stringSimilarity from "string-similarity";

// 1. Define your exhaustive, professional Kumbh Mela knowledge base matrix
const KNOWLEDGE_BASE = [
  {
    inputs: [
      "what is nashik mahakumbh 2027", "mahakumbh 2027 basics", "simhastha kumbh mela",
      "what is kumbha", "simhastha rashi", "jupiter enters leo"
    ],
    reply: `<b>🕉️ Mahakumbh 2027 Basics & Legacy:</b><br />
        • Nashik Mahakumbh (Simhastha Kumbh) is one of the world's largest Hindu spiritual gatherings, held every 12 years on the banks of the Godavari River in Nashik and Trimbakeshwar. Millions of devotees visit for holy bathing, prayers, and spiritual activities.<br />
        • Simhastha Kumbh occurs when Jupiter enters Leo (Simha Rashi), making Nashik the host city for the sacred event.`
  },
  {
    inputs: [
      "when will nashik mahakumbh 2027 take place", "kumbh mela dates", "amrit snan dates 2027",
      "shahi snan date", "auspicious bathing days", "mela calendar"
    ],
    reply: `<b>📅 Official Mahakumbh 2027 Timings & Auspicious Snan Dates:</b><br />
        • The main Kumbh period is expected during 2027, while the broader Simhastha cycle officially runs from October 2026 to July 2028.<br />
        • The major Amrit Snan dates are:<br />
          - 2 August 2027<br />
          - 31 August 2027<br />
          - 11–12 September 2027<br />
        • These are considered the most auspicious bathing days.`
  },
  {
    inputs: [
      "why is kumbh mela held in nashik", "history of kumbh", "story of amrit",
      "reason for holding", "samudra manthan", "nectar of immortality"
    ],
    reply: `<b>🛕 Why Kumbh Mela is Held in Nashik:</b><br />
        • According to Hindu mythology, drops of Amrit (nectar of immortality) fell at Nashik during the cosmic Samudra Manthan, making the Godavari River a sacred site for Kumbh celebrations.`
  },
  {
    inputs: [
      "where can i take a holy dip", "amrit snan location", "bathing mandatory",
      "what should i wear during snan", "women facilities", "changing rooms",
      "ghat is most important", "significance of ramkund", "significance of kushavarta kund",
      "lockers near ghats", "carry for the holy bath", "separate bathing arrangements"
    ],
    reply: `<b>🌊 Holy Bathing Guide, Ghat Access & Logistics:</b><br />
        • <b>Where to take a dip:</b> The main bathing locations are Ramkund in Nashik and Kushavarta Kund in Trimbakeshwar. Both are considered highly sacred by devotees.<br />
        • <b>Is bathing mandatory?</b> No. Pilgrims can participate in prayers, temple visits, discourses, and spiritual activities without taking a holy bath.<br />
        • <b>What to wear:</b> Modest traditional clothing suitable for bathing and religious activities.<br />
        • <b>Facilities for women:</b> Authorities are planning changing rooms and dedicated facilities for pilgrims near major bathing locations to ensure privacy, safety, and convenience.<br />
        • <b>Lockers & Storage:</b> Locker and luggage storage facilities may be available at selected locations. Pilgrims are advised not to carry unnecessary valuables.<br />
        • <b>What to carry:</b> Carry a towel, an extra set of clothes, personal medicines, drinking water, footwear, and a waterproof bag for valuables.`
  },
  {
    inputs: [
      "best time for holy bathing", "days are most crowded", "days are less crowded",
      "evening bath", "photography at ghats", "lose belongings at the ghat"
    ],
    reply: `<b>⏱️ Ghat Timings, Crowds & Guidelines:</b><br />
        • <b>Best time:</b> Early morning is generally considered the most suitable time for holy bathing due to pleasant weather and spiritual significance. Bathing is generally possible throughout the day, but early morning is the most auspicious.<br />
        • <b>Crowded days:</b> Major bathing dates, Shahi Snan days, weekends, and public holidays typically witness the largest crowds.<br />
        • <b>Less crowded days:</b> Regular weekdays and non-special bathing dates are usually less crowded and more comfortable.<br />
        • <b>Families:</b> Families can participate in holy bathing together while following safety guidelines and crowd management instructions.<br />
        • <b>Photography:</b> Photography is generally allowed in public areas, but pilgrims should respect religious ceremonies and privacy guidelines.<br />
        • <b>Lost Items:</b> Immediately contact the nearest police help desk, information center, or lost-and-found facility for assistance.`
  },
  {
    inputs: [
      "special about trimbakeshwar temple", "rituals performed at trimbakeshwar", "temple timings",
      "rudrabhishek", "kalsarp shanti", "narayan nagbali", "mahamrityunjaya jaap",
      "non-hindus enter trimbakeshwar", "jyotirlinga near nashik", "advance booking for pujas"
    ],
    reply: `<b>🔱 Holy Trimbakeshwar Jyotirlinga Temple:</b><br />
        • <b>What is special:</b> It is one of the 12 Jyotirlingas of Lord Shiva and one of Maharashtra's most sacred pilgrimage sites.<br />
        • <b>Rituals performed:</b> Popular rituals include Rudrabhishek, Narayan Nagbali, Kalsarp Shanti, and Mahamrityunjaya Jaap. Many temples allow advance booking for pujas and special religious ceremonies, subject to availability.<br />
        • <b>Temple timings:</b> Generally early morning to evening, but timings may change or extend during Kumbh.<br />
        • <b>Non-Hindus access:</b> Non-Hindus may have restricted access to the inner sanctum. Visitors should verify current temple regulations before visiting.`
  },
  {
    inputs: [
      "panchavati", "ramkund", "sita gufa", "kapaleshwar temple",
      "how much time is needed to explore panchavati", "lord rama exile"
    ],
    reply: `<b>🏞️ Panchavati & Ramayana Connections:</b><br />
        • <b>Panchavati:</b> Panchavati is the sacred area where Lord Rama, Sita, and Lakshmana are believed to have stayed during exile.<br />
        • <b>Ramkund:</b> Ramkund is the most sacred bathing ghat in Nashik, a major Kumbh location, and is believed to be associated with Lord Rama's stay in Nashik where he took his baths.<br />
        • <b>Sita Gufa:</b> A cave associated with Goddess Sita and the Ramayana period.<br />
        • <b>Kapaleshwar Temple:</b> An ancient Shiva temple located near Ramkund where there is no Nandi statue facing the lingam.<br />
        • <b>Time required:</b> Around 3–5 hours are needed to properly explore the core Panchavati area.`
  },
  {
    inputs: [
      "how can i reach nashik", "nearest railway station", "airport serves nashik",
      "reach nashik airport", "reach nashik railway station"
    ],
    reply: `<b>✈️ Travel Questions & Transportation Guide:</b><br />
        • <b>How to reach:</b> Nashik can be reached by Air, Train, Bus, and Private Vehicle.<br />
        • <b>Railway Station:</b> Nashik Road Railway Station is the nearest railway station (about 8 km from the city centre). Auto-rickshaws, taxis, and city buses take around 15 to 20 minutes to reach the city center.<br />
        • <b>Airport:</b> Ozar Airport (Nashik Airport) is located about 20 km from the city centre. Taxis and cab services take around 30 to 40 minutes.<br />
        • <b>Local Transport:</b> Nashik offers city buses, auto-rickshaws, taxis, app-based cabs, and rental vehicles across all major pilgrimage zones.`
  },
  {
    inputs: [
      "bus service available during kumbh", "can i drive my own car", "reach nashik railway station",
    ],
    replay: `• <b>Buses & Private Cars:</b> Special government and private buses are expected during Kumbh. You can drive your own car, but traffic restrictions may apply on peak days.<br />`
  },
  {
    inputs: [
      "can i drive my own car", "reach nashik airport",
      "travel between nashik and trimbakeshwar"
    ],
    replay: `• <b>Nashik to Trimbakeshwar:</b> Regular buses, shared taxis, private cabs, and special pilgrimage transport services operate the 30 km route. Travel time is around 45–60 minutes depending on traffic.<br /> reply: `
  },
  {
    inputs: [
      "where can i stay during kumbh", "budget accommodations", "luxury hotels",
      "should i book accommodation in advance", "family accommodations available"
    ],
    reply: `<b>🏨 Accommodation & Stay Questions:</b><br />
        • <b>Where to stay:</b> Pilgrims can choose from Hotels, Dharamshalas, Ashrams, Guest Houses, and Tent Cities near major pilgrimage locations.<br />
        • <b>Tiers available:</b> Both affordable budget accommodations and premium luxury hotels or resorts are widely available in Nashik.<br />
        • <b>Advance booking:</b> Yes, it is highly recommended to book accommodation preferably several months before peak bathing dates due to immense crowd demand.<br />
        • <b>Family stays:</b> Yes, family rooms, interconnected rooms, and group accommodations can be systematically arranged.`
  },
  {
    inputs: [
      "famous food in nashik", "pure vegetarian food available", "jain meals available",
      "free food bhandara", "drinking water available", "south indian meals", "north indian meals",
      "satvik food"
    ],
    reply: `<b>🍽️ Food & Dining Options:</b><br />
        • <b>Famous food:</b> Popular local dishes include Misal Pav, Vada Pav, Sabudana Khichdi, Puran Poli, and Pithla Bhakri.<br />
        • <b>Cuisines available:</b> South Indian meals (idli, dosa, uttapam) and North Indian cuisines (thalis, paneer dishes, roti) are widely found.<br />
        • <b>Dietary restrictions:</b> Pure vegetarian food is extensively available near temples. Many restaurants and hotels serve Jain and Satvik meals prepared without onion and garlic upon request.<br />
        • <b>Free meals & water:</b> Many religious organizations conduct free food distribution (Bhandara/Mahaprasad). Drinking water facilities are available at designated spots near major temples and ghats.`
  },
  {
    inputs: ["how far is shirdi from nashik", "shirdi sai baba temple", "temple is famous for sai baba"],
    reply: `<b>🛕 Shirdi Sai Baba Temple Tour Details:</b><br />
        • <b>Distance:</b> Shirdi is approximately 90 km from Nashik.<br />
        • <b>How to travel:</b> You can travel by taxi, private car, MSRTC bus, or tour coach. The journey usually takes 2 to 2.5 hours.<br />
        • <b>Significance:</b> Shirdi houses the world-famous Shirdi Sai Baba Temple and easily acts as a same-day excursion route.`
  },
  {
    inputs: ["how far is saptashrungi temple", "saptashrungi devi temple from nashik"],
    reply: `<b>🛕 Saptashrungi Devi Temple Details:</b><br />
        • <b>Distance:</b> Saptashrungi Temple is approximately 60 km from Nashik.<br />
        • <b>How to travel:</b> Pilgrims can travel by bus, taxi, or private vehicle. The journey takes about 1.5 to 2 hours to complete.`
  },
  {
    inputs: ["can i visit shani shingnapur from nashik", "how far is shani shingnapur from nashik", "shani shingnapur distance"],
    reply: `<b>🛕 Shani Shingnapur Temple Travel Details:</b><br />
        • <b>Distance:</b> Shani Shingnapur is around 75 km from Nashik.<br />
        • <b>How to travel:</b> Taxis, buses, and private vehicles are readily available. Travel time is approximately 2 hours. It is a highly popular pilgrimage route from Nashik.`
  },
  {
    inputs: ["how far is bhima shankar temple from nashik", "bhima shankar temple from nashik"],
    reply: `<b>🔱 Bhimashankar Jyotirlinga Distance & Route:</b><br />
        • <b>Distance:</b> Bhimashankar is about 210 km from Nashik.<br />
        • <b>How to travel:</b> Private taxis and select outstation buses are available. The journey usually takes 5 to 6 hours.`
  },
  {
    inputs: ["how far is grishneshwar temple from nashik", "grishneshwar temple from nashik"],
    reply: `<b>🔱 Grishneshwar Jyotirlinga Distance & Route:</b><br />
        • <b>Distance:</b> Grishneshwar Jyotirlinga is approximately 180 km from Nashik.<br />
        • <b>How to travel:</b> You can travel by taxi, bus, or private vehicle. Travel time is around 4 to 5 hours.`
  },
  {
    inputs: ["how far is ellora caves from nashik", "ellora caves distance"],
    reply: `<b>🗿 Ellora Caves Sightseeing Distance:</b><br />
        • <b>Distance:</b> Ellora Caves are about 175 km from Nashik.<br />
        • <b>How to travel:</b> Taxis, buses, and private vehicles are available. The journey takes around 4 hours.`
  },
  {
    inputs: ["how far is ajanta caves from nashik", "ajanta caves distance"],
    reply: `<b>🗿 Ajanta Caves Sightseeing Distance:</b><br />
        • <b>Distance:</b> Ajanta Caves are approximately 270 km from Nashik.<br />
        • <b>How to travel:</b> Private vehicles and outstation buses are available. Travel time is around 6 hours.`
  },
  {
    inputs: ["how far is pandharpur from nashik", "temple dedicated to vitthal"],
    reply: `<b>🛕 Pandharpur Vitthal Temple Distance & Route:</b><br />
        • <b>Distance:</b> Pandharpur is around 340 km from Nashik.<br />
        • <b>How to travel:</b> Buses, trains, and private taxis are available. Travel time is approximately 7 to 8 hours. It houses the legendary Pandharpur Vitthal Temple.`
  },
  {
    inputs: ["how far is kolhapur mahalaxmi temple from nashik", "kolhapur mahalaxmi temple distance"],
    reply: `<b>🛕 Kolhapur Mahalaxmi Temple Distance:</b><br />
        • <b>Distance:</b> Kolhapur is approximately 430 km from Nashik.<br />
        • <b>How to travel:</b> You can travel by train, bus, or private vehicle. The journey takes around 8 to 9 hours.`
  },
  {
    inputs: ["how far is pune from nashik", "pune travel time"],
    reply: `<b>🚗 Pune to Nashik Distance & Transit:</b><br />
        • <b>Distance:</b> Pune is about 210 km from Nashik.<br />
        • <b>How to travel:</b> Frequent intercity buses, outstation taxis, and connecting trains are available. Travel time is usually 4 to 5 hours.`
  },
  {
    inputs: ["how far is mumbai from nashik", "mumbai travel time", "airport transfers mumbai"],
    reply: `<b>🚗 Mumbai to Nashik Distance & Airport Transfers:</b><br />
        • <b>Distance:</b> Mumbai is approximately 170 km from Nashik.<br />
        • <b>How to travel:</b> Trains, buses, airport transfer taxis, and private vehicles are continuously available. Travel time is around 3 to 4 hours.`
  },
  {
    inputs: [
      "how many days is this tour package", "can the tour duration be customized",
      "private tour", "how can i get the package price", "customize temple visits in the itinerary"
    ],
    reply: `<b>🗺️ Tour Package General Questions & Customization:</b><br />
        • <b>Tour Duration:</b> The duration depends entirely on the selected package. Tour packages range from 1-day local trips to multi-day pilgrimages such as 3-day, 4-day, or 12 Jyotirlinga tours.<br />
        • <b>Customization:</b> Yes, the tour duration, temple visits, and sightseeing choices can be fully customized based on your preferences, group size, and available time.<br />
        • <b>Pricing:</b> Package pricing depends on travel dates, number of passengers, vehicle type, and hotel category. Please contact our main help desk for a customized quotation.`
  },
  {
    inputs: [
      "what vehicles are available for the tour", "suitable for a family trip",
      "suitable for large groups", "are the vehicles comfortable for senior citizens",
      "is luggage space available", "are experienced drivers provided", "is pickup and drop service available",
      "are vehicles sanitized and maintained", "vehicles are air-conditioned"
    ],
    reply: `<b>🚕 Fleet Inventory & Vehicle Facilities:</b><br />
        • <b>Vehicles Available:</b> We provide a variety of vehicles including Sedan Cars, SUVs, Ertiga, Innova Crysta, Tempo Traveller, Mini Bus, and Luxury Coaches.<br />
        • <b>Family Trips (4–6 members):</b> Sedan, Ertiga, or Innova Crysta vehicles are highly recommended for comfortable travel.<br />
        • <b>Large Groups:</b> Tempo Travellers, Mini Buses, and Luxury Coaches are ideal for larger groups.<br />
        • <b>Facilities:</b> Air-conditioned (AC) vehicles are available for most packages. All vehicles feature comfortable seating suitable for senior citizens, adequate luggage space based on passenger capacity, and undergo regular maintenance and cleaning.<br />
        • <b>Drivers & Pickups:</b> All tours include experienced, professional drivers familiar with local pilgrimage routes. Doorstep pickup and drop services are available from stations, airports, or hotels.`
  },
  {
    inputs: [
      "is hotel accommodation included in the package", "what type of hotels are provided",
      "are family rooms available", "are hotel rooms air-conditioned", "is breakfast included",
      "can hotels be upgraded", "are hotels located near temples", "is hot water available in hotels"
    ],
    reply: `<b>🏨 Hotel Facilities & Accommodation Plans:</b><br />
        • <b>Inclusions & Upgrades:</b> Hotel accommodation can be fully included depending on the selected package. Room upgrades can easily be arranged at an additional cost.<br />
        • <b>Hotel Categories:</b> We offer Budget, Standard, Deluxe, and Premium hotel options equipped with basic amenities like hot water for a comfortable stay.<br />
        • <b>Room Configurations:</b> Family rooms, multiple occupancy blocks, AC, and Non-AC choices are selectable. Breakfast inclusion varies by the chosen package plan.<br />
        • <b>Location:</b> We arrange accommodations close to major temples and pilgrimage sites whenever possible to reduce daily walking fatigue.`
  },
  {
    inputs: ["ashtavinayak tour package for 3 days", "temples are covered in the ashtavinayak tour"],
    reply: `<b>🦚 Ashtavinayak Tour Package (3 Days):</b><br />
        • <b>Duration:</b> The Ashtavinayak Tour is a dedicated 3-day pilgrimage covering all 8 sacred Ganpati temples of Maharashtra.<br />
        • <b>Temples Covered:</b> The tour includes Morgaon, Siddhatek, Pali, Mahad, Theur, Lenyadri, Ozar, and Ranjangaon Ganpati temples.<br />
        • <b>Logistics:</b> Sedan, Ertiga, Innova Crysta, and Tempo Traveller options are provided. Fully air-conditioned (AC) vehicles and hotel accommodations are included. This tour is completely suitable for families, devotees, and senior citizens.`
  },
  {
    inputs: ["nashik shirdi trimbakeshwar tour", "places are covered in this tour"],
    reply: `<b>🛕 Nashik Shirdi Trimbakeshwar Tour Package:</b><br />
        • <b>Duration:</b> Usually completed within 2 to 3 days depending on the selected itinerary grid.<br />
        • <b>Places Covered:</b> Includes Shirdi Sai Baba Temple, Trimbakeshwar Jyotirlinga, Panchavati, and Ramkund.<br />
        • <b>Facilities:</b> Sedan, SUV, Innova Crysta, and Tempo Traveller vehicles with comfortable hotel stays in Nashik or Shirdi. Pickup and drop services are available from Nashik, Mumbai, Pune, and nearby locations.`
  },
  {
    inputs: ["nashik with 2 jyotirlinga tour package", "2 jyotirlingas are covered"],
    reply: `<b>🔱 Nashik with 2 Jyotirlinga Tour Package:</b><br />
        • <b>Duration:</b> Generally takes 2 to 3 days to complete.<br />
        • <b>Jyotirlingas Covered:</b> Trimbakeshwar Jyotirlinga and Grishneshwar Jyotirlinga.<br />
        • <b>Sightseeing:</b> Panchavati, Ramkund, and optional Ellora Caves visits are included. Vehicles include Sedan, SUV, Innova Crysta, and Tempo Traveller with hotel stays.`
  },
  {
    inputs: ["3 jyotirlinga tour package for 4 days", "3 jyotirlingas are covered"],
    reply: `<b>🔱 3 Jyotirlinga Tour Package (4 Days):</b><br />
        • <b>Duration:</b> Set duration of 4 days.<br />
        • <b>Jyotirlingas Covered:</b> Trimbakeshwar, Grishneshwar, and Parli Vaijnath Jyotirlingas.<br />
        • <b>Sightseeing:</b> Includes Ellora Caves sightseeing. Vehicles range from Sedan, Ertiga, Innova Crysta, Tempo Traveller, to Mini Buses with hotel stays.`
  },
  {
    inputs: ["sade tin shakti peeth tour package", "temples are covered shakti peeth"],
    reply: `<b>🦚 Sade Tin Shakti Peeth Tour Package:</b><br />
        • <b>Duration:</b> The tour generally takes 4 to 5 days.<br />
        • <b>Temples Covered:</b> Mahalakshmi Temple Kolhapur, Tulja Bhavani Temple, Renuka Mata Temple (Mahur Gad), and Saptashrungi Devi Temple (Vani).<br />
        • <b>Logistics:</b> Fully comfortable AC vehicles with experienced drivers and integrated hotel accommodations ideal for families.`
  },
  {
    inputs: ["5 jyotirlinga pilgrimage in maharashtra", "5 jyotirlingas covered"],
    reply: `<b>🔱 5 Jyotirlinga Pilgrimage in Maharashtra:</b><br />
        • <b>Duration:</b> The tour usually takes 5 to 6 days.<br />
        • <b>Jyotirlingas Covered:</b> Trimbakeshwar, Grishneshwar, Parli Vaijnath, Aundha Nagnath, and Bhimashankar.<br />
        • <b>Logistics:</b> Handled via Innova Crysta, Tempo Traveller, Mini Bus, or Luxury Coach. Comfortable hotel stays are arranged throughout the pilgrimage circuit, making it senior-citizen friendly.`
  },
  {
    inputs: ["12 jyotirlinga yatra", "states are covered 12 jyotirlinga"],
    reply: `<b>🔱 Elite 12 Jyotirlinga Yatra:</b><br />
        • <b>Duration:</b> The complete pan-India yatra usually takes 15 to 20 days.<br />
        • <b>States Covered:</b> Covers more than 8 states across India to complete darshan of all 12 holy Jyotirlingas.<br />
        • <b>Logistics:</b> Managed with premium AC Tempo Travellers, Mini Buses, or Luxury Coaches with pre-arranged hotel accommodations at all destinations.`
  },
  {
    inputs: ["akkalkot shegaon pandharpur tour", "spiritual places are covered"],
    reply: `<b>🛕 Akkalkot Shegaon Pandharpur Tour:</b><br />
        • <b>Duration:</b> The tour duration is 4 days.<br />
        • <b>Darshan Covered:</b> Shri Swami Samarth Maharaj (Akkalkot), Shri Gajanan Maharaj (Shegaon), and Lord Vitthal-Rukmini (Pandharpur).<br />
        • <b>Logistics:</b> Sedan, Innova Crysta, Tempo Traveller, and Mini Bus vehicle configurations with comfortable hotel stays included.`
  },
  {
    inputs: ["nashik kumbh darshan & trimbakeshwar tour package", "vip kumbh darshan assistance"],
    reply: `<b>🕉️ Nashik Kumbh Darshan & Trimbakeshwar Tour Package:</b><br />
        • <b>Duration:</b> Completed in 1 to 2 days depending on the selected itinerary grid.<br />
        • <b>VIP Assistance:</b> VIP Darshan assistance can be arranged upon request.<br />
        • <b>Places Covered:</b> Trimbakeshwar Jyotirlinga, Nashik Kumbh areas, Panchavati, and Ramkund via AC Sedan, SUV, Innova Crysta, or Tempo Traveller.`
  },
  {
    inputs: [
      "is mahakumbh safe for senior citizens", "hotels are best for elderly pilgrims",
      "can wheelchairs be arranged", "are battery-operated vehicles available",
      "arrange a caretaker for elderly", "bathing ghats are easiest for senior citizens",
      "can you arrange ground-floor rooms", "package is best for senior citizen groups"
    ],
    reply: `<b>👴 Senior Citizen Safety, Accessibility & Comfort:</b><br />
        • <b>Safety & Suitability:</b> Yes, Mahakumbh can be safely attended by senior citizens with proper planning. We recommend comfortable hotels, private vehicles with minimal walking, and avoiding peak crowd hours.<br />
        • <b>Hotels & Rooms:</b> Properties near major pilgrimage areas with elevators, ground-floor rooms, medical assistance, and easy vehicle access are ideal. Ground-floor rooms or elevator access can be requested when booking.<br />
        • <b>Mobility Assistance:</b> Wheelchair assistance can be arranged on request (subject to destination availability). Battery-operated vehicles may be available in selected zones to assist elderly and differently-abled pilgrims during major events.<br />
        • <b>Caretakers & Guides:</b> Local guides or caretaker services can be arranged through local providers on request to assist with temple sightseeing.`
  },
  {
    inputs: [
      "is mahakumbh suitable for children", "precautions should families take during crowded days",
      "can you arrange family rooms", "kid-friendly hotels in nashik", "best itinerary for families",
      "grandparents and children travel comfortably together", "can i bring a stroller for my child"
    ],
    reply: `<b>👶 Family and Kid-Friendly Travel Precautions:</b><br />
        • <b>Suitability:</b> Yes, Mahakumbh is a family-friendly spiritual event. Grandparents and children can travel comfortably together using private transportation and properly planned schedules.<br />
        • <b>Precautions:</b> Keep children close, carry clear identification details on them, stay well-hydrated, and decide on a clear meeting landmark in case someone gets separated.<br />
        • <b>Stays & Itineraries:</b> Family rooms, interconnected setups, and spacious group accommodations can easily be arranged. A popular 2-3 day family itinerary covers Ramkund, Kalaram Temple, Sita Gufa, and Trimbakeshwar Temple.<br />
        • <b>Strollers:</b> Yes, strollers can be brought along, but note that some highly crowded areas and temple premises will require carrying the child instead.`
  },
  {
    inputs: [
      "emergency number should i call", "what should i do if i get lost",
      "are medical facilities available", "how can i find my family members",
      "is nashik safe for solo travellers"
    ],
    reply: `<b>🚑 Safety, Lost-and-Found & Emergency Support:</b><br />
        • <b>Emergency Helpline:</b> Dial <b>112</b> for instant emergency, medical, or police assistance.<br />
        • <b>Medical Facilities:</b> Yes, temporary and permanent medical facilities, clinics, first-aid camps, and 24/7 ambulances will be fully deployed throughout the Mela grounds.<br />
        • <b>Lost Protocol:</b> If you get lost or separated, contact the nearest help desk, police booth, or information center. Use designated lost-and-found centers and public announcement audio systems to reunite with your group.<br />
        • <b>Solo Travelers:</b> Yes, Nashik is fully safe for solo travelers. Pilgrims should follow standard safety precautions and official government advisories.`
  }
];

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message) return NextResponse.json({ reply: "Please type something..." });

    const userQuery = message.trim().toLowerCase();

    let bestMatch = null;
    let highestScore = 0;

    // 2. Loop through our local database to find the closest match score
    for (const item of KNOWLEDGE_BASE) {
      for (const sampleInput of item.inputs) {
        // Direct matching optimization
        if (userQuery.includes(sampleInput) || sampleInput.includes(userQuery)) {
          highestScore = 1.0;
          bestMatch = item;
          break;
        }

        // Phrase similarity estimation calculation
        const score = stringSimilarity.compareTwoStrings(userQuery, sampleInput);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }
      if (highestScore === 1.0) break;
    }

    // 3. Define confidence threshold (e.g., 25% phrase matching structural similarity)
    let reply = "";
    if (highestScore > 0.25 && bestMatch) {
      reply = bestMatch.reply;
    } else {
      // Elegant, fallback handler pointing to your office operators
      reply = `Jai Shree Ram! 🙏 Thank you for reaching out to Mahakumbh Tours & Travels Nashik.<br /><br />
              I couldn't find a direct automated answer to your exact question. For custom pricing, hotel availability sheets, and group discounts, please message our main help desk directly:<br /><br />
            `;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "An error occurred locally. Please tap the WhatsApp button below." }, { status: 500 });
  }
}