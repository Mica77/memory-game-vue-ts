<template>
  <div class="cards">
    <CardAreaItem
      v-for="(card, i) in cards"
      :card="card"
      :key="card.id"
      @open="$emit('openCard', card)"
    />
  </div>
</template>

<script setup lang="ts">
import CardAreaItem from '@/components/CardAreaItem.vue'
import type { ICard } from '@/entities/entities'
import { useCardsStore } from '@/stores/cards'
import { storeToRefs } from 'pinia'

const cardsStore = useCardsStore()
const { cards } = storeToRefs(cardsStore)

defineEmits<{
  (e: 'openCard', value: ICard): void
}>()
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(6, 14.5vmin);
  grid-template-rows: repeat(6, 14.5vmin);
  justify-content: center;
}

.cards > * {
  max-width: 225px;
  max-height: 225px;
  width: 14vmin;
  height: 14vmin;
}

@media screen and (max-width: 600px) {
  .cards {
    grid-template-columns: repeat(6, 16.5vmin);
    grid-template-rows: repeat(6, 16.5vmin);
  }

  .cards > * {
    width: 16vmin;
    height: 16vmin;
  }
}
</style>
