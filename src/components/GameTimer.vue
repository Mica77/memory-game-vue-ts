<template>
  <div class="game-timer">
    <button v-if="allowStartGame" @click="$emit('start')">Start</button>

    <div class="timer">{{ timerText }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatUtils } from '@/utils/formatUtils'
import { computed } from 'vue'

const props = defineProps<{
  allowStartGame: boolean
  timerValue: number
}>()

defineEmits<{
  (e: 'start'): void
}>()

const timerText = computed(() => formatUtils.formatTimer(props.timerValue))
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-timer {
  display: flex;
  padding-left: 6px;
}

.timer {
  font-size: 26px;
  padding-left: 20px;
}
</style>
