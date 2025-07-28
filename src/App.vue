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
      <div class="header-name">Memo game</div>
      <GameTimer @new-game="newGame()" />
    </div>

    <CardArea @open-card="openCard" />

    <div class="footer">
      <GameResultList />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
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

.header-name {
  font-size: 2em;
  padding: 0.67em 0;
  font-weight: bold;
}

button {
  padding: 0.5em;
}

@media screen and (max-width: 606px) {
  .content {
    max-width: inherit;
  }

  .header,
  .footer {
    padding: 0.5rem;
  }

  .header-name {
    padding: 0.5rem 0;
  }
}
</style>
