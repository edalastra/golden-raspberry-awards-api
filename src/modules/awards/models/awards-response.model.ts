export interface AwardWinnerInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface AwardsIntervalResponse {
    min: AwardWinnerInterval[];
    max: AwardWinnerInterval[];
}