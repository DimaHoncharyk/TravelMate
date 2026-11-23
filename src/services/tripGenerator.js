import { demoPlaces, parisPlaces } from "../data/demo.js";

export function generateTripDays(destination, numberOfDays, interests = []) {
  const city = destination.trim().toLowerCase();

  let places;

  if (city.includes("париж") || city.includes("paris")) {
    places = parisPlaces;
  } else if (
    city.includes("рим,") ||
    city === "рим" ||
    city.includes("rome") ||
    city.includes("roma")
  ) {
    places = demoPlaces;
  } else {
    throw new Error(
      "Для цього міста поки немає демонстраційних маршрутів. Оберіть Париж або Рим.",
    );
  }

  const preferred = places.filter((place) =>
    interests.includes(place.category),
  );

  const other = places.filter((place) => !interests.includes(place.category));

  const orderedPlaces = [...preferred, ...other];

  const titles = [
    "Знайомство з містом",
    "Культура та мистецтво",
    "Історичні памʼятки",
    "Прогулянки та відпочинок",
  ];

  return Array.from({ length: numberOfDays }, (_, index) => ({
    day: index + 1,
    title: titles[index % titles.length],
    places: orderedPlaces
      .filter((_, placeIndex) => placeIndex % numberOfDays === index)
      .map((place) => ({ ...place })),
  }));
}
