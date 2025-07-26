<script setup lang="ts">
import CardArea from '@/components/CardArea.vue'
import GameTimer from '@/components/GameTimer.vue'
import GameResultList from '@/components/GameResultList.vue'
import { MemoGame } from './logic/memoGame'
import type { ICard } from './entities/entities'

const game = new MemoGame()
game.load()

const newGame = () => game.newGame()
const openCard = (card: ICard) => game.openCard(card)
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Memo game</h1>
      <GameTimer @new-game="newGame()" />
    </div>

    <CardArea @open-card="openCard" />

    <GameResultList />
  </div>
</template>

<style>
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

button {
  padding: 0.5em;
}
</style>
