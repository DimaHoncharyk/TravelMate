<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label :for="id" class="field-label">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>

    <input
      :id="id"
      class="field-input"
      :class="{ 'field-input--error': error }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="$emit(
        'update:modelValue',
        type === 'number' && $event.target.value !== ''
          ? Number($event.target.value)
          : $event.target.value
      )"
    >

    <p
      v-if="error"
      :id="`${id}-error`"
      class="field-error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
}

.field-label {
  color: var(--text, #24352d);
  font-size: 14px;
  font-weight: 600;
}

.field-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  padding: 11px 13px;
  border: 1px solid var(--border, #dce2da);
  border-radius: var(--radius-sm, 8px);
  background: var(--surface, #fff);
  color: var(--text, #24352d);
  font: inherit;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.field-input::placeholder {
  color: var(--muted, #748078);
}

.field-input:hover:not(:disabled):not(:focus) {
  border-color: #aab8ac;
}

.field-input:focus {
  border-color: var(--primary, #285943);
  outline: none;
  box-shadow: 0 0 0 3px var(--primary-soft, #e8f0e9);
}

.field-input--error {
  border-color: var(--error, #b83232);
}

.field-input--error:focus {
  box-shadow: 0 0 0 3px var(--error-bg, #fbeaea);
}

.field-input:disabled {
  background: var(--neutral-100, #edf0eb);
  cursor: not-allowed;
  opacity: 0.7;
}

.field-error {
  margin: 0;
  color: var(--error, #b83232);
  font-size: var(--font-caption, 12px);
}

@media (prefers-reduced-motion: reduce) {
  .field-input {
    transition: none;
  }
}
</style>