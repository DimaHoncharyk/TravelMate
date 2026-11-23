<script setup>
import BaseButton from "../components/BaseButton.vue";
import TripCard from "../components/TripCard.vue";
import PlaceCard from "../components/PlaceCard.vue";

defineProps({
  trips: { type: Array, required: true },
  places: { type: Array, required: true },
  isSaved: { type: Function, required: true },
});

const emit = defineEmits([
  "navigate",
  "open-trip",
  "toggle-save",
  "add-to-trip",
]);
</script>

<template>
  <section class="screen">
    <div class="hero">
      <div>
        <span class="eyebrow">ТВІЙ ПЕРСОНАЛЬНИЙ ПОМІЧНИК</span>
        <h1>
          Світ чекає.<br />
          <span>Плануй свою пригоду.</span>
        </h1>
        <p>
          Створюй персональні маршрути, знаходь цікаві місця та плануй бюджет
          подорожі в одному місці.
        </p>
        <BaseButton @click="emit('navigate', 'create')">
          Створити подорож →
        </BaseButton>
      </div>

      <div
        class="hero-illustration"
        role="img"
        aria-label="Ілюстрація подорожі"
      >
        <span>✈</span>
        <strong>EXPLORE<br />THE WORLD</strong>
        <div class="illustration-sun"></div>
      </div>
    </div>

    <div class="section-title">
      <div>
        <h2>Твої подорожі</h2>
        <p>Повернися до планування в будь-який момент.</p>
      </div>
      <BaseButton variant="secondary" @click="emit('navigate', 'create')">
        ＋ Нова подорож
      </BaseButton>
    </div>

    <div class="trip-grid">
      <TripCard
        v-for="trip in trips"
        :key="trip.id"
        :trip="trip"
        @open="emit('open-trip', $event)"
      />
    </div>

    <div class="section-title">
      <div>
        <h2>Популярні місця</h2>
        <p>Ідеї для твого наступного маршруту.</p>
      </div>
    </div>

    <div class="place-grid">
      <PlaceCard
        v-for="place in places"
        :key="place.id"
        :place="place"
        :saved="isSaved(place)"
        @toggle-save="emit('toggle-save', $event)"
        @add-to-trip="emit('add-to-trip', $event)"
      />
    </div>
  </section>
</template>
