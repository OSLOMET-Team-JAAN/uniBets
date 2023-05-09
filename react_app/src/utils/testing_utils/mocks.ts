export const getLoginMock = (data: any) => {
    return jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValueOnce(JSON.stringify(data));
}