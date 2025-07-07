import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameTimerStore = defineStore('game-timer', () => {
  const timerValue = ref<number>(0)

  let timer: ReturnType<typeof setInterval> | null = null

  const stopTimer = () => {
    if (timer) clearInterval(timer)
    timer = null
  }

  const resetTimer = () => {
    timerValue.value = 0
  }

  const startTimer = () => {
    stopTimer()

    resetTimer()

    timer = setInterval(() => {
      timerValue.value++
    }, 1000)
  }

  const isStarted = () => !!timer

  return { timerValue, stopTimer, startTimer, resetTimer, isStarted }
})
