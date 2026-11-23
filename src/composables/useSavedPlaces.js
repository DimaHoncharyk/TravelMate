import { ref, watch } from "vue";

const STORAGE_KEY = "travelmate-saved";
const savedPlaces = ref([]);

export function useSavedPlaces() {
  function loadSavedPlaces() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      savedPlaces.value = Array.isArray(data) ? data : [];
    } catch {
      savedPlaces.value = [];
    }
  }

  function saveSavedPlaces() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces.value));
  }

  function isSaved(place) {
    return savedPlaces.value.some((item) => item.id === place.id);
  }

  function toggleSaved(place) {
    if (isSaved(place)) {
      savedPlaces.value = savedPlaces.value.filter(
        (item) => item.id !== place.id,
      );
    } else {
      savedPlaces.value = [...savedPlaces.value, { ...place }];
    }
    saveSavedPlaces();
  }

  return {
    savedPlaces,
    loadSavedPlaces,
    saveSavedPlaces,
    isSaved,
    toggleSaved,
  };
}
