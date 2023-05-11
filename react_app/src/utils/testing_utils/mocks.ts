export const getLoginMock = (data: {}) => {
    return jest.spyOn(
        Object.getPrototypeOf(window.localStorage), 
        'getItem'
    )
        .mockReturnValueOnce(JSON.stringify(data));
}