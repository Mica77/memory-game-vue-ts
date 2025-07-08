import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { arrayUtils } from '@/utils/arrayUtils'
import type { ICard } from '@/entities/entities'

interface IInitialCard {
  id: number
  imageUrl: string
}

export const useCardsStore = defineStore('cards', () => {
  let initialCards: IInitialCard[] = []
  const cards = ref<ICard[]>([])

  const shuffleCards = () => {
    const lastInd = cards.value.length ? cards.value.length + cards.value[0].id : 0
    const doubledCards = [...initialCards, ...initialCards].map(
      (card, ind) =>
        <ICard>{
          id: ind + lastInd,
          cardId: card.id,
          imageUrl: card.imageUrl,
        },
    )

    arrayUtils.shuffle(doubledCards)
    cards.value = doubledCards
  }

  const fetchCards = async () => {
    const json = await import('@/assets/cards.json', { assert: { type: 'json' } })
    initialCards = json.default as IInitialCard[]
    shuffleCards()
  }

  const closedCards = computed(() => cards.value.filter((currentCard) => !currentCard.isOpen))

  return {
    cards,
    fetchCards,
    shuffleCards,
    closedCards,
  }
})
