// src/data/states.js
// Data for state SEO pages. Each state gets unique content —
// intro, popular routes, cities, and FAQs — so pages don't look
// like duplicates to Google.

export const STATES = [
  {
    slug: "california",
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