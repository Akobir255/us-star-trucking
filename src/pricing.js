export function calculateQuote(
  miles,
  vehicle,
  condition,
  transport
) {
  let rate;

  if (miles <= 300) {
    rate = 1.3;
  } else if (miles <= 700) {
    rate = 1.1;
  } else if (miles <= 1200) {
    rate = 0.85;
  } else if (miles <= 2400) {
    rate = 0.7;
  } else {
    rate = 0.6;
  }

  let price = miles * rate;

  // Minimum charge
  if (price < 200) price = 200;

  // Vehicle surcharge
  switch (vehicle) {
    case "SUV":
      price += 100;
      break;

    case "Pickup Truck":
      price += 150;
      break;

    case "Van":
      price += 100;
      break;

    default:
      break;
  }

  // Vehicle condition
  if (condition === "Non-Running") {
    price += 100;
  }

  // Enclosed transport
  if (transport === "Enclosed") {
    price *= 1.3;
  }

  return Math.round(price);
}