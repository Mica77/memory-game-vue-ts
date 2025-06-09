<template>
  <div v-show="results.length">
    <h1>Results</h1>
    <div class="game-results">
      <game-result-item v-for="result in results" :key="result.id" :result="result" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameResultItem from '@/components/GameResultItem.vue'
import type { TGameResult } from '@/entities/entities'

defineProps<{
  results: TGameResult[]
}>()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
