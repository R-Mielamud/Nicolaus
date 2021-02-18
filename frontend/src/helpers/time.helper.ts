export const getTime = () => {
    return performance.now();
};

export const getTimeFromStart = (start: number) => {
    return getTime() - start;
};

export const isGoodTimeFromStart = (start: number, goodTimeSeconds: number) => {
    return getTimeFromStart(start) >= goodTimeSeconds * 1000;
};
