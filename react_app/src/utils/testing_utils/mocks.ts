export const getLoginMock = (data: {} | null) => {
    return jest.spyOn(
        Object.getPrototypeOf(window.localStorage), 
        'getItem'
    )
        .mockReturnValueOnce(JSON.stringify(data));
}