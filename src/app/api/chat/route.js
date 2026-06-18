import { NextResponse } from "next/server";
import stringSimilarity from "string-similarity";

// 1. Define your exhaustive, professional Kumbh Mela knowledge base matrix
const KNOWLEDGE_BASE = [
    {
        inputs: ["what is kumbha mela", "history of kumbh", "significance", "why is it celebrated", "itihas"],
        reply: `<b>🕉️ Simhastha Kumbh Mela History & Significance:</b><br />
            • Drops of divine Amrit fell into the Godavari River during the ancient Samudra Manthan.<br />
            • Bathing here is believed to cleanse sins and grant Moksha (spiritual liberation).<br />
            • It occurs once every 12 years when Jupiter enters Leo (Simha rashi).<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">💬 Connect on WhatsApp</a>`
    },
    {
        inputs: ["shahi snan dates 2027", "dates", "when is kumbh mela", "calendar", "snan date"],
        reply: `<b>📅 Official Shahi Snan Dates 2027:</b><br />
            • <b>Flag Hoisting:</b> 24 July 2027 (Mela Begins)<br />
            • <b>1st Shahi Snan:</b> 02 August 2027<br />
            • <b>2nd Shahi Snan:</b> 31 August 2027<br />
            • <b>3rd Snan (Nashik Ramkund):</b> 11 Sept 2027<br />
            • <b>3rd Snan (Trimbakeshwar):</b> 12 Sept 2027<br />
            • <b>Mouni Amavasya:</b> 26 Jan 2028<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">📅 Save Dates on WhatsApp</a>`
    },
    {
        inputs: ["how to reach nashik", "reach", "airport", "train station", "bus", "transportation"],
        reply: `<b>✈️ How to Reach Nashik Comfortably:</b><br />
            • <b>By Train:</b> Nashik Road Railway Station (NK) has 24/7 connectivity across India.<br />
            • <b>By Air:</b> Nashik Ozar Airport (ISK) is 20 km from the city. Mumbai International Airport (BOM) is 170 km away.<br />
            • <b>By Road:</b> Beautifully connected via the Mumbai-Nashik Expressway (NH-160).<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🚗 Book Station/Airport Pickup Cabs</a>`
    },
    {
        inputs: ["tour package", "packages", "1 day trip", "3 day package", "darshan tour itinerary"],
        reply: `<b>🏆 Bestselling Spiritual Tour Packages:</b><br />
            • <b>1-Day Tour:</b> Covers Panchavati, Ramkund, Kalaram Temple, and Trimbakeshwar Jyotirlinga.<br />
            • <b>2-Day Tour:</b> Adds Shirdi Sai Baba & Shani Shingnapur Darshan arrangements.<br />
            • <b>3-Day Complete Yatra:</b> Includes specialized VIP Darshan support at Trimbakeshwar and comfortable stay options.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🗺️ Request Personalized Custom Itinerary</a>`
    },
    {
        inputs: ["car rental", "taxi", "cab booking", "hire car", "vehicle fleet pricing"],
        reply: `<b>🚗 Premium Fleet Rental Options & Rates:</b><br />
            All vehicle configurations include professional local drivers:<br />
            • <b>Sedans (Swift Dzire / Etios):</b> Best for nuclear families.<br />
            • <b>SUVs (Innova Crysta / Ertiga):</b> Maximum group comfort tracking.<br />
            • <b>Tempo Travellers:</b> 17 & 26-seater layouts for large extended family groups.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🚕 Get Instant Fleet Rates on WhatsApp</a>`
    },
    {
        inputs: ["hotel stay", "accommodation", "where to stay", "dharamshala", "room booking"],
        reply: `<b>🏨 Curated Accommodation Stay Options:</b><br />
            • <b>Budget Rooms:</b> Family-safe properties near Ramkund starting under ₹2,000.<br />
            • <b>Luxury Resorts:</b> Premium 4-star and 5-star properties across Nashik City.<br />
            • <b>Kumbh Tent Cities:</b> Traditional premium stays closer to main Shahi Snan venues.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🏨 Check Room Availability Now</a>`
    },
    {
        inputs: ["what is nashik mahakumbh 2027", "mahakumbh 2027 basics", "simhastha kumbh mela", "what is kumbha"],
        reply: `<b>🕉️ Mahakumbh 2027 Basics:</b><br />
            Nashik Mahakumbh (Simhastha Kumbh) is one of the world's largest Hindu spiritual gatherings, held every 12 years on the banks of the Godavari River in Nashik and Trimbakeshwar. Millions of devotees visit for holy bathing, prayers, and spiritual activities.<br />
            • <b>Simhastha Significance:</b> It occurs when Jupiter enters Leo (Simha Rashi), making Nashik the holy host city.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">💬 Plan Your Kumbh Yatra over WhatsApp</a>`
    },
    {
        inputs: ["when will nashik mahakumbh 2027 take place", "kumbh mela dates", "amrit snan dates 2027", "shahi snan date"],
        reply: `<b>📅 Official Mahakumbh 2027 Timings & Auspicious Snan Dates:</b><br />
            The broader Simhastha cycle officially runs from October 2026 to July 2028. The main highly auspicious <b>Amrit Snan Dates</b> are:<br />
            • <b>02 August 2027</b><br />
            • <b>31 August 2027</b><br />
            • <b>11–12 September 2027</b><br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">📅 Get Free Snan Itinerary on WhatsApp</a>`
    },
    {
        inputs: ["why is kumbh mela held in nashik", "history of kumbh", "story of amrit", "reason for holding"],
        reply: `<b>🛕 Why Kumbh is Held Here:</b><br />
            According to sacred Hindu mythology, drops of <b>Amrit</b> (the divine nectar of immortality) fell at Nashik during the cosmic Samudra Manthan, making the Godavari River an incredibly powerful site for spiritual purification and clearing ancestral sins.`
    },
    {
        inputs: ["where can i take a holy dip", "amrit snan location", "bathing mandatory", "what should i wear during snan", "women facilities"],
        reply: `<b>🌊 Holy Bathing Guide & Logistics:</b><br />
            • <b>Main Bathing Locations:</b> Ramkund in Nashik (for Vaishnava Sadhus) and Kushavarta Kund in Trimbakeshwar (for Shaiva Naga Sadhus).<br />
            • <b>Is it Mandatory?</b> No, pilgrims can participate completely in prayers, temple visits, and discourses without taking a dip.<br />
            • <b>Attire:</b> Modest traditional clothing suitable for bathing and public rituals.<br />
            • <b>Women Facilities:</b> Government authorities are actively deploying changing rooms and dedicated closed facilities for safety.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">💬 Check Special Bathing Packages</a>`
    },
    {
        inputs: ["special about trimbakeshwar temple", "rituals performed at trimbakeshwar", "temple timings", "rudrabhishek", "kalsarp shanti"],
        reply: `<b>🔱 Holy Trimbakeshwar Jyotirlinga Temple:</b><br />
            It is one of the 12 sacred Jyotirlingas of Lord Shiva and contains three lingas representing Brahma, Vishnu, and Mahesh.<br />
            • <b>Sacred Rituals Conducted:</b> Rudrabhishek, Narayan Nagbali, Kalsarp Shanti, and Mahamrityunjaya Jaap.<br />
            • <b>Timings:</b> Generally early morning to evening (timings extend during peak Kumbh event days). Non-Hindus may face restricted access to the inner sanctum.`
    },
    {
        inputs: ["panchavati", "ramkund", "sita gufa", "kapaleshwar temple", "how much time is needed to explore panchavati"],
        reply: `<b>🏞️ Panchavati & Ramayana Holy Sites:</b><br />
            Panchavati is the legendary sacred forested area where Lord Rama, Sita Mata, and Lakshmana stayed during their exile period.<br />
            • <b>Key Places to See:</b> Ramkund (sacred ghat pond), Sita Gufa (holy cave), and Kapaleshwar Temple.<br />
            • <b>Time Needed:</b> Roughly <b>3 to 5 hours</b> to comfortably explore all locations.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🚗 Book a Panchavati Sightseeing Tour Cab</a>`
    },
    {
        inputs: ["how can i reach nashik", "nearest railway station", "airport serves nashik", "bus service available", "drive my own car"],
        reply: `<b>✈️ Nashik Connectivity & Travel Logistics:</b><br />
            • <b>By Train:</b> Nashik Road Railway Station (NK) is heavily connected to major cities across India.<br />
            • <b>By Air:</b> Ozar Airport (Nashik Airport) is 20 km away for domestic flights. Mumbai International Airport (BOM) is 170 km away.<br />
            • <b>By Road/Bus:</b> Frequent MSRTC government and private buses operate. Private cars are welcome, but note that traffic restrictions apply on peak Shahi Snan days.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🚕 Rent a Cab with Station / Airport Pickup</a>`
    },
    {
        inputs: ["where can i stay during kumbh", "budget accommodations", "luxury hotels", "advance booking"],
        reply: `<b>🏨 Accommodation & Stay Information:</b><br />
            Stays range from Budget Hotels and Dharamshalas to premium Ashrams, Guest Houses, and temporary Luxury Tent Cities.<br />
            • <b>Advance Booking:</b> It is highly recommended to book accommodation <b>several months in advance</b> before peak bathing dates to secure stable rates and clean configurations.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🏨 Query Live Room Availability Sheets</a>`
    },
    {
        inputs: ["famous food in nashik", "pure vegetarian food", "jain meals", "bhandara", "free food"],
        reply: `<b>🍽️ Local Food & Catering Facilities:</b><br />
            • <b>Famous Dishes:</b> Misal Pav, Vada Pav, Sabudana Khichdi, and Puran Poli.<br />
            • <b>Dietary Stances:</b> Pure vegetarian and Jain meals are extensively available around all pilgrimage ghat zones.<br />
            • <b>Bhandaras:</b> Numerous religious organizations provide clean, free food distribution (Bhandara) daily during the Mahakumbh.`
    },
    {
        inputs: ["how far is shirdi from nashik", "shirdi sai baba temple"],
        reply: `<b>🛕 Shirdi Sai Baba Temple Tour:</b><br />
            Shirdi is approximately <b>90 km</b> from Nashik. Travel options include private taxis, cars, or MSRTC buses. The journey takes around <b>2 to 2.5 hours</b>.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🚗 Book a 1-Day Nashik to Shirdi Cab Package</a>`
    },
    {
        inputs: ["how far is trimbakeshwar temple from nashik", "distance to trimbak"],
        reply: `<b>🚗 Trimbakeshwar Distance:</b><br />
            Trimbakeshwar is exactly <b>28 km</b> from Nashik city. Buses, taxis, and auto-rickshaws are easily accessible. The typical travel time is around <b>45 to 60 minutes</b>.`
    },
    {
        inputs: ["how far is saptashrungi devi temple from nashik", "saptashrungi temple distance"],
        reply: `<b>🛕 Saptashrungi Devi Temple (Vani):</b><br />
            Located approximately <b>60 km</b> from Nashik. Traveling by bus or private vehicle takes about <b>1.5 to 2 hours</b> to reach the base of this sacred hill shrine.`
    },
    {
        inputs: ["how far is shani shingnapur from nashik", "shani shingnapur distance"],
        reply: `<b>🛕 Shani Shingnapur Travel:</b><br />
            Shani Shingnapur is around <b>75 km</b> from Nashik. Taxis and private vehicles are widely available, taking approximately <b>2 hours</b> of transit time.`
    },
    {
        inputs: ["how far is bhima shankar temple from nashik", "bhimashankar jyotirlinga"],
        reply: `<b>🔱 Bhimashankar Jyotirlinga Tour:</b><br />
            Bhimashankar is about <b>210 km</b> from Nashik. Private outstation cabs take around <b>5 to 6 hours</b> of travel time along scenic regional routes.`
    },
    {
        inputs: ["how far is grishneshwar temple from nashik", "grishneshwar jyotirlinga", "ellora caves", "ajanta caves"],
        reply: `<b>🔱 Grishneshwar Jyotirlinga & Caves Tour:</b><br />
            • <b>Grishneshwar Temple:</b> Approximately 180 km from Nashik (4–5 hours via cab).<br />
            • <b>Ellora Caves:</b> Around 175 km away (4 hours drive time).<br />
            • <b>Ajanta Caves:</b> Roughly 270 km away (6 hours drive time).<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🦚 Request 2-Jyotirlinga & Caves Custom Itinerary</a>`
    },
    {
        inputs: ["how far is pandharpur from nashik", "kolhapur mahalaxmi temple", "pune", "mumbai"],
        reply: `<b>🚗 Outer Maharashtra Transit Distances from Nashik:</b><br />
            • <b>Mumbai:</b> 170 km (3–4 hours via highway NH-160).<br />
            • <b>Pune:</b> 210 km (4–5 hours via regular bus/cab routes).<br />
            • <b>Pandharpur Vitthal Temple:</b> 340 km (7–8 hours travel time).<br />
            • <b>Kolhapur Mahalaxmi Temple:</b> 430 km (8–9 hours travel time).`
    },
    {
        inputs: ["how many days is this tour package", "can the tour duration be customized", "private tour"],
        reply: `<b>🗺️ Tour Packaging & Dynamic Customization:</b><br />
            Our packages range from 1-day local exploration options to comprehensive 15-to-20-day complete Indian 12 Jyotirlinga Yatras.<br />
            • <b>Can it be Customized?</b> Yes! All parameters can be fully tailored to match your specific preferences, group size, and train/flight schedules.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">💬 Connect Live to Customize Your Private Tour</a>`
    },
    {
        inputs: ["what vehicles are available for the tour", "suitable for a family trip", "suitable for large groups", "experienced drivers", "pickup and drop service"],
        reply: `<b>🚕 Fleet Inventory & Car Rental Facilities:</b><br />
            We manage a comprehensive fleet clean-sanitized for family and senior citizen comfort, including professional drivers familiar with pilgrimage sites:<br />
            • <b>Families (4–6 members):</b> Sedan Cars, Swift Dzire, Toyota Etios, Ertiga, or Innova Crysta.<br />
            • <b>Large Groups:</b> 17/26 Seater AC Tempo Travellers, Mini Buses, and Luxury Coaches.<br />
            • <b>Service Scope:</b> Direct pickup and drop-off assistance from your hotels, airports, or railway stations.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🚕 Get Instant Fleet Car Rental Pricing</a>`
    },
    {
        inputs: ["hotel accommodation included", "type of hotels", "family rooms", "hot water", "near temples"],
        reply: `<b>🏨 Integrated Hotel Services:</b><br />
            • <b>Hotel Inclusions:</b> Accommodation options can be directly bundled into your transport plan.<br />
            • <b>Tiers Offered:</b> Clean Budget, Standard, Deluxe, and Premium properties equipped with hot water and basic amenities.<br />
            • <b>Location Policy:</b> Rooms are booked as close as possible to major temple entry zones to reduce travel fatigue for senior citizens.`
    },
    {
        inputs: ["ashtavinayak tour package for 3 days", "8 sacred ganpati temples"],
        reply: `<b>🦚 Holy Ashtavinayak Yatra (3-Day Pilgrimage):</b><br />
            Covers all 8 sacred Swayambhu Ganpati temples of Maharashtra across Morgaon, Siddhatek, Pali, Mahad, Theur, Lenyadri, Ozar, and Ranjangaon.<br />
            • Includes private comfortable AC vehicle configurations, local staging, and hotel stay arrangements.<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🦚 Book Ashtavinayak Package Over WhatsApp</a>`
    },
    {
        inputs: ["nashik shirdi trimbakeshwar tour", "2 jyotirlinga tour package", "3 jyotirlinga tour package for 4 days", "5 jyotirlinga pilgrimage in maharashtra", "12 jyotirlinga yatra", "sade tin shakti peeth tour package", "akkalkot shegaon pandharpur tour"],
        reply: `<b>🏆 Special Multi-Day Pilgrimage Catalog:</b><br />
            • <b>Nashik-Shirdi-Trimbak:</b> 2 to 3 Days classic circle path.<br />
            • <b>2-Jyotirlinga Package:</b> 2 to 3 Days covering Trimbak, Grishneshwar & Ellora Caves.<br />
            • <b>3-Jyotirlinga Package:</b> 4 Days covering Trimbak, Grishneshwar, and Parli Vaijnath.<br />
            • <b>5-Jyotirlinga Maharashtra Package:</b> 5 to 6 Days covering all 5 state lingas.<br />
            • <b>Sade Tin Shakti Peeth Yatra:</b> 4 to 5 Days covering Kolhapur, Tuljapur, Mahur, and Saptashrungi.<br />
            • <b>Akkalkot-Shegaon-Pandharpur:</b> 4 Days (Swami Samarth, Gajanan Maharaj, and Vitthal Darshan).<br /><br />
            <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🗺️ Request Customized Package Rates</a>`
    },
    {
        inputs: ["emergency number", "what should i do if i get lost", "medical facilities", "lost and found", "solo travellers"],
        reply: `<b>🚑 Safety, Lost-and-Found, & Emergency Support:</b><br />
            • <b>Emergency Helpline:</b> Dial <b>112</b> for instant local assistance.<br />
            • <b>Medical Care:</b> 24/7 temporary medical camps and permanent hospital booths operate across the entire Mahakumbh area.<br />
            • <b>If You Get Lost:</b> Go directly to the nearest police booth or help center. Public announcement systems and dedicated lost-and-found centers run constantly to reunite groups.<br />
            • Nashik is safe for solo travelers; please adhere to official security advisories.`
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
              <a class="kumbh-whatsapp-btn" href="https://wa.me/91YOURNUMBER" target="_blank">🕉️ Connect Live via WhatsApp Support</a>`;
        }

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json({ reply: "An error occurred locally. Please tap the WhatsApp button below." }, { status: 500 });
    }
}