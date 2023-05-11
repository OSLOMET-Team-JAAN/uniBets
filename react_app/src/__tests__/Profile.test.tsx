import {getCurrentUser} from "../services/auth.service";
import {getLoginMock} from "../utils/testing_utils/mocks";
import ResizeObserver from '../utils/testing_utils/resizeObserverMock';

// Assign the ResizeObserver mock to the global ResizeObserver variable
global.ResizeObserver = ResizeObserver;



const currentUser = {
    username: 'USER',
    token: 'randomtoken',
    email: 'USER@USER.com',
    role: 'USER',
};

describe('Profile component', () => {   
    test('getCurrentUser function returns user from localStorage', () => {
        getLoginMock(currentUser)
        expect(getCurrentUser()).toEqual(currentUser);
    });

    test('getCurrentUser function returns null if no user found in localStorage', () => {
        getLoginMock(null)
        expect(getCurrentUser()).toBeNull();
    });
});
