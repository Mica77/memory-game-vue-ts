<template>
  <div class="card">
    <transition name="overturn">
      <img v-show="!!card.isOpen" :src="card.imageUrl" />
    </transition>
    <transition name="overturn">
      <img v-show="!card.isOpen" :src="cardFaceDownUrl" @click="$emit('open', card)" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { ICard } from '@/entities/entities'

defineProps<{
  card: ICard
}>()

const cardFaceDownUrl = './img/cardFaceDown.jfif'

defineEmits<{
  (e: 'open', value: ICard): void
}>()
</script>

<style scoped>
.card {
  user-select: none;
}

.card img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}

.overturn-leave-active {
  transition: transform 0.3s ease-in;
}

.overturn-leave-to {
  transform: scaleX(0);
}

.overturn-enter-active {
  transition: transform 0.3s ease-in;
  display: none;
}
</style>
