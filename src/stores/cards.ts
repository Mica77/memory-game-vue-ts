import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { arrayUtils } from '@/utils/arrayUtils'
import type { TCard } from '@/entities/entities'
import { useGameStore } from './game'

type TInitialCard = {
  id: number
  imageUrl: string
}

export const useCardsStore = defineStore('cards', () => {
  const loadingComplete = ref<boolean>(false)
  let initialCards: TInitialCard[] = []
  const cards = ref<TCard[]>([])
  const cardFaceDownUrl = ref<string>('./img/cardFaceDown.jfif')
  const selectedCard = ref<TCard | null>()
  let openCardTimer: ReturnType<typeof setTimeout> | null = null

  const shuffleCards = () => {
    const doubledCards = [...initialCards, ...initialCards].map(
      (card, ind) =>
        <TCard>{
          id: ind,
          cardId: card.id,
          imageUrl: card.imageUrl,
        },
    )

    arrayUtils.shuffle(doubledCards)
    cards.value = doubledCards
  }

  const fetchCards = async () => {
    const json = await import('@/assets/cards.json', { assert: { type: 'json' } })
    initialCards = json.default as TInitialCard[]
    shuffleCards()
    loadingComplete.value = true
  }

  const gameStore = useGameStore()

  const openCard = (card: TCard) => {
    if (!gameStore.gameIsStarted) {
      gameStore.startGame()
    }

    if (openCardTimer) {
      //пока находимся в ожидании реакции на предыдущее действие - игнорируем
      return
    }

    if (card.isDone) {
      //если карточка уже проигралась - игнорируем
      return
    }

    card.isOpen = true

    if (!selectedCard.value) {
      //если это начало хода, то запомним открытую карточку
      selectedCard.value = card
    } else {
      //если это вторая часть хода

      if (selectedCard.value.id === card.id) {
        //повторный клик на той же карточке - игнорируем
        return
      }

      const DELAY = 1000 //задержка, прежде чем отреагировать

      openCardTimer = setTimeout(() => {
        if (!selectedCard.value) {
          return
        }
        if (selectedCard.value.cardId == card.cardId) {
          //если открыли такую же карточку - отметим обе isDone
          selectedCard.value.isDone = true
          card.isDone = true
        } else {
          //если открыли не такую же карточку - закрываем обе карточки
          selectedCard.value.isOpen = false
          card.isOpen = false
        }

        selectedCard.value = null
        openCardTimer = null
      }, DELAY)
    }
  }

  const gameIsOver = computed(() => cards.value.every((card) => card.isDone))

  return {
    loadingComplete,
    cards,
    cardFaceDownUrl,
    fetchCards,
    openCard,
    gameIsOver,
    shuffleCards,
  }
})
