<template>
  <div v-show="reversedResults.length">
    <div class="results-header">
      <div class="header-name">Results</div>
      <button @click="resultsStore.clear()">Clear Results</button>
    </div>
    <div class="game-results">
      <GameResultItem v-for="result in reversedResults" :key="result.id" :result="result" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameResultItem from '@/components/GameResultItem.vue'
import { useResultsStore } from '@/stores/results'
import { storeToRefs } from 'pinia'

const resultsStore = useResultsStore()

const { reversedResults } = storeToRefs(resultsStore)
</script>

<style>
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
