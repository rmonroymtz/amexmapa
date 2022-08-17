export const positionStore = (set) => ({
    currentPosition: null,
    mapPosition: null,
    errorGetPosition: false,
    setCurrentPosition: (position) =>
        set((state) => ({ ...state, currentPosition: position })),
    setMapPosition: (position) =>
        set((state) => ({ ...state, mapPosition: position })),
    setErrorGetPosition: (error) =>
        set((state) => ({
            state,
            errorGetPosition: { error: true, errorData: error }
        }))
});
