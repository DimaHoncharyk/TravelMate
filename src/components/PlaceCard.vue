<script setup>
defineProps({
  place: {
    type: Object,
    required: true,
  },
  saved: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-save', 'add-to-trip'])
</script>

<template>
  <article class="place-card">
    <div class="place-image" role="img" :aria-label="place.name">
      <span aria-hidden="true">{{ place.emoji || '📍' }}</span>
    </div>

    <div class="place-content">
      <span class="category">{{ place.category }}</span>
      <h3>{{ place.name }}</h3>
      <p>{{ place.description }}</p>

      <div class="place-actions">
        <button
          class="icon-button"
          type="button"
          :aria-label="saved ? 'Видалити зі збережених' : 'Зберегти місце'"
          :aria-pressed="saved"
          @click="$emit('toggle-save', place)"
        >
          {{ saved ? '♥' : '♡' }}
        </button>

        <button
          class="text-button"
          type="button"
          @click="$emit('add-to-trip', place)"
        >
          Додати до маршруту
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.place-card {
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

.place-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 9px 26px rgba(36, 53, 45, 0.1);
}

.place-image {
  display: grid;
  place-items: center;
  min-height: 150px;
  background: var(--primary-soft, #e8f0e9);
  font-size: 52px;
}

.place-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 18px;
}

.category {
  color: var(--primary, #285943);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.place-content h3 {
  margin: 0;
  color: var(--text, #24352d);
  font-size: 20px;
}

.place-content p {
  margin: 0;
  color: var(--muted, #748078);
  line-height: 1.6;
}

.place-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-top: auto;
  padding-top: 8px;
}

.icon-button {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border: 1px solid var(--border, #dce2da);
  border-radius: 50%;
  background: var(--surface, #fff);
  color: var(--primary, #285943);
  font-size: 23px;
  cursor: pointer;
}

.icon-button:hover {
  background: var(--primary-soft, #e8f0e9);
}

.icon-button:focus-visible,
.text-button:focus-visible {
  outline: 3px solid #83ad91;
  outline-offset: 3px;
}

.text-button {
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: var(--primary, #285943);
  font: inherit;
  font-weight: 700;
  text-align: right;
  cursor: pointer;
}

.text-button:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .place-content {
    padding: 14px;
  }

  .text-button {
    font-size: 13px;
  }
}
</style>