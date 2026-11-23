<script setup>
import { computed, onMounted, ref, watch } from "vue";

import HomeView from "./views/HomeView.vue";
import CreateTripView from "./views/CreateTripView.vue";
import RouteView from "./views/RouteView.vue";
import SavedPlacesView from "./views/SavedPlacesView.vue";
import AssistantView from "./views/AssistantView.vue";

import { useTrips } from "./composables/useTrips.js";
import { useSavedPlaces } from "./composables/useSavedPlaces.js";
import { demoPlaces, parisPlaces } from "./data/demo.js";
import { generateTripDays } from "./services/tripGenerator.js";

const pages = [
  { id: "home", label: "Огляд" },
  { id: "create", label: "Нова подорож" },
  { id: "route", label: "Мій маршрут" },
  { id: "saved", label: "Збережені місця" },
  { id: "assistant", label: "AI-помічник" },
];

const page = ref("home");
const mobileMenu = ref(false);
const activeDay = ref(1);
const toast = ref("");

const { trips, selectedTrip, loadTrips, saveTrips, addTrip, selectTrip } =
  useTrips();

const {
  savedPlaces,
  loadSavedPlaces,
  isSaved,
  toggleSaved: updateSavedPlace,
} = useSavedPlaces();

const form = ref({
  destination: "Рим, Італія",
  startDate: "",
  endDate: "",
  travelers: 2,
  budget: 1000,
  style: "Культура та гастрономія",
  interests: ["Архітектура", "Історія", "Гастрономія"],
});

const interestOptions = [
  "Архітектура",
  "Історія",
  "Гастрономія",
  "Музеї",
  "Природа",
  "Шопінг",
  "Активний відпочинок",
];

const currentDay = computed(
  () =>
    selectedTrip.value?.days?.find((day) => day.day === activeDay.value) ||
    null,
);

const popularPlaces = computed(() => {
  const city = selectedTrip.value?.destination?.toLowerCase() || "";

  if (city.includes("париж") || city.includes("paris")) {
    return parisPlaces.slice(0, 3);
  }

  return demoPlaces.slice(0, 3);
});

function notify(message) {
  toast.value = message;

  setTimeout(() => {
    if (toast.value === message) {
      toast.value = "";
    }
  }, 2500);
}

function navigate(id) {
  page.value = id;
  mobileMenu.value = false;
  window.scrollTo(0, 0);
}

function toggleInterest(interest) {
  const selected = form.value.interests;

  form.value.interests = selected.includes(interest)
    ? selected.filter((item) => item !== interest)
    : [...selected, interest];
}

function createTrip() {
  const destination = form.value.destination.trim();
  const travelers = Number(form.value.travelers);
  const budget = Number(form.value.budget);

  if (!destination) {
    notify("Вкажіть місто призначення.");
    return;
  }

  if (!Number.isInteger(travelers) || travelers < 1) {
    notify("Кількість мандрівників має бути не меншою за 1.");
    return;
  }

  if (!Number.isFinite(budget) || budget <= 0) {
    notify("Вкажіть бюджет більше 0 євро.");
    return;
  }

  if (Boolean(form.value.startDate) !== Boolean(form.value.endDate)) {
    notify("Вкажіть обидві дати або залиште їх порожніми.");
    return;
  }

  if (
    form.value.startDate &&
    form.value.endDate &&
    form.value.endDate < form.value.startDate
  ) {
    notify("Дата завершення не може бути раніше дати початку.");
    return;
  }

  let numberOfDays = 5;

  if (form.value.startDate && form.value.endDate) {
    const start = new Date(form.value.startDate);
    const end = new Date(form.value.endDate);

    numberOfDays = Math.floor((end - start) / 86400000) + 1;

    if (!Number.isFinite(numberOfDays) || numberOfDays < 1) {
      notify("Вкажіть коректні дати подорожі.");
      return;
    }

    if (numberOfDays > 14) {
      notify("Демонстраційна версія підтримує до 14 днів.");
      return;
    }
  }

  let days;

  try {
    days = generateTripDays(destination, numberOfDays, form.value.interests);
  } catch (error) {
    notify(error.message || "Не вдалося створити маршрут.");
    return;
  }

  const trip = {
    id: Date.now(),
    destination,
    travelers,
    budget,
    style: form.value.style,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    interests: [...form.value.interests],
    days,
  };

  addTrip(trip);
  activeDay.value = 1;

  navigate("route");
  notify("Подорож успішно створено!");
}

function openTrip(trip) {
  selectTrip(trip.id);
  activeDay.value = 1;
  navigate("route");
}

function toggleSaved(place) {
  const wasSaved = isSaved(place);

  updateSavedPlace(place);

  notify(wasSaved ? "Місце видалено зі збережених." : "Місце збережено.");
}

function placeMatchesTrip(place, trip) {
  const destination = trip.destination.toLowerCase();

  if (destination.includes("париж") || destination.includes("paris")) {
    return parisPlaces.some((item) => item.id === place.id);
  }

  if (
    destination.includes("рим") ||
    destination.includes("rome") ||
    destination.includes("roma")
  ) {
    return demoPlaces.some((item) => item.id === place.id);
  }

  return false;
}

function addToTrip(place) {
  if (!selectedTrip.value) {
    notify("Спочатку створіть подорож.");
    navigate("create");
    return;
  }

  if (!currentDay.value) {
    notify("Спочатку оберіть день маршруту.");
    navigate("route");
    return;
  }

  if (!placeMatchesTrip(place, selectedTrip.value)) {
    notify(
      "Це місце знаходиться в іншому місті. " +
        "Оберіть місце для поточної подорожі.",
    );
    return;
  }

  const exists = currentDay.value.places.some((item) => item.id === place.id);

  if (exists) {
    notify("Це місце вже є в маршруті.");
    return;
  }

  currentDay.value.places.push({ ...place });
  saveTrips();

  navigate("route");
  notify("Місце додано до маршруту!");
}

function removeFromRoute(placeId) {
  if (!currentDay.value) return;

  currentDay.value.places = currentDay.value.places.filter(
    (place) => place.id !== placeId,
  );

  saveTrips();
  notify("Місце видалено з маршруту.");
}

onMounted(() => {
  loadTrips();
  loadSavedPlaces();

  if (!trips.value.length) {
    const sample = {
      id: 1,
      destination: "Рим, Італія",
      travelers: 2,
      budget: 1000,
      style: "Культура та гастрономія",
      startDate: "",
      endDate: "",
      interests: ["Архітектура", "Історія", "Гастрономія"],
      days: generateTripDays("Рим, Італія", 5, [
        "Архітектура",
        "Історія",
        "Гастрономія",
      ]),
    };

    addTrip(sample);
  }
});

watch(trips, saveTrips, { deep: true });
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#home" @click.prevent="navigate('home')">
        <span class="brand-icon">T</span>
        Travel<span>Mate</span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-label="Відкрити або закрити меню"
        :aria-expanded="mobileMenu"
        @click="mobileMenu = !mobileMenu"
      >
        ☰
      </button>

      <nav
        class="navigation"
        :class="{ 'navigation-open': mobileMenu }"
        aria-label="Основна навігація"
      >
        <button
          v-for="item in pages"
          :key="item.id"
          type="button"
          :class="{ 'nav-active': page === item.id }"
          :aria-current="page === item.id ? 'page' : undefined"
          @click="navigate(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
    </header>

    <main class="main-content">
      <HomeView
        v-if="page === 'home'"
        :trips="trips"
        :places="popularPlaces"
        :is-saved="isSaved"
        @navigate="navigate"
        @open-trip="openTrip"
        @toggle-save="toggleSaved"
        @add-to-trip="addToTrip"
      />

      <CreateTripView
        v-else-if="page === 'create'"
        :form="form"
        :interest-options="interestOptions"
        @create-trip="createTrip"
        @toggle-interest="toggleInterest"
      />

      <RouteView
        v-else-if="page === 'route'"
        :trip="selectedTrip"
        :active-day="activeDay"
        @navigate="navigate"
        @change-day="activeDay = $event"
        @remove-place="removeFromRoute"
      />

      <SavedPlacesView
        v-else-if="page === 'saved'"
        :saved-places="savedPlaces"
        @navigate="navigate"
        @toggle-save="toggleSaved"
        @add-to-trip="addToTrip"
      />

      <AssistantView v-else-if="page === 'assistant'" :trip="selectedTrip" />
    </main>

    <footer class="footer">
      <span>TravelMate · 2026</span>
      <span>Твоя наступна пригода починається тут.</span>
    </footer>

    <div v-if="toast" class="toast" role="status" aria-live="polite">
      {{ toast }}
    </div>
  </div>
</template>
