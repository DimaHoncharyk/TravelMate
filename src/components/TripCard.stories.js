import TripCard from './TripCard.vue'

export default {
  title: 'UI Kit/TripCard',
  component: TripCard,
  tags: ['autodocs'],
}

export const Rome = {
  args: {
    trip: {
      id: 1,
      destination: 'Рим, Італія',
      style: 'Архітектура та історія',
      travelers: 2,
      budget: 800,
    },
  },
}

export const Paris = {
  args: {
    trip: {
      id: 2,
      destination: 'Париж, Франція',
      style: 'Мистецтво та гастрономія',
      travelers: 3,
      budget: 1200,
    },
  },
}