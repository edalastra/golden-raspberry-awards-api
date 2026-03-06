import { AwardsRepository } from "../domain/respositories/awards.repository.js";
import { AwardsIntervalResponse, AwardWinnerInterval } from "../models/awards-response.model.js";
import { MultipleWinners } from "../models/multiple-winners.model.js";

export class AwardWinnerIntervalService {
    constructor(
        private readonly awardsRepository: AwardsRepository
    ) {}

    public async getAwardWinnersInterval(): Promise<AwardsIntervalResponse> {
        const multipleWinners = await this.awardsRepository.getMultipleWinners();

        const allIntervals = this.getFlattenedWinners(multipleWinners);
        const minIntervalValue = Math.min(...allIntervals.map(producer => producer.interval));
        const maxIntervalValue = Math.max(...allIntervals.map(producer => producer.interval));

        const minInterval = this.filterIntervalByValue(allIntervals, minIntervalValue);
        const maxInterval = this.filterIntervalByValue(allIntervals, maxIntervalValue);

        const awardsIntervalResponse: AwardsIntervalResponse = {
            min: minInterval,
            max: maxInterval
        };
        return awardsIntervalResponse;
    }

    private filterIntervalByValue(intervals: AwardWinnerInterval[], value: number): AwardWinnerInterval[] {
        return intervals.filter(producer => producer.interval === value); 
    }

    private getFlattenedWinners(multipleWinners: MultipleWinners[]): AwardWinnerInterval[] {
        return multipleWinners.flatMap(producer => {
            const years = producer.movies.map(movie => movie.year);
            return years.slice(1).map((year, i): AwardWinnerInterval => ({
                producer: producer.name,
                interval: year - years[i],
                previousWin: years[i],
                followingWin: year
            }));
        });
    }
}