<template>
  <div class="game-result">
    {{ timerText }}
    <span v-show="result.isTheBest" class="best"> The best!!!</span>
  </div>
</template>

<script setup lang="ts">
import type { TGameResult } from '@/entities/entities'
import { formatUtils } from '@/utils/formatUtils'
import { computed } from 'vue'

const props = defineProps<{
  result: TGameResult
}>()

const timerText = computed(() => formatUtils.formatTimer(props.result.timerValue))
</script>

<style scoped>
.game-result {
  line-height: 27px;
}

.best {
  color: slateblue;
  font-size: 20px;
  margin-left: 12px;
}
</style>
