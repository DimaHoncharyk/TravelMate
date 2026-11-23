<script setup>
import BaseButton from "../components/BaseButton.vue";
import PlaceCard from "../components/PlaceCard.vue";

defineProps({
  savedPlaces: { type: Array, required: true },
});

const emit = defineEmits(["navigate", "toggle-save", "add-to-trip"]);
</script>

<template>
  <section class="screen">
    <span class="eyebrow">ТВОЯ КОЛЕКЦІЯ</span>

    <h1>Збережені <span>місця</span></h1>

    <p class="muted">Збирай цікаві локації та додавай їх до маршруту.</p>

    <div v-if="savedPlaces.length" class="place-grid">
      <PlaceCard
        v-for="place in savedPlaces"
        :key="place.id"
        :place="place"
        :saved="true"
        @toggle-save="emit('toggle-save', $event)"
        @add-to-trip="emit('add-to-trip', $event)"
      />
    </div>

    <div v-else class="empty-panel">
      <span aria-hidden="true">♡</span>
      <h2>Тут поки порожньо</h2>

      <p>Збережи місце на головній сторінці, щоб воно з'явилося тут.</p>

      <BaseButton @click="emit('navigate', 'home')"> Знайти місця </BaseButton>
    </div>
  </section>
</template>
