export const paginationStore = (set) => ({
    currentPosition: null,
    mapPosition: null,
    setCurrentPosition: (position) =>
        set((state) => ({ ...state, currentPosition: position })),
    setMapPosition: (position) => ({ ...state, mapPosition: position })
});
