<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'danger', 'light'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})

defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="base-button"
    :class="`base-button--${variant}`"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 11px 18px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm, 8px);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease,
    transform 0.18s ease;
}

.base-button:focus-visible {
  outline: 3px solid #83ad91;
  outline-offset: 3px;
}

.base-button--primary {
  background: var(--primary, #285943);
  color: #fff;
}

.base-button--primary:hover:not(:disabled) {
  background: var(--primary-hover, #1e4634);
}

.base-button--primary:active:not(:disabled) {
  background: var(--primary-active, #163728);
  transform: translateY(1px);
}

.base-button--secondary {
  border-color: var(--border, #dce2da);
  background: var(--secondary, #dce9dc);
  color: var(--text, #24352d);
}

.base-button--secondary:hover:not(:disabled) {
  background: var(--secondary-hover, #cedfce);
}

.base-button--danger {
  background: var(--error, #b83232);
  color: #fff;
}

.base-button--danger:hover:not(:disabled) {
  background: #982727;
}

.base-button--light {
  border-color: var(--border, #dce2da);
  background: var(--surface, #fff);
  color: var(--text, #24352d);
}

.base-button--light:hover:not(:disabled) {
  background: var(--neutral-100, #edf0eb);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none;
  }
}
</style>