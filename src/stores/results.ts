import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IGameResult } from '@/entities/entities'

export const useResultsStore = defineStore('results', () => {
  const resultsArray = ref<number[]>([])

  const STORAGE_GAME_RESULTS = 'game-results'

  const fetchResults = () => {
    const results = localStorage.getItem(STORAGE_GAME_RESULTS)
    if (results) {
      try {
        const arr = JSON.parse(results)
        if (Array.isArray(arr) && arr.every((timerValue) => typeof timerValue === 'number')) {
          resultsArray.value = arr
        }
      } catch {}
    }
  }

  const addResult = (timerValue: number) => {
    resultsArray.value.push(timerValue)
    localStorage.setItem(STORAGE_GAME_RESULTS, JSON.stringify(resultsArray.value))
  }

  const clear = () => {
    resultsArray.value = []
    localStorage.setItem(STORAGE_GAME_RESULTS, JSON.stringify(resultsArray.value))
  }

  const reversedResults = computed(() => {
    const bestTimerValue = Math.min(...resultsArray.value)
    const worstTimerValue = Math.max(...resultsArray.value)
    return resultsArray.value
      .map(
        (timerValue, i) =>
          <IGameResult>{
            id: i,
            timerValue: timerValue,
            isTheBest: resultsArray.value.length > 1 && timerValue == bestTimerValue,
            isTheWorst: resultsArray.value.length > 1 && timerValue == worstTimerValue,
          },
      )
      .reverse()
  })

  return { reversedResults, addResult, fetchResults, clear }
})
