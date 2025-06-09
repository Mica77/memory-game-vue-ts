export type TCard = {
  id: number
  cardId: number
  imageUrl: string
  isOpen?: boolean
  isDone?: boolean
}

export type TGameResult = {
  id: number
  timerValue: number
  isTheBest: boolean
}
