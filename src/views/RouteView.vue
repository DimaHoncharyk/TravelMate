<script setup>
import { computed } from "vue";
import BaseButton from "../components/BaseButton.vue";
import RouteDay from "../components/RouteDay.vue";

const props = defineProps({
  trip: { type: Object, default: null },
  activeDay: { type: Number, default: 1 },
});

const emit = defineEmits(["navigate", "change-day", "remove-place"]);

const currentDay = computed(
  () => props.trip?.days?.find((day) => day.day === props.activeDay) || null,
);

const routeCost = computed(() =>
  (currentDay.value?.places || []).reduce(
    (sum, place) => sum + Number(place.cost || 0),
    0,
  ),
);
</script>

<template>
  <section class="screen">
    <template v-if="trip">
      <span class="eyebrow">ТВОЯ ПОДОРОЖ</span>
      <h1>{{ trip.destination }}</h1>

      <p class="muted">
        {{ trip.style }} · {{ trip.travelers }} мандрівники · €{{ trip.budget }}
      </p>

      <div class="route-layout">
        <div>
          <div class="day-list">
            <button
              v-for="day in trip.days"
              :key="day.day"
              type="button"
              :class="{ 'day-active': activeDay === day.day }"
              :aria-pressed="activeDay === day.day"
              @click="emit('change-day', day.day)"
            >
              День {{ day.day }}
            </button>
          </div>

          <RouteDay
            v-if="currentDay"
            :day="currentDay"
            @remove-place="emit('remove-place', $event)"
          />

          <BaseButton variant="secondary" @click="emit('navigate', 'saved')">
            Додати збережене місце
          </BaseButton>
        </div>

        <aside class="route-aside">
          <h2>Карта маршруту</h2>

          <div
            class="map-demo"
            role="img"
            aria-label="Схематичне розташування точок маршруту"
          >
            <span class="map-point point-a">1</span>
            <span class="map-point point-b">2</span>
            <span class="map-point point-c">3</span>
            <span class="map-label">Схематична карта</span>
          </div>

          <div class="budget-panel">
            <h3>Бюджет</h3>
            <strong>€{{ trip.budget }}</strong>

            <p>Орієнтовні витрати на місця поточного дня: €{{ routeCost }}</p>

            <div class="progress-track">
              <span
                :style="{
                  width: `${Math.min(
                    100,
                    (routeCost / Math.max(1, Number(trip.budget))) * 100,
                  )}%`,
                }"
              ></span>
            </div>
          </div>

          <BaseButton
            variant="secondary"
            @click="emit('navigate', 'assistant')"
          >
            Запитати AI-помічника
          </BaseButton>
        </aside>
      </div>
    </template>

    <div v-else class="panel">
      <h2>Подорож ще не створена</h2>
      <BaseButton @click="emit('navigate', 'create')">
        Створити подорож
      </BaseButton>
    </div>
  </section>
</template>
