<template>
  <div class="cards">
    <card-area-item
      v-for="card in cards"
      :card="card"
      :key="card.id"
      :card-face-down-url="cardFaceDownUrl"
      @open="$emit('openCard', card)"
    />
  </div>
</template>

<script setup lang="ts">
import CardAreaItem from '@/components/CardAreaItem.vue'
import type { TCard } from '@/entities/entities'

defineProps<{
  cards: TCard[]
  cardFaceDownUrl: string
}>()

defineEmits<{
  (e: 'openCard', value: TCard): void
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
