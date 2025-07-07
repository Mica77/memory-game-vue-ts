export interface ICard {
  id: number
  cardId: number
  imageUrl: string
  isOpen?: boolean
  isDone?: boolean
}

export interface IGameResult {
  id: number
  timerValue: number
  isTheBest: boolean
  isTheWorst: boolean
}
