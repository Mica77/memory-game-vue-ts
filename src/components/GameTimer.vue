<template>
  <div class="game-timer">
    <button @click="$emit('new-game')">New Game</button>

    <div class="timer">{{ timerText }}</div>
  </div>
</template>

<script setup lang="ts">
import { useGameTimerStore } from '@/stores/gameTimer'
import { formatUtils } from '@/utils/formatUtils'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const gameTimerStore = useGameTimerStore()
const { timerValue } = storeToRefs(gameTimerStore)

defineEmits<{
  (e: 'new-game'): void
}>()

const timerText = computed(() => formatUtils.formatTimer(timerValue.value))
</script>

<style>
.game-timer {
  display: flex;
  padding-left: 6px;
  align-items: center;
}

.timer {
  font-size: 26px;
  padding-left: 20px;
}

@media screen and (max-width: 606px) {
  .timer {
    font-size: 20px;
    padding-left: 10px;
  }
}
</style>
