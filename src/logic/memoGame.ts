import type { ICard } from '@/entities/entities'
import { useCardsStore } from '@/stores/cards'
import { useGameTimerStore } from '@/stores/gameTimer'
import { useResultsStore } from '@/stores/results'

export class MemoGame {
  selectedCard?: ICard | null
  openCardTimer: ReturnType<typeof setTimeout> | null = null

  gameTimerStore: ReturnType<typeof useGameTimerStore>
  cardsStore: ReturnType<typeof useCardsStore>

  constructor() {
    this.gameTimerStore = useGameTimerStore()
    this.cardsStore = useCardsStore()
  }

  public async load() {
    await Promise.allSettled([this.cardsStore.fetchCards(), useResultsStore().fetchResults()])
  }

  public newGame() {
    if (this.openCardTimer) clearInterval(this.openCardTimer)
    this.openCardTimer = null

    this.cardsStore.shuffleCards()

    this.gameTimerStore.stopTimer()
    this.gameTimerStore.resetTimer()

    this.selectedCard = null
  }

  public openCard(card: ICard) {
    if (!this.gameTimerStore.isStarted()) {
      this.gameTimerStore.startTimer()
    }

    if (card.isDone) {
      //если карточка уже проигралась - игнорируем
      return
    }

    card.isOpen = true

    if (!this.selectedCard) {
      //если это начало хода, то запомним открытую карточку
      this.selectedCard = card
      return
    }

    //если это вторая часть хода
    if (this.selectedCard.id === card.id) {
      //повторный клик на той же карточке - игнорируем
      return
    }

    this.handleGameMove(this.selectedCard, card)

    this.selectedCard = null
  }

  async handleGameMove(firstCard: ICard, secondCard: ICard) {
    if (firstCard.cardId == secondCard.cardId) {
      //если открыли такую же карточку
      const closedCards = this.cardsStore.closedCards
      const isPenultMove = closedCards.length === 2
      if (isPenultMove) {
        this.executeGameMovie(firstCard, secondCard)

        const firstPenultCard = closedCards[0]
        const secondPenultCard = closedCards[1]
        firstPenultCard.isOpen = true
        secondPenultCard.isOpen = true
        this.executeGameMovie(firstPenultCard, secondPenultCard)

        //Игра закончилась
        this.closeGameWithResult()
        return
      }
    }

    ///////////////////////////////

    const DELAY = 1000 //задержка, прежде чем отреагировать

    await new Promise((resolve) => {
      if (this.openCardTimer) clearInterval(this.openCardTimer)
      this.openCardTimer = setTimeout(() => {
        this.openCardTimer = null
        resolve(true)
      }, DELAY)
    })

    //////////////////////////

    this.executeGameMovie(firstCard, secondCard)
  }

  executeGameMovie(firstCard: ICard, secondCard: ICard) {
    if (firstCard.cardId == secondCard.cardId) {
      //если открыли такую же карточку - отметим обе isDone
      firstCard.isDone = true
      secondCard.isDone = true
    } else {
      //если открыли не такую же карточку - закрываем обе карточки
      firstCard.isOpen = false
      secondCard.isOpen = false
    }
  }

  closeGameWithResult() {
    //Игра закончилась
    useResultsStore().addResult(this.gameTimerStore.timerValue)
    this.gameTimerStore.stopTimer()
  }

  destroy() {
    if (this.openCardTimer) clearInterval(this.openCardTimer)
  }
}
