import PlaceCard from './PlaceCard.vue'

export default {
  title: 'UI Kit/PlaceCard',
  component: PlaceCard,
  tags: ['autodocs'],
  argTypes: {
    saved: { control: 'boolean' },
  },
}

const colosseum = {
  id: 1,
  name: 'Колізей',
  city: 'Рим',
  category: 'Історія',
  description: 'Знаменитий амфітеатр Стародавнього Риму.',
  cost: 25,
  emoji: '🏛️',
}

export const Default = {
  args: {
    place: colosseum,
    saved: false,
  },
}

export const Saved = {
  args: {
    place: colosseum,
    saved: true,
  },
}

export const Nature = {
  args: {
    place: {
      id: 2,
      name: 'Гірське озеро',
      city: 'Альпи',
      category: 'Природа',
      description: 'Мальовниче місце для прогулянок і відпочинку.',
      cost: 0,
      emoji: '🏞️',
    },
    saved: false,
  },
}