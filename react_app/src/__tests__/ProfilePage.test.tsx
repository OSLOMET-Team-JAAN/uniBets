import {render, screen} from '@testing-library/react';
import Profile from '../pages/Profile';
import {getCurrentUser} from "../services/auth.service";

describe('Profile component', () => {
    test('renders profile page with user information', () => {
        const currentUser = {
            username: 'USER',
            token: 'randomtoken',
            email: 'USER@USER.com',
            role: 'USER',
        };
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(JSON.stringify(currentUser));

        render(<Profile />);

        expect(screen.getByTestId('profilePage')).toBeInTheDocument();
        expect(screen.getByText('Back to Home Page')).toBeInTheDocument();
    });

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
