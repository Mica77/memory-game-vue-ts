<template>
  <div class="cards-item">
    <transition name="overturn">
      <img v-show="!card.isOpen" class="card face-down" :src="cardFaceDownUrl" />
    </transition>
    <transition name="overturn">
      <img v-show="!!card.isOpen" class="card face-up" :src="card.imageUrl" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { ICard } from '@/entities/entities'

defineProps<{
  card: ICard
}>()

const cardFaceDownUrl = './img/cardFaceDown.jfif'
</script>

<style>
.cards-item {
  position: relative;
}

.card {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  user-select: none;
  display: block;
}

.card.face-up {
  cursor: default;
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
