<template>
  <div class="cards">
    <CardAreaItem v-for="card in cards" :card="card" :key="card.id" @click="openCard(card)" />
  </div>
</template>

<script setup lang="ts">
import CardAreaItem from '@/components/CardAreaItem.vue'
import type { ICard } from '@/entities/entities'
import { useCardsStore } from '@/stores/cards'
import { storeToRefs } from 'pinia'

const cardsStore = useCardsStore()
const { cards } = storeToRefs(cardsStore)

const emits = defineEmits<{
  (e: 'openCard', value: ICard): void
}>()

const openCard = (card: ICard) => {
  emits('openCard', card)
}
</script>

<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vmin;
}

.cards > * {
  max-width: 225px;
  max-height: 225px;
  width: 14vmin;
  height: 14vmin;
  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .cards > * {
    width: 16vmin;
    height: 16vmin;
  }
}
</style>
