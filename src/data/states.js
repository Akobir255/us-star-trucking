// src/data/states.js
// Data for state SEO pages. Each state gets unique content —
// intro, popular routes, cities, and FAQs — so pages don't look
// like duplicates to Google.

export const STATES = [
  {
    slug: "california",
sections: [
      {
        h: "Shipping to California: what to expect",
        p: "California sits on three of the nation's busiest transport corridors — I-5 up the coast, I-10 from the South, and I-80 from the East — so carriers pass through daily and pickup windows in metro areas are among the shortest in the country. Los Angeles, the Bay Area, and San Diego are high-density markets where open carriers are almost always available within a few days. If you're shipping to a mountain town, the far north, or a coastal area with tight roads, expect the carrier to arrange a meeting point at the nearest highway exit or large parking lot.",
      },
      {
        h: "Pricing patterns for California routes",
        p: "Because so many vehicles move in and out of California, competition keeps rates reasonable year-round. Prices tick up in late summer when families relocate before the school year, and enclosed transport is in higher demand here than almost anywhere else thanks to the concentration of luxury and classic vehicles heading to shows, auctions, and collectors. Booking a week or two ahead usually gets you the best combination of price and pickup speed.",
      },
    ],
    name: "California",
    abbr: "CA",
    intro:
      "California is the busiest auto transport market in the country. Whether you're relocating to Los Angeles, buying a car from a San Francisco dealer, or sending a vehicle to college in San Diego, carriers run California routes daily — which means competitive prices and fast pickup windows, often within 1-3 days.",
    cities: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Fresno"],
    routes: [
      { from: "Los Angeles, CA", to: "Dallas, TX", miles: "~1,440", days: "3-5" },
      { from: "San Francisco, CA", to: "New York, NY", miles: "~2,900", days: "7-10" },
      { from: "San Diego, CA", to: "Phoenix, AZ", miles: "~360", days: "1-2" },
      { from: "Sacramento, CA", to: "Seattle, WA", miles: "~750", days: "2-3" },
    ],
    faqs: [
      {
        q: "How much does it cost to ship a car to California?",
        a: "Cross-country routes to California typically range from $900 to $1,500 for a sedan on open transport, depending on distance, season, and vehicle size. Shorter regional routes cost much less. Use our instant quote calculator for an exact estimate.",
      },
      {
        q: "How long does car shipping to California take?",
        a: "From the East Coast, expect 7-10 days. From Texas or the Midwest, 3-6 days. Regional West Coast routes are often completed in 1-3 days.",
      },
      {
        q: "Do you ship cars to all California cities?",
        a: "Yes — we provide door-to-door service throughout California, including Los Angeles, San Francisco, San Diego, Sacramento, and smaller towns, as long as your street is safely accessible for the carrier.",
      },
    ],
  },
  {
    slug: "florida",
sections: [
      {
        h: "Snowbird season changes everything",
        p: "Florida's transport market swings harder with the seasons than any other state. From October through January, southbound capacity on I-95 and I-75 fills with snowbird vehicles and prices rise accordingly; the reverse happens in March through May when everyone heads north. If your dates are flexible, shipping a few weeks before or after the rush can save real money. If they aren't, booking 2-3 weeks ahead locks in a carrier before the corridor fills up.",
      },
      {
        h: "Weather and delivery logistics in Florida",
        p: "June through November is hurricane season, and while shipments are rarely cancelled, a named storm can pause pickups and deliveries for a few days while carriers reroute — we watch forecasts and keep you informed. Delivery itself is easy across most of the state: Florida's flat terrain and dense highway network mean true door-to-door service is possible in nearly every neighborhood, from Miami high-rises (where we'll coordinate a nearby meeting spot) to gated golf communities around Naples and The Villages.",
      },
    ],
    name: "Florida",
    abbr: "FL",
    intro:
      "Florida is the snowbird capital of America — every fall thousands of vehicles head south to Miami, Tampa, and Orlando, then back north in spring. That heavy traffic makes Florida one of the most affordable states to ship to, with carriers available year-round and extra capacity on the I-95 corridor.",
    cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "Naples"],
    routes: [
      { from: "New York, NY", to: "Miami, FL", miles: "~1,280", days: "3-5" },
      { from: "Chicago, IL", to: "Orlando, FL", miles: "~1,160", days: "3-5" },
      { from: "Boston, MA", to: "Tampa, FL", miles: "~1,350", days: "3-5" },
      { from: "Los Angeles, CA", to: "Jacksonville, FL", miles: "~2,400", days: "6-9" },
    ],
    faqs: [
      {
        q: "When is the cheapest time to ship a car to Florida?",
        a: "Prices are lowest in late spring and summer, when snowbird demand is gone. October through January is peak season for southbound routes — book 2-3 weeks ahead for the best rates during those months.",
      },
      {
        q: "Do you offer snowbird car shipping to Florida?",
        a: "Yes — seasonal relocation is one of our most popular services. Many customers ship with us south in fall and north in spring, and returning customers save $100 with code USSTAR100.",
      },
      {
        q: "How long does it take to ship a car from the Northeast to Florida?",
        a: "The I-95 corridor is one of the fastest routes in the country — most Northeast-to-Florida shipments are delivered in 3-5 days.",
      },
    ],
  },
  {
    slug: "texas",
sections: [
      {
        h: "The Texas Triangle keeps rates competitive",
        p: "Most Texas shipments touch the triangle formed by Dallas-Fort Worth, Houston, and San Antonio/Austin — one of the highest-volume transport regions in America. Carriers circulate through it constantly, which means fast pickup and sharp pricing for any route connecting these metros to the rest of the country. I-35, I-45, I-10, and I-20 all funnel through the state, so Texas works as a natural waypoint on cross-country routes too.",
      },
      {
        h: "Shipping to smaller Texas towns",
        p: "Texas is enormous, and rates reflect geography: a delivery in the DFW suburbs costs meaningfully less than one in the Panhandle or far West Texas, where a carrier may need to detour hours off its route. For rural addresses we'll often suggest meeting in the nearest sizable town — it can shave days off your wait and dollars off your quote. Oil-field and ranch deliveries with unpaved access roads are handled the same way, at the closest safe paved location.",
      },
    ],
    name: "Texas",
    abbr: "TX",
    intro:
      "Everything is bigger in Texas — including the auto transport network. Dallas, Houston, Austin, and San Antonio form one of the densest carrier corridors in the U.S., so pickup is fast and pricing stays competitive. Texas is also a major hub for cross-country routes, connecting both coasts.",
    cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
    routes: [
      { from: "Houston, TX", to: "Los Angeles, CA", miles: "~1,550", days: "4-6" },
      { from: "Dallas, TX", to: "Chicago, IL", miles: "~970", days: "2-4" },
      { from: "Austin, TX", to: "Miami, FL", miles: "~1,350", days: "3-5" },
      { from: "San Antonio, TX", to: "Denver, CO", miles: "~950", days: "2-4" },
    ],
    faqs: [
      {
        q: "How much does it cost to ship a car to Texas?",
        a: "Regional routes into Texas often run $400-$800, while coast-to-Texas shipments typically range from $900 to $1,300 for a standard sedan on open transport. Get an exact price with our free quote tool.",
      },
      {
        q: "Can you pick up my car anywhere in Texas?",
        a: "Yes — we cover the entire state door-to-door, from the big metros to West Texas and the Panhandle. Rural pickups may add a day or two to scheduling.",
      },
      {
        q: "Is open or enclosed transport better for Texas?",
        a: "Open transport is the affordable standard and fine for most vehicles. For luxury or classic cars — or summer hail season — enclosed transport adds full protection for roughly 30% more.",
      },
    ],
  },
  {
    slug: "new-york",
sections: [
      {
        h: "Shipping into New York City is different",
        p: "Full-size car carriers are 75+ feet long and simply can't navigate much of Manhattan, Brooklyn's brownstone blocks, or many parking-restricted streets in Queens and the Bronx. For NYC deliveries, drivers typically arrange to meet at a nearby accessible spot — a shopping center lot, a wide commercial street, or just across a bridge — and we coordinate the exact location with you in advance. Deliveries to Long Island, Westchester, and New Jersey suburbs are usually true door-to-door.",
      },
      {
        h: "Upstate New York routes",
        p: "Upstate destinations like Albany, Syracuse, Rochester, and Buffalo ride the I-90 corridor and price differently from the city — often cheaper per mile in summer, with winter lake-effect snow occasionally adding a day or two between November and March. The I-95 corridor between New York and Florida is one of the busiest in the nation, which makes NY-FL among the most affordable long-distance routes we arrange, especially outside snowbird season.",
      },
    ],
    name: "New York",
    abbr: "NY",
    intro:
      "Shipping a car to or from New York takes local know-how — narrow Manhattan streets, parking restrictions, and busy boroughs mean carriers often meet you at an agreed accessible spot nearby. The good news: New York sits on the country's busiest transport corridor, so rates are sharp and departures are daily.",
    cities: ["New York City", "Brooklyn", "Buffalo", "Rochester", "Albany", "Syracuse"],
    routes: [
      { from: "New York, NY", to: "Miami, FL", miles: "~1,280", days: "3-5" },
      { from: "New York, NY", to: "Los Angeles, CA", miles: "~2,800", days: "7-10" },
      { from: "Buffalo, NY", to: "Chicago, IL", miles: "~530", days: "1-3" },
      { from: "Albany, NY", to: "Atlanta, GA", miles: "~1,000", days: "2-4" },
    ],
    faqs: [
      {
        q: "Can a car carrier pick up in Manhattan?",
        a: "Large carriers usually can't navigate Manhattan streets. Our drivers arrange a nearby accessible meeting point — often just across a bridge or at a wide commercial street — at no extra cost.",
      },
      {
        q: "How long does it take to ship a car from New York to California?",
        a: "Coast-to-coast from New York typically takes 7-10 days door to door.",
      },
      {
        q: "Do you ship cars to upstate New York?",
        a: "Yes — Buffalo, Rochester, Syracuse, Albany, and everywhere in between, with door-to-door service on all accessible roads.",
      },
    ],
  },
  {
    slug: "arizona",
sections: [
      {
        h: "Winter visitor season drives Arizona demand",
        p: "Arizona is the Southwest's snowbird hub: every fall, vehicles pour into Phoenix, Scottsdale, Mesa, and Tucson from the Midwest and Canada, then head home in spring. Like Florida, that means southbound rates rise in October-December and northbound rates rise in March-May. The I-10 and I-40 corridors keep carriers flowing through the state year-round, so even in peak season pickup windows stay reasonable if you book ahead.",
      },
      {
        h: "Shipping in desert heat",
        p: "Summer transport to Arizona is routine for carriers, but triple-digit heat is worth planning around: make sure your battery is healthy and tires are properly inflated before pickup, since heat exposes weak batteries, and don't leave aerosols, electronics, or anything meltable in the vehicle. Flagstaff and the high country are the exception to Arizona's easy weather — winter snow on I-17 and I-40 can occasionally slow northern Arizona deliveries.",
      },
    ],
    name: "Arizona",
    abbr: "AZ",
    intro:
      "Arizona's mix of retirees, seasonal residents, and a booming Phoenix metro keeps auto transport in constant motion. Routes to Southern California, Texas, and the Midwest run frequently, and the state's dry climate makes open transport an easy choice for most vehicles.",
    cities: ["Phoenix", "Tucson", "Scottsdale", "Mesa", "Flagstaff", "Yuma"],
    routes: [
      { from: "Phoenix, AZ", to: "Los Angeles, CA", miles: "~370", days: "1-2" },
      { from: "Phoenix, AZ", to: "Chicago, IL", miles: "~1,750", days: "4-7" },
      { from: "Tucson, AZ", to: "Dallas, TX", miles: "~930", days: "2-4" },
      { from: "Scottsdale, AZ", to: "Seattle, WA", miles: "~1,450", days: "3-6" },
    ],
    faqs: [
      {
        q: "How much is car shipping from Arizona to California?",
        a: "Phoenix to Los Angeles is one of the most affordable routes in the country — often $300-$500 for a sedan on open transport, with delivery in 1-2 days.",
      },
      {
        q: "Is it safe to ship a car through the Arizona heat?",
        a: "Yes — vehicles aren't driven during transport, and carriers routinely handle desert routes. For classic cars with sensitive paint or interiors, enclosed transport offers extra protection.",
      },
      {
        q: "Do you serve winter visitors in Arizona?",
        a: "Absolutely — seasonal shipping into Phoenix, Scottsdale, and Tucson each winter is one of our core routes, and returning customers save with code USSTAR100.",
      },
    ],
  },
  {
    slug: "georgia",
sections: [
      {
        h: "Atlanta is the Southeast's transport hub",
        p: "Three major interstates — I-75, I-85, and I-20 — converge on Atlanta, making it one of the best-connected cities in the country for auto transport. Carriers heading between the Northeast, Florida, Texas, and the Midwest all pass through, so metro Atlanta pickups are often arranged within 1-2 days and rates stay competitive year-round. Suburbs from Marietta to Alpharetta to Decatur get true door-to-door service.",
      },
      {
        h: "Beyond Atlanta: Savannah, Augusta, and the coast",
        p: "The Port of Savannah is one of America's busiest vehicle ports, and we regularly arrange transport for cars arriving from overseas or heading to coastal Georgia. Savannah, Augusta, Columbus, and Macon all sit on solid carrier routes, though pickup windows run a day or two longer than Atlanta's. Military moves to Fort Eisenhower and Fort Stewart are common on our schedule — ask about our military discount when you book.",
      },
    ],
    name: "Georgia",
    abbr: "GA",
    intro:
      "Atlanta is the transport crossroads of the Southeast — nearly every carrier running the I-75, I-85, or I-20 corridors passes through it. That makes Georgia one of the easiest states for fast pickup and delivery, whether you're moving to the metro area or shipping to the coast in Savannah.",
    cities: ["Atlanta", "Savannah", "Augusta", "Columbus", "Macon", "Athens"],
    routes: [
      { from: "Atlanta, GA", to: "New York, NY", miles: "~880", days: "2-4" },
      { from: "Atlanta, GA", to: "Miami, FL", miles: "~660", days: "1-3" },
      { from: "Savannah, GA", to: "Dallas, TX", miles: "~1,000", days: "2-4" },
      { from: "Atlanta, GA", to: "Los Angeles, CA", miles: "~2,180", days: "5-8" },
    ],
    faqs: [
      {
        q: "How fast can you pick up a car in Atlanta?",
        a: "Because Atlanta is a major carrier hub, pickup within 1-2 days of booking is common on most routes.",
      },
      {
        q: "How much does it cost to ship a car from Georgia to the Northeast?",
        a: "Atlanta to the New York area typically runs $600-$900 for a sedan on open transport, delivered in 2-4 days.",
      },
      {
        q: "Do you ship military vehicles to Georgia bases?",
        a: "Yes — we regularly serve relocating service members around Fort Moore, Fort Eisenhower, and Fort Stewart, with door-to-door or nearby-point delivery.",
      },
    ],
  },
  {
    slug: "north-carolina",
sections: [
      {
        h: "Military moves are a North Carolina specialty",
        p: "With Fort Liberty (formerly Fort Bragg), Camp Lejeune, Seymour Johnson AFB, and Cherry Point all in-state, North Carolina sees constant PCS vehicle traffic. We work these routes regularly, understand PCS timelines, and can coordinate pickup around report dates. If you're an active-duty family, mention it when you book — military shipments get discounted rates.",
      },
      {
        h: "From the Research Triangle to the mountains",
        p: "Charlotte and the Raleigh-Durham triangle are two of the fastest-growing metros in the country, and both sit on strong I-85/I-40 carrier routes with quick pickup windows. Heading west, deliveries to Asheville and the Blue Ridge mountains take a little more planning — steep, winding roads mean carriers often meet customers along I-26 or I-40 rather than at the door. Coastal deliveries to Wilmington and the Outer Banks are seasonal, with summer beach traffic occasionally adding a day.",
      },
    ],
    name: "North Carolina",
    abbr: "NC",
    intro:
      "North Carolina's fast-growing Charlotte and Raleigh metros — plus military traffic around Fort Liberty — keep transport carriers busy across the state. Sitting right on the I-95 and I-85 corridors, North Carolina enjoys quick connections both north to the big Northeast cities and south to Florida.",
    cities: ["Charlotte", "Raleigh", "Durham", "Greensboro", "Wilmington", "Asheville"],
    routes: [
      { from: "Charlotte, NC", to: "New York, NY", miles: "~640", days: "1-3" },
      { from: "Raleigh, NC", to: "Miami, FL", miles: "~820", days: "2-4" },
      { from: "Charlotte, NC", to: "Dallas, TX", miles: "~1,020", days: "2-4" },
      { from: "Wilmington, NC", to: "Chicago, IL", miles: "~900", days: "2-4" },
    ],
    faqs: [
      {
        q: "How much does car shipping to North Carolina cost?",
        a: "East Coast routes into North Carolina often run $500-$800 for a sedan on open transport; cross-country from the West Coast typically ranges $1,000-$1,400.",
      },
      {
        q: "Do you deliver to the North Carolina mountains?",
        a: "Yes — Asheville and surrounding mountain towns are fully served. Some steep or narrow roads may require meeting the carrier at a nearby accessible point.",
      },
      {
        q: "Do you offer military discounts for Fort Liberty moves?",
        a: "We regularly work with relocating service members — call us at (865) 722-7114 and ask about current promotions, or use code USSTAR50 on your first shipment.",
      },
    ],
  },
  {
    slug: "illinois",
sections: [
      {
        h: "Chicago: the crossroads of American auto transport",
        p: "More long-haul carrier routes pass through Chicago than almost any other city — I-80, I-90, I-55, I-57, and I-94 all converge here. That density means excellent availability and some of the Midwest's best rates for shipments in or out of Chicagoland. City deliveries follow the same rule as other dense urban areas: for narrow streets in neighborhoods like Lincoln Park or Wicker Park, drivers arrange a nearby meeting point, while suburban deliveries are door-to-door.",
      },
      {
        h: "Winter shipping in Illinois",
        p: "December through February, lake-effect snow and ice storms can add a day or two to pickup and transit windows — carriers won't load or unload in unsafe conditions, and we'd rather your car arrive a day late than damaged. Rates often dip slightly in deep winter since demand falls, making it a good time to ship if your schedule is flexible. Downstate destinations like Springfield, Champaign, and Peoria ride the I-55/I-57 corridors with steady year-round service.",
      },
    ],
    name: "Illinois",
    abbr: "IL",
    intro:
      "Chicago is the Midwest's transport engine — a hub where east-west and north-south carrier routes intersect. Shipping a car to or from Illinois is straightforward year-round, though winter weather can add a buffer day. Routes to both coasts, Texas, and Florida depart almost daily.",
    cities: ["Chicago", "Aurora", "Naperville", "Springfield", "Peoria", "Rockford"],
    routes: [
      { from: "Chicago, IL", to: "Orlando, FL", miles: "~1,160", days: "3-5" },
      { from: "Chicago, IL", to: "Los Angeles, CA", miles: "~2,000", days: "5-8" },
      { from: "Chicago, IL", to: "New York, NY", miles: "~790", days: "2-4" },
      { from: "Springfield, IL", to: "Phoenix, AZ", miles: "~1,500", days: "4-6" },
    ],
    faqs: [
      {
        q: "Can you ship my car out of Chicago in winter?",
        a: "Yes — carriers run Chicago routes all winter. Heavy snowstorms occasionally add a day to pickup or delivery windows, and we keep you updated throughout.",
      },
      {
        q: "How much is car shipping from Illinois to Florida?",
        a: "Chicago to Florida typically costs $700-$1,000 for a sedan on open transport, delivered in 3-5 days — a popular route for snowbirds and students.",
      },
      {
        q: "Do you serve downstate Illinois?",
        a: "Yes — Springfield, Peoria, Champaign, and rural areas are all covered with door-to-door service on accessible roads.",
      },
    ],
  },
  {
    slug: "washington",
sections: [
      {
        h: "The I-5 corridor and mountain passes",
        p: "Nearly all Washington shipments flow through the I-5 corridor connecting Seattle, Tacoma, and Portland — a dense, well-served route with fast pickup in the Puget Sound metro. Eastbound shipments cross the Cascades on I-90 through Snoqualmie Pass, which is routine most of the year but can see chain requirements and delays during winter storms; November through March, build an extra day into your plans for east-west routes.",
      },
      {
        h: "Military, tech, and island logistics",
        p: "Joint Base Lewis-McChord generates steady PCS traffic, and we handle those moves with military discounts and report-date coordination. Tech relocations into Seattle and Bellevue are equally common — for dense downtown addresses, drivers typically meet at an accessible lot nearby. Destinations on the Olympic Peninsula or the islands take extra planning since carriers don't board ferries; we'll arrange delivery to the nearest mainland point, such as Everett or Anacortes.",
      },
    ],
    name: "Washington",
    abbr: "WA",
    intro:
      "The Pacific Northwest's tech-driven growth keeps vehicles moving in and out of Seattle constantly. Washington routes connect down the I-5 corridor to Oregon and California and east across I-90 to the Midwest. It's a longer haul from the East Coast, so planning a few extra days pays off.",
    cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Olympia"],
    routes: [
      { from: "Seattle, WA", to: "Los Angeles, CA", miles: "~1,140", days: "3-5" },
      { from: "Seattle, WA", to: "Chicago, IL", miles: "~2,060", days: "5-8" },
      { from: "Spokane, WA", to: "Denver, CO", miles: "~1,100", days: "3-5" },
      { from: "Tacoma, WA", to: "Phoenix, AZ", miles: "~1,500", days: "4-6" },
    ],
    faqs: [
      {
        q: "How long does it take to ship a car from the East Coast to Washington?",
        a: "New York to Seattle is one of the longest routes in the country — plan for 8-11 days door to door.",
      },
      {
        q: "How much does car shipping to Seattle cost?",
        a: "West Coast routes into Seattle typically run $600-$900; cross-country shipments from the East Coast range from $1,300 to $1,700 for a sedan on open transport.",
      },
      {
        q: "Do you ship cars to eastern Washington?",
        a: "Yes — Spokane, the Tri-Cities, and rural eastern Washington are all served, with door-to-door delivery wherever roads are carrier-accessible.",
      },
    ],
  },
  {
    slug: "tennessee",
sections: [
      {
        h: "Our home state — and a national crossroads",
        p: "US Star Trucking is based in Tennessee, and it happens to be one of the best-connected states in the country: I-40 runs the full east-west length through Memphis, Nashville, and Knoxville, while I-75, I-24, and I-65 tie the state into the Southeast and Midwest. Carriers pass through constantly, so Tennessee pickups and deliveries are consistently fast and competitively priced — and if anything needs personal attention, this is our backyard.",
      },
      {
        h: "Nashville's boom and the rest of the state",
        p: "Nashville is one of America's fastest-growing relocation destinations, and inbound routes from Chicago, New York, California, and Florida run weekly. Knoxville, Chattanooga, and Memphis all sit directly on interstate corridors with steady service. Deliveries into the Smokies and other mountain towns east of Knoxville may involve meeting the carrier along I-40 — steep grades and switchbacks aren't truck-friendly — and we'll coordinate the easiest spot with you.",
      },
    ],
    name: "Tennessee",
    abbr: "TN",
    intro:
      "Tennessee is our home state — US Star Trucking LLC is based in Knoxville, and we know these routes personally. Nashville's boom, Memphis's logistics hub, and the I-40/I-75 corridors make Tennessee a natural crossroads for auto transport in every direction.",
    cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Murfreesboro", "Clarksville"],
    routes: [
      { from: "Nashville, TN", to: "Los Angeles, CA", miles: "~2,000", days: "5-8" },
      { from: "Memphis, TN", to: "Chicago, IL", miles: "~530", days: "1-3" },
      { from: "Knoxville, TN", to: "Miami, FL", miles: "~870", days: "2-4" },
      { from: "Chattanooga, TN", to: "Dallas, TX", miles: "~780", days: "2-3" },
    ],
    faqs: [
      {
        q: "Why ship with a Tennessee-based company?",
        a: "We're headquartered in Knoxville, so Tennessee routes get local attention — we know the carriers, the corridors, and the seasonal patterns better than out-of-state brokers.",
      },
      {
        q: "How much does it cost to ship a car from Tennessee?",
        a: "Regional Southeast routes often run $400-$700; cross-country from Tennessee to the West Coast typically ranges $1,100-$1,500 for a sedan on open transport.",
      },
      {
        q: "How fast is pickup in Nashville or Memphis?",
        a: "Both cities sit on major corridors, so pickup within 1-2 days of booking is typical for most destinations.",
      },
    ],
  },
];

export const getStateBySlug = (slug) =>
  STATES.find((s) => s.slug === slug) || null;