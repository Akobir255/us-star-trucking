// src/data/services.js
// Data for service SEO pages. Each service gets unique content —
// intro, benefits, price context, and FAQs — so pages don't look
// like duplicates to Google.

export const SERVICES = [
  {
    slug: "door-to-door-auto-transport",
    name: "Door-to-Door Auto Transport",
    short: "Door-to-Door",
    emoji: "🚪",
    tagline: "We pick up and deliver as close to your address as safely possible",
    intro:
      "Door-to-door is the most convenient way to ship a vehicle — no terminals, no extra driving. Give us your pickup and delivery addresses, and the carrier comes to you. If a street is too narrow or restricted for a large truck, the driver arranges a safe meeting spot nearby, like a wide parking lot around the corner.",
    benefits: [
      ["No terminal trips", "Skip the drop-off and pickup drives — the carrier comes to your home, office, or dealership."],
      ["Direct handoff", "You (or someone you trust) meet the driver, walk around the vehicle together, and sign the condition report."],
      ["Nationwide", "Available across all 50 states, from big metros to rural roads accessible by carrier."],
      ["Included by default", "Door-to-door isn't an upsell with us — it's how every US Star Trucking shipment works."],
    ],
    priceNote:
      "Door-to-door service is included in our standard pricing — the quote you get from our calculator already covers it. Very remote pickups may add a small distance surcharge, which we always confirm before booking.",
    faqs: [
      {
        q: "What if a big truck can't reach my street?",
        a: "The driver will call you and arrange the nearest safe, legal meeting point — often a shopping center or wide street just minutes away. This is common in dense city centers and gated communities.",
      },
      {
        q: "Do I have to be present at pickup and delivery?",
        a: "You or any adult you authorize (18+) must be there to hand over keys, review the vehicle condition report, and sign the Bill of Lading.",
      },
      {
        q: "Is door-to-door more expensive?",
        a: "No — it's our standard service and is already included in your instant quote.",
      },
    ],
  },
  {
    slug: "open-car-transport",
    name: "Open Car Transport",
    short: "Open Transport",
    emoji: "🚛",
    tagline: "The most popular and affordable way to ship a car",
    intro:
      "Open transport is the industry standard — your vehicle travels on an open multi-car carrier, the same trailers that deliver brand-new cars to dealerships every day. It's the most economical option, with the largest carrier availability and the fastest pickup times. About 9 out of 10 vehicles shipped in the U.S. go on open carriers.",
    benefits: [
      ["Lowest price", "Open carriers haul 7-10 vehicles at once, spreading the cost — that's why it's the cheapest option."],
      ["Fastest scheduling", "Most carriers on the road are open trailers, so pickup windows are short — often 1-3 days."],
      ["Safe and proven", "Vehicles are strapped and secured by experienced drivers; damage claims are rare and covered by carrier insurance."],
      ["Dealer-grade", "It's the same method dealerships use for new inventory."],
    ],
    priceNote:
      "Open transport is the baseline price in our quote calculator. A typical sedan costs roughly $0.60-$1.30 per mile depending on distance — longer routes cost less per mile.",
    faqs: [
      {
        q: "Is my car safe on an open carrier?",
        a: "Yes — vehicles are secured with wheel straps by professional drivers and covered by the carrier's cargo insurance. Exposure to weather is the only tradeoff versus enclosed transport.",
      },
      {
        q: "Open or enclosed — which should I choose?",
        a: "For everyday cars, open transport is the smart, economical choice. For luxury, classic, or low-clearance vehicles, consider enclosed transport for full protection.",
      },
      {
        q: "How many days does open transport take?",
        a: "The same as enclosed — transit time depends on distance: 1-3 days regionally, 7-10 days coast to coast.",
      },
    ],
  },
  {
    slug: "enclosed-auto-transport",
    name: "Enclosed Auto Transport",
    short: "Enclosed Transport",
    emoji: "🛡️",
    tagline: "Maximum protection for luxury, classic, and exotic vehicles",
    intro:
      "Enclosed transport puts your vehicle inside a fully covered trailer — protected from weather, road debris, and prying eyes for the entire journey. It's the choice for luxury cars, classics, exotics, motorcycles with custom work, and any vehicle where condition is everything. Many enclosed trailers use hydraulic lift gates for low-clearance cars.",
    benefits: [
      ["Full weather protection", "Rain, hail, sun, and road salt never touch your vehicle."],
      ["Debris-proof", "No rock chips or dust — the vehicle arrives exactly as it left."],
      ["Low-clearance friendly", "Lift-gate loading available for sports cars and lowered vehicles."],
      ["Higher cargo insurance", "Enclosed carriers typically carry larger insurance policies suited to high-value vehicles."],
    ],
    priceNote:
      "Enclosed transport typically costs about 30-40% more than open — our quote calculator shows the exact difference instantly when you select 'Enclosed'.",
    faqs: [
      {
        q: "When is enclosed transport worth it?",
        a: "For vehicles worth roughly $70,000+, classics, exotics, show cars, or anything with sentimental value or delicate paint. It's also popular in hail season and for winter routes with heavy road salt.",
      },
      {
        q: "How much more does enclosed cost?",
        a: "Usually 30-40% above the open transport price for the same route. Select 'Enclosed' in our calculator to see your exact number.",
      },
      {
        q: "Can you ship a lowered or non-standard vehicle enclosed?",
        a: "Yes — tell us about any modifications when booking so we assign a trailer with lift-gate loading and the right clearance.",
      },
    ],
  },
  {
    slug: "motorcycle-shipping",
    name: "Motorcycle Shipping",
    short: "Motorcycle",
    emoji: "🏍️",
    tagline: "Specialized crating and securing for bikes of every kind",
    intro:
      "Motorcycles need different handling than cars — proper tie-down points, wheel chocks, and drivers who know how to load a bike without stressing the suspension or scratching the fairings. We ship cruisers, sport bikes, touring bikes, dirt bikes, scooters, and ATVs nationwide, on both open and enclosed carriers.",
    benefits: [
      ["Bike-experienced carriers", "Drivers equipped with chocks, soft straps, and loading ramps designed for two wheels."],
      ["Open or enclosed", "Economical open transport, or enclosed trailers for custom and collector bikes."],
      ["Crating available", "For maximum protection on long hauls, palletized/crated shipping can be arranged."],
      ["Nationwide", "All 48 continental states, door-to-door."],
    ],
    priceNote:
      "Motorcycle shipping often costs less than car transport on the same route since bikes take less trailer space. Use the calculator with vehicle type 'Motorcycle' for an instant estimate.",
    faqs: [
      {
        q: "How should I prepare my motorcycle for shipping?",
        a: "Wash it (for an accurate condition report), photograph it, remove loose accessories and saddlebag contents, leave about a quarter tank of fuel, and note any leaks or issues for the driver.",
      },
      {
        q: "Is my motorcycle insured during transport?",
        a: "Yes — the carrier's cargo insurance covers your bike in transit, and every carrier we assign is licensed and insured.",
      },
      {
        q: "Can you ship my bike enclosed?",
        a: "Absolutely — enclosed is recommended for custom paint, chrome, and collector bikes. It costs more but offers total protection from weather and debris.",
      },
    ],
  },
  {
    slug: "military-auto-transport",
    name: "Military Car Shipping",
    short: "Military PCS",
    emoji: "🎖️",
    tagline: "PCS vehicle shipping for service members — thank you for your service",
    intro:
      "A PCS move is stressful enough without driving your car across the country. We help active duty, reserves, National Guard, veterans, and military families ship vehicles to and from bases nationwide — with flexible scheduling built around report dates, and drivers experienced with base-adjacent pickups and deliveries.",
    benefits: [
      ["PCS-friendly scheduling", "We plan pickup around your report date and can arrange delivery to arrive when you do."],
      ["Base-area experience", "Carriers familiar with deliveries near major installations, including Fort Liberty, Fort Moore, Fort Campbell, and more."],
      ["Family authorization", "A spouse or family member can release or receive the vehicle if you're already in transit."],
      ["First-shipment discount", "Use code USSTAR50 for $50 off — our thank-you to those who serve."],
    ],
    priceNote:
      "Military shipments are priced the same transparent way as all our routes — get an instant number from the calculator, then call us to apply military-friendly scheduling. Code USSTAR50 takes $50 off your first shipment.",
    faqs: [
      {
        q: "Does the military pay for shipping my POV?",
        a: "For CONUS moves the government typically doesn't cover POV shipping (OCONUS is different). Many service members ship one vehicle themselves and drive the other — keep your receipt, as some costs may be tax-deductible or reimbursable; check with your transportation office.",
      },
      {
        q: "Can my spouse handle pickup while I'm deployed?",
        a: "Yes — any adult you authorize can release or receive the vehicle and sign the Bill of Lading.",
      },
      {
        q: "How far ahead should I book before a PCS?",
        a: "2-3 weeks ahead is ideal, especially during summer PCS season (May-August) when demand peaks.",
      },
    ],
  },
  {
    slug: "snowbird-auto-transport",
    name: "Snowbird Car Shipping",
    short: "Snowbird",
    emoji: "☀️",
    tagline: "Seasonal shipping south for the winter, back north for the summer",
    intro:
      "Why drive 1,200 miles twice a year? Every fall, thousands of snowbirds ship their vehicles from the Northeast and Midwest to Florida, Arizona, and Texas — then back home in spring. We handle the round trip: fly comfortably, and your car is waiting when you land. Book both directions and your second shipment gets $100 off with code USSTAR100.",
    benefits: [
      ["Skip the drive", "No two-day highway marathons, hotels, or winter driving — fly and meet your car there."],
      ["Round-trip savings", "Second shipment $100 off with code USSTAR100 — perfect for the spring return."],
      ["Popular corridors", "Northeast→Florida and Midwest→Arizona run constantly in season, keeping prices sharp."],
      ["Flexible timing", "We schedule around your travel dates, not the other way around."],
    ],
    priceNote:
      "Snowbird season (October-January southbound, March-May northbound) is peak demand — book 2-3 weeks ahead for the best rates. Off-direction routes (northbound in fall) are often cheaper.",
    faqs: [
      {
        q: "When should I book my snowbird shipment?",
        a: "2-3 weeks before your travel date. October through January is the busiest southbound window; spring for the return north.",
      },
      {
        q: "Can I put personal items in the car?",
        a: "Up to 100 lbs in the trunk is generally acceptable — no valuables, electronics, or prohibited items. The carrier's insurance covers the vehicle, not the contents.",
      },
      {
        q: "Do you offer discounts for the return trip?",
        a: "Yes — code USSTAR100 gives $100 off your second shipment, made for the snowbird round trip.",
      },
    ],
  },
  {
    slug: "student-auto-transport",
    name: "Student Car Shipping",
    short: "Student",
    emoji: "🎓",
    tagline: "Get your car to campus without the cross-country drive",
    intro:
      "Heading to college out of state? Shipping the car often beats a multi-day drive — especially for first-time long-distance drivers, tight move-in schedules, or when parents can't ride along. We deliver to campus towns nationwide, timed to move-in week, and parents can book and pay from home while the student receives the car at school.",
    benefits: [
      ["Parent-booked, student-received", "Book from home; any authorized adult (your student) receives the vehicle at school."],
      ["Move-in timing", "We schedule delivery around dorm move-in dates and semester starts."],
      ["Safer than a solo drive", "No 1,000-mile drives for a young driver — the car arrives on a carrier."],
      ["Budget-friendly", "Open transport keeps costs down, and code USSTAR50 takes $50 off the first shipment."],
    ],
    priceNote:
      "Student routes peak in August-September and May — book 2 weeks ahead around semester dates. Get an instant price with the calculator; code USSTAR50 saves $50 on your first shipment.",
    faqs: [
      {
        q: "Can my student receive the car if I book it?",
        a: "Yes — any adult (18+) you authorize can meet the driver, inspect the vehicle, and sign for delivery.",
      },
      {
        q: "Can a big carrier reach a campus dorm?",
        a: "Campus streets are often restricted, so drivers typically arrange a nearby meeting point — a large parking lot or wide street a few minutes from campus.",
      },
      {
        q: "When should we book for fall semester?",
        a: "At least 2 weeks before move-in. August is one of the busiest shipping months of the year.",
      },
    ],
  },
  {
    slug: "classic-car-shipping",
    name: "Classic & Luxury Car Shipping",
    short: "Classic & Luxury",
    emoji: "🏎️",
    tagline: "White-glove transport for the vehicles you can't replace",
    intro:
      "Classic cars, exotics, and luxury vehicles deserve more than standard handling. We arrange enclosed trailers with lift-gate loading, soft tie-downs, and drivers who treat every collector car like their own. Whether it's an auction purchase, a show entry, or a family heirloom crossing the country, condition on arrival is the whole job.",
    benefits: [
      ["Enclosed by default", "Full protection from weather, debris, and eyes — we recommend enclosed for every high-value vehicle."],
      ["Lift-gate loading", "No steep ramps for low-clearance exotics; hydraulic gates load the car level."],
      ["Soft tie-downs", "Wheel nets and soft straps — nothing touches the frame or suspension points."],
      ["Higher insurance limits", "Enclosed carriers we assign carry policies suited to collector values; ask us about your vehicle's coverage."],
    ],
    priceNote:
      "Classic and luxury transport is quoted as enclosed — typically 30-40% above open rates. For vehicles with special requirements (non-running classics, extreme low clearance), call us at (865) 722-7114 for a hand-built quote.",
    faqs: [
      {
        q: "How is a classic car secured during transport?",
        a: "With wheel nets and soft straps over the tires — never chains or frame hooks. The car rides inside a fully enclosed trailer, loaded by lift gate if clearance requires it.",
      },
      {
        q: "Can you ship a non-running classic?",
        a: "Yes — as long as it rolls, steers, and brakes. Non-running vehicles need a winch-equipped carrier, which adds a fee; mention the condition when booking.",
      },
      {
        q: "What insurance covers my collector car in transit?",
        a: "The carrier's cargo insurance covers transport; enclosed carriers typically hold higher limits. Tell us your vehicle's value and we'll confirm the assigned carrier's coverage before pickup.",
      },
    ],
  },
  {
    slug: "expedited-auto-transport",
    name: "Expedited Auto Transport",
    short: "Expedited",
    emoji: "⚡",
    tagline: "Priority pickup when your vehicle can't wait",
    intro:
      "Sometimes the schedule is the whole job — a job start date, a closing, a car sold with a deadline. Expedited transport puts your shipment at the front of the line: we prioritize carrier assignment for the fastest available pickup, often within 24-48 hours, and keep you updated at every step until delivery.",
    benefits: [
      ["Priority carrier assignment", "Your order goes to the top of the dispatch list for the fastest available truck."],
      ["24-48 hour pickup targets", "On major corridors, expedited pickups are often arranged within 1-2 days."],
      ["Deadline planning", "Tell us your must-arrive-by date and we plan the route and carrier around it."],
      ["Constant updates", "Extra communication comes standard — you'll always know where things stand."],
    ],
    priceNote:
      "Expedited service carries a premium over standard rates because carriers adjust routes to prioritize your vehicle — typically $200-$400 above the standard quote depending on route and season. Call (865) 722-7114 with your deadline for an exact number.",
    faqs: [
      {
        q: "How fast can you pick up my car?",
        a: "On major routes, expedited pickup is often possible within 24-48 hours of booking. Rural locations may need an extra day.",
      },
      {
        q: "Does expedited shipping guarantee a delivery date?",
        a: "Transit is still subject to weather, traffic, and DOT driving-hour rules, so dates are targets rather than guarantees — but expedited orders get priority at every step, and we plan buffer time around your deadline.",
      },
      {
        q: "How much more does expedited cost?",
        a: "Typically $200-$400 above the standard rate for the same route. Call us with your dates and we'll quote it exactly.",
      },
    ],
  },
  {
    slug: "suv-truck-transport",
    name: "SUV & Truck Transport",
    short: "SUV & Truck",
    emoji: "🛻",
    tagline: "Oversized vehicles need the right trailer — we arrange it",
    intro:
      "SUVs, pickup trucks, vans, and lifted vehicles take more trailer space and weight allowance than sedans, so they need carriers with the right capacity. We ship everything from a RAV4 to a dually F-350 — including lifted trucks, work vans, and oversized rigs — matching each vehicle to a carrier that can load it safely.",
    benefits: [
      ["Right-sized carriers", "We match your vehicle's height, length, and weight to a trailer that fits it properly."],
      ["Lifted & modified friendly", "Tell us about lift kits, racks, or oversized tires — we plan for them upfront, no surprises at pickup."],
      ["Work vehicles welcome", "Cargo vans, crew cabs, and light commercial vehicles shipped nationwide."],
      ["Open or enclosed", "Most SUVs and trucks ship open; enclosed available for premium builds."],
    ],
    priceNote:
      "Larger vehicles cost more than sedans because they use more deck space and weight capacity — our calculator adds this automatically when you select SUV, Pickup Truck, or Van. Heavily modified or dually trucks may need a custom quote: call (865) 722-7114.",
    faqs: [
      {
        q: "Does a lifted truck cost more to ship?",
        a: "Usually yes — extra height can take a top-deck spot or require a specific trailer. Tell us the lift size and tire setup when booking so the quote is accurate from the start.",
      },
      {
        q: "Can you ship a dually or heavy-duty pickup?",
        a: "Yes — duallys and 3/4-ton/1-ton trucks ship regularly; they just need carriers with the right weight capacity, which we arrange.",
      },
      {
        q: "Can I leave equipment or tools in my work van?",
        a: "Up to 100 lbs of secured items is generally acceptable, but the carrier's insurance covers the vehicle, not the contents — remove anything valuable.",
      },
    ],
  },
];

export const getServiceBySlug = (slug) =>
  SERVICES.find((s) => s.slug === slug) || null;