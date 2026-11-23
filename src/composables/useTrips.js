import { computed, ref } from "vue";

const STORAGE_KEY = "travelmate-trips";

const trips = ref([]);
const selectedTripId = ref(null);

const selectedTrip = computed(
  () => trips.value.find((trip) => trip.id === selectedTripId.value) || null,
);

export function useTrips() {
  function loadTrips() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      trips.value = Array.isArray(stored) ? stored : [];
    } catch {
      trips.value = [];
    }
    selectedTripId.value = trips.value[0]?.id ?? null;
  }

  function saveTrips() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips.value));
  }

  function addTrip(trip) {
    trips.value.unshift(trip);
    selectedTripId.value = trip.id;
    saveTrips();
  }

  function selectTrip(id) {
    selectedTripId.value = id;
  }

  function deleteTrip(id) {
    trips.value = trips.value.filter((trip) => trip.id !== id);
    if (selectedTripId.value === id) {
      selectedTripId.value = trips.value[0]?.id ?? null;
    }
    saveTrips();
  }

  return {
    trips,
    selectedTripId,
    selectedTrip,
    loadTrips,
    saveTrips,
    addTrip,
    selectTrip,
    deleteTrip,
  };
}
