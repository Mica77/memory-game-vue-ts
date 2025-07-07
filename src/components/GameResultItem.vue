<template>
  <div class="game-result">
    {{ timerText }}
    <span v-show="result.isTheBest" class="game-result__note"> The best!!!</span>
    <span v-show="result.isTheWorst" class="game-result__note"> The worst!!!</span>
  </div>
</template>

<script setup lang="ts">
import type { IGameResult } from '@/entities/entities'
import { formatUtils } from '@/utils/formatUtils'
import { computed } from 'vue'

const props = defineProps<{
  result: IGameResult
}>()

const timerText = computed(() => formatUtils.formatTimer(props.result.timerValue))
</script>

<style>
.game-result {
  line-height: 27px;
}

.game-result__note {
  color: slateblue;
  font-size: 20px;
  margin-left: 12px;
}
</style>
