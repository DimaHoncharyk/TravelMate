<script setup>
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";

const props = defineProps({
  form: { type: Object, required: true },
  interestOptions: { type: Array, required: true },
});

const emit = defineEmits(["create-trip", "toggle-interest"]);
</script>

<template>
  <section class="screen form-screen">
    <span class="eyebrow">НОВА ПОДОРОЖ</span>

    <h1>Створи свою <span>пригоду</span></h1>

    <p class="muted">
      Вкажи основні параметри, щоб отримати демонстраційний маршрут.
    </p>

    <form class="panel" @submit.prevent="emit('create-trip')">
      <h2>Куди вирушаємо?</h2>

      <BaseInput
        id="destination"
        v-model="props.form.destination"
        label="Місто або країна"
        placeholder="Наприклад, Париж, Франція"
        required
      />

      <div class="two-columns">
        <BaseInput
          id="start-date"
          v-model="props.form.startDate"
          label="Дата початку"
          type="date"
        />

        <BaseInput
          id="end-date"
          v-model="props.form.endDate"
          label="Дата завершення"
          type="date"
        />
      </div>

      <div class="two-columns">
        <BaseInput
          id="travelers"
          v-model="props.form.travelers"
          label="Кількість мандрівників"
          type="number"
          required
        />

        <BaseInput
          id="budget"
          v-model="props.form.budget"
          label="Бюджет у євро"
          type="number"
          required
        />
      </div>

      <label class="field-label" for="travel-style"> Стиль подорожі </label>

      <select id="travel-style" v-model="props.form.style" class="field-input">
        <option>Культура та гастрономія</option>
        <option>Пригоди та активний відпочинок</option>
        <option>Спокійний відпочинок</option>
        <option>Море та пляжі</option>
      </select>

      <h2 class="form-subtitle">Що тебе цікавить?</h2>

      <div class="interest-list">
        <button
          v-for="interest in interestOptions"
          :key="interest"
          type="button"
          class="interest-chip"
          :class="{
            selected: props.form.interests.includes(interest),
          }"
          :aria-pressed="props.form.interests.includes(interest)"
          @click="emit('toggle-interest', interest)"
        >
          {{ props.form.interests.includes(interest) ? "✓ " : "+ " }}
          {{ interest }}
        </button>
      </div>

      <BaseButton type="submit"> Створити маршрут → </BaseButton>
    </form>
  </section>
</template>
