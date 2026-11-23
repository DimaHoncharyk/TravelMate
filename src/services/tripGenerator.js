import { demoPlaces, parisPlaces, berlinPlaces } from "../data/demo.js";

export function generateTripDays(destination, numberOfDays, interests = []) {
  const city = destination.trim().toLowerCase();

  let places;

  // Париж
  if (city.includes("париж") || city.includes("paris")) {
    places = parisPlaces;
  }

  // Рим
  else if (
    city.includes("рим") ||
    city.includes("rome") ||
    city.includes("roma")
  ) {
    places = demoPlaces;
  }

  // Берлін
  else if (
    city.includes("берлін") ||
    city.includes("берлин") ||
    city.includes("berlin")
  ) {
    places = berlinPlaces;
  }

  // Невідоме місто
  else {
    throw new Error(
      "Для цього міста поки немає демонстраційних маршрутів. " +
        "Оберіть Париж, Рим або Берлін.",
    );
  }

  // Спочатку місця, які відповідають інтересам
  const preferred = places.filter((place) =>
    interests.includes(place.category),
  );

  // Потім інші туристичні місця
  const other = places.filter((place) => !interests.includes(place.category));

  const orderedPlaces = [...preferred, ...other];

  const titles = [
    "Знайомство з містом",
    "Культура та мистецтво",
    "Історичні памʼятки",
    "Прогулянки та відпочинок",
  ];

  // Розподіл місць між днями
  return Array.from({ length: numberOfDays }, (_, index) => ({
    day: index + 1,
    title: titles[index % titles.length],
    places: orderedPlaces
      .filter((_, placeIndex) => placeIndex % numberOfDays === index)
      .map((place) => ({ ...place })),
  }));
}
