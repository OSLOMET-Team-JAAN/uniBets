import {getCurrentUser} from "../services/auth.service";

describe('Profile component', () => {   
    test('getCurrentUser function returns user from localStorage', () => {
        const currentUser = {
            username: 'USER',
            token: 'randomtoken',
            email: 'USER@USER.com',
            role: 'USER',
        };
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(JSON.stringify(currentUser));

        expect(getCurrentUser()).toEqual(currentUser);
    });

    test('getCurrentUser function returns null if no user found in localStorage', () => {
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(null);

        expect(getCurrentUser()).toBeNull();
    });
});
