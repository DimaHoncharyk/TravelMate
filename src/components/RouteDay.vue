<script setup>
import { computed } from "vue";

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["remove-place"]);

const totalCost = computed(() =>
  (props.day.places || []).reduce(
    (sum, place) => sum + Number(place.cost || 0),
    0,
  ),
);
</script>

<template>
  <section class="route-day">
    <h2>{{ day.title }}</h2>

    <article
      v-for="(place, index) in day.places || []"
      :key="place.id"
      class="route-place"
    >
      <span class="route-number">
        {{ index + 1 }}
      </span>

      <span class="route-emoji" aria-hidden="true">
        {{ place.emoji }}
      </span>

      <div class="route-info">
        <strong>{{ place.name }}</strong>
        <span> {{ place.category }} · €{{ place.cost }} </span>
        <p>{{ place.description }}</p>
      </div>

      <button
        type="button"
        class="remove-button"
        :aria-label="`Видалити ${place.name} з маршруту`"
        @click="emit('remove-place', place.id)"
      >
        ×
      </button>
    </article>

    <p v-if="!day.places?.length" class="muted">
      У цей день поки немає місць. Додай їх зі збережених.
    </p>

    <p v-else class="muted">Орієнтовні витрати за день: €{{ totalCost }}</p>
  </section>
</template>
