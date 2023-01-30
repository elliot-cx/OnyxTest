export class Game {
    constructor(
        public gameId: number,
        public playerName: string,
        public bestTime: number,
        public averageTime: number,
        public dateTime: Date
    ){}
}