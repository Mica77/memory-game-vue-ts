<script setup lang="ts">
import CardArea from '@/components/CardArea.vue'
import GameTimer from '@/components/GameTimer.vue'
import GameResultList from '@/components/GameResultList.vue'
import { useCardsStore } from './stores/cards'
import { storeToRefs } from 'pinia'
import { useResultsStore } from './stores/results'
import { useGameStore } from './stores/game'

const cardsStore = useCardsStore()
const resultsStore = useResultsStore()
const gameStore = useGameStore()

const { cards, cardFaceDownUrl } = storeToRefs(cardsStore)
const { reversedResults } = storeToRefs(resultsStore)
const { allowStartGame, timerValue } = storeToRefs(gameStore)

cardsStore.fetchCards()
resultsStore.fetchResults()
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Memo game</h1>
      <game-timer
        @start="gameStore.startGame"
        :allow-start-game="allowStartGame"
        :timer-value="timerValue"
      />
    </div>

    <card-area
      :cards="cards"
      :card-face-down-url="cardFaceDownUrl"
      @open-card="cardsStore.openCard"
    />

    <game-result-list :results="reversedResults" />
  </div>
</template>

<style scoped>
@media screen and (min-width: 960px) {
  html {
    margin-left: calc(100vw - 100%);
    margin-right: 0;
  }
}

#app {
  font-family: Helvetica, Arial, sans-serif;
}

.content {
  max-width: 87vmin;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
