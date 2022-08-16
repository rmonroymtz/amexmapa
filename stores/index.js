import create from 'zustand';
import { positionStore } from './position';

const mapStore = (set) => ({
    bears: 0,
    addBear: () => set(({ bears, ...state }) => ({ ...state, bears }))
});

export const useBoundStore = create((...a) => ({
    ...positionStore(...a)
}));
