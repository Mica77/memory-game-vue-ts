import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useCardsStore } from './cards'
import { useResultsStore } from './results'

export const useGameStore = defineStore('game', () => {
  const timerValue = ref<number>(0)
  const gameIsStarted = ref<boolean>()
  let timer: ReturnType<typeof setInterval> | null = null

  const cardsStore = useCardsStore()
  const resultsStore = useResultsStore()

  const allowStartGame = computed(() => !gameIsStarted.value && cardsStore.loadingComplete)

  const startGame = () => {
    if (!allowStartGame.value) {
      return
    }

    if (cardsStore.gameIsOver) {
      console.log('gameIsOver')
      //если предыдущая игра закончена
      cardsStore.shuffleCards()
    }

    timerValue.value = 0
    gameIsStarted.value = true

    timer = setInterval(() => {
      timerValue.value++

      if (cardsStore.gameIsOver) {
        // Игра закончилась
        if (timer) clearInterval(timer)
        stopGame()
      }
    }, 1000)
  }

  const stopGame = () => {
    gameIsStarted.value = false
    resultsStore.addResult(timerValue.value)
  }

  return { timerValue, allowStartGame, startGame, gameIsStarted }
})
