import BaseButton from './BaseButton.vue'

export default {
  title: 'UI Kit/Button',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'light'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

function buttonStory(text) {
  return (args) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: `<BaseButton v-bind="args">${text}</BaseButton>`,
  })
}

export const Primary = {
  args: { variant: 'primary', disabled: false },
  render: buttonStory('Створити подорож'),
}

export const Secondary = {
  args: { variant: 'secondary', disabled: false },
  render: buttonStory('Другорядна дія'),
}

export const Danger = {
  args: { variant: 'danger', disabled: false },
  render: buttonStory('Видалити'),
}

export const Light = {
  args: { variant: 'light', disabled: false },
  render: buttonStory('Скасувати'),
}

export const Disabled = {
  args: { variant: 'primary', disabled: true },
  render: buttonStory('Недоступна дія'),
}