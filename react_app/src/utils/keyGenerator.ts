function getUniqueKey(): string {
    const getDate = Date
            .now()
            .toString(36); //Converting num to base 42 and stringify

    const getRandomStr = Math
        .random()
        .toString(36)
        .substring(2, 6); //

    const getRandomNumber = (min=1, max=1000): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min + 1)) + min;
    }
    return getDate+getRandomStr+(getRandomNumber().toString());
}


export default getUniqueKey();