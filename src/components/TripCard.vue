<script setup>
defineProps({
  trip: {
    type: Object,
    required: true,
  },
})

defineEmits(['open'])
</script>

<template>
  <article class="trip-card">
    <div
      class="trip-cover"
      role="img"
      :aria-label="`Подорож до ${trip.destination}`"
    >
      <span aria-hidden="true">✈</span>
    </div>

    <div class="trip-content">
      <h3>{{ trip.destination }}</h3>
      <p>{{ trip.style }}</p>

      <div class="trip-details">
        <span>{{ trip.travelers }} мандр.</span>
        <strong>€{{ trip.budget }}</strong>
      </div>

      <button
        class="text-button"
        type="button"
        @click="$emit('open', trip)"
      >
        Переглянути маршрут →
      </button>
    </div>
  </article>
</template>

<style scoped>
.trip-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  border: 1px solid var(--border, #dce2da);
  border-radius: var(--radius-lg, 20px);
  background: var(--surface, #fff);
  box-shadow: var(--shadow-card, 0 5px 20px rgba(36, 53, 45, 0.06));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.trip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 9px 26px rgba(36, 53, 45, 0.1);
}

.trip-cover {
  display: grid;
  place-items: center;
  min-height: 135px;
  background: var(--primary-soft, #e8f0e9);
  color: var(--primary, #285943);
  font-size: 46px;
}

.trip-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 18px;
}

.trip-content h3 {
  margin: 0;
  color: var(--text, #24352d);
  font-size: 20px;
}

.trip-content p {
  margin: 0;
  color: var(--muted, #748078);
  line-height: 1.5;
}

.trip-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 12px 0;
  border-top: 1px solid var(--border, #dce2da);
  color: var(--muted, #748078);
  font-size: 14px;
}

.trip-details strong {
  color: var(--text, #24352d);
  font-size: 18px;
}

.text-button {
  margin-top: auto;
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: var(--primary, #285943);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.text-button:hover {
  text-decoration: underline;
}

.text-button:focus-visible {
  outline: 3px solid #83ad91;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .trip-content {
    padding: 14px;
  }
}
</style>