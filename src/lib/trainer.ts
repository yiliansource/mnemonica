import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export interface TrainerStats {
    passed: number;
    failed: number;
}

const trainerStatsAtom = atomWithImmer({ passed: 0, failed: 0 } as TrainerStats);

export const useTrainerStats = () => useAtom(trainerStatsAtom);
