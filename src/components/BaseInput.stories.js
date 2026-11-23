import BaseInput from './BaseInput.vue'

export default {
  title: 'UI Kit/Input',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'date', 'email'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export const Default = {
  args: {
    id: 'destination',
    label: 'Місто призначення',
    modelValue: 'Рим, Італія',
    type: 'text',
    placeholder: 'Введіть місто',
    required: true,
    disabled: false,
    error: '',
  },
}

export const Empty = {
  args: {
    id: 'empty-destination',
    label: 'Місто призначення',
    modelValue: '',
    type: 'text',
    placeholder: 'Введіть місто',
    required: true,
    disabled: false,
    error: '',
  },
}

export const DateInput = {
  args: {
    id: 'start-date',
    label: 'Дата початку',
    modelValue: '',
    type: 'date',
    required: true,
  },
}

export const BudgetInput = {
  args: {
    id: 'budget',
    label: 'Бюджет (€)',
    modelValue: 1000,
    type: 'number',
    placeholder: 'Введіть бюджет',
  },
}

export const Error = {
  args: {
    id: 'invalid-destination',
    label: 'Місто призначення',
    modelValue: '',
    type: 'text',
    required: true,
    error: 'Будь ласка, введіть місто.',
  },
}

export const Disabled = {
  args: {
    id: 'disabled-destination',
    label: 'Місто призначення',
    modelValue: 'Рим, Італія',
    type: 'text',
    disabled: true,
  },
}