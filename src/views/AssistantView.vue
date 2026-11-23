<script setup>
import { ref } from "vue";
import BaseButton from "../components/BaseButton.vue";

const props = defineProps({
  trip: { type: Object, default: null },
});

const question = ref("");

const messages = ref([
  {
    role: "assistant",
    text: "Привіт! Запитай мене про маршрут, бюджет або цікаві місця.",
  },
]);

function sendQuestion() {
  const text = question.value.trim();
  if (!text) return;

  messages.value.push({
    role: "user",
    text,
  });

  question.value = "";

  const q = text.toLowerCase();
  let answer = "";

  if (q.includes("бюджет") || q.includes("дешев")) {
    answer =
      "Для економії додай безкоштовні парки та площі, " +
      "перевір актуальні ціни на квитки й заплануй витрати.";
  } else if (
    q.includes("ресторан") ||
    q.includes("їсти") ||
    q.includes("вечер")
  ) {
    const city = props.trip?.destination?.toLowerCase() || "";

    if (city.includes("париж") || city.includes("paris")) {
      answer =
        "Для знайомства з французькою кухнею " +
        "розглянь кафе Латинського кварталу Парижа.";
    } else if (
      city.includes("рим") ||
      city.includes("rome") ||
      city.includes("roma")
    ) {
      answer =
        "Для знайомства з італійською кухнею " +
        "розглянь ресторани району Трастевере.";
    } else {
      answer =
        "Спробуй знайти локальні кафе та ресторани " +
        "неподалік від основних точок маршруту.";
    }
  } else {
    answer =
      "Плануй відвідування місць за районами, " +
      "враховуй час на дорогу та залишай час на відпочинок." +
      (props.trip ? ` Поточна подорож: ${props.trip.destination}.` : "");
  }

  messages.value.push({
    role: "assistant",
    text: answer,
  });
}
</script>

<template>
  <section class="screen assistant-screen">
    <span class="eyebrow">TRAVELMATE ASSISTANT</span>

    <h1>Твій помічник у <span>подорожах</span></h1>

    <p class="muted">
      Демонстраційний чат для запитань про бюджет, маршрут і туристичні місця.
    </p>

    <div class="chat-panel">
      <div class="chat-messages" aria-live="polite">
        <article
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message"
          :class="message.role"
        >
          <strong>
            {{ message.role === "assistant" ? "TravelMate" : "Ти" }}
          </strong>
          <p>{{ message.text }}</p>
        </article>
      </div>

      <form class="chat-form" @submit.prevent="sendQuestion">
        <label class="visually-hidden" for="question"> Твоє запитання </label>

        <input
          id="question"
          v-model="question"
          class="field-input"
          placeholder="Наприклад, як зменшити бюджет?"
        />

        <BaseButton type="submit" :disabled="!question.trim()">
          Надіслати
        </BaseButton>
      </form>
    </div>
  </section>
</template>
