import {render, screen, waitFor} from '@testing-library/react';
import Navbar from '../components/layouts/Navbar';
import React from "react";
import {withRouter} from "../utils/testing_utils/withRouter";
import App from "../App";
import {getLoginMock} from "../utils/testing_utils/mocks";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import AdminPage from "../pages/AdminPage";
import Inbox from "../pages/Inbox";
import 'resize-observer-polyfill';
import {MemoryRouter} from "react-router-dom";
import Faq from "../pages/Faq";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import RegistrationPage from "../pages/RegistrationPage";
import Login from "../pages/Login";
import UserPage from "../pages/UserPage";
/* 
Error: Uncaught [TypeError: window.ResizeObserver is not a constructor]
This error can occur if you're running the tests in an environment that does not support the ResizeObserver API, such 
as a headless browser or a Node.js environment without the necessary polyfills.
was installed npm install resize-observer-polyfill --save-dev and import 'resize-observer-polyfill';
*/

/* LOGINS FOR PRIVATE PAGES*/
const login = {
    admin: {
        username: 'ADMIN',
        token: 'random token',
        email: 'ADMIN@ADMIN.com',
        role: 'ADMIN',
        },
    user: {
        username: 'USER',
        token: 'random token',
        email: 'USER@USER.com',
        role: 'USER',
    },
}

// This test checks that the component renders without errors and that all the links in the navbar are present.
test('Navbar component renders', () => {
    render(withRouter(<Navbar />, '/'));
    const homeLink = screen.getByTestId('homePage-link');
    const faqLink = screen.getByTestId('faqPage-link');
    const contactLink = screen.getByTestId('contactPage-link');
    const loginPageLink = screen.getByTestId('loginPage-link');
    const registrationPageLink = screen.getByTestId('registrationPage-link');
    expect(homeLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(loginPageLink).toBeInTheDocument();
    expect(registrationPageLink).toBeInTheDocument();
});

// This test simulates being logged in as a USER and checks that the "User Page" link is present.
test('UserBoard appears after USER login', () => {
    // Simulate logged in user
    getLoginMock(login.user);
    render(<Navbar />, {wrapper: MemoryRouter})
    const userPageLink = screen.getByTestId('userPage-link');
    expect(userPageLink).toBeInTheDocument();
});

// This test simulates being logged in as an ADMIN and checks that the "Inbox", "Dashboard", and "Admin Page" links are present.
test('AdminBoard appears after ADMIN login', () => {
    // Simulate logged in admin
    getLoginMock(login.admin);
    render(<Navbar />, {wrapper: MemoryRouter})
    const inboxLink = screen.getByTestId('inboxPage-link');
    const dashboardLink = screen.getByTestId('dashboardPage-link');
    const adminPageLink = screen.getByTestId('adminPage-link');
    expect(inboxLink).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
    expect(adminPageLink).toBeInTheDocument();
});

// This test simulates being logged in and checks that the "Profile" and "LogOut" links are present.
test('Navbar component shows profile and logout links when logged in', () => {
    // Simulate logged in user
    getLoginMock(login.user);
    render(<Navbar />, {wrapper: MemoryRouter})
    const profilePageLink = screen.getByTestId('profilePage-link');
    const logoutLink = screen.getByText('LogOut');
    expect(profilePageLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
});

// This test checks that the "Login" and "SignUp" links are present when the user is not logged in.
test('Navbar component shows login and registration links when not logged in', () => {
    render(<Navbar />, {wrapper: MemoryRouter})
    const loginPageLink = screen.getByTestId('loginPage-link');
    const registrationPageLink = screen.getByTestId('registrationPage-link');
    expect(loginPageLink).toBeInTheDocument();
    expect(registrationPageLink).toBeInTheDocument();
});

/*  ---- TESTING ROUTER ---------------*/
describe('Router tests', () => {
    test('renders not found page', () => {       
        render(withRouter(<App />, '/notExistPage'));
        const notFoundPages = screen.queryByTestId('notFoundPage');
        expect(notFoundPages).toBeInTheDocument();
    });

    test('renders Contact page', () => {
        render(<Contact />, {wrapper: MemoryRouter})
        expect(screen.queryByTestId('contactPage')).toBeInTheDocument();
    });

    test('renders Home page', () => {
        render(<Home />, {wrapper: MemoryRouter})
        expect(screen.queryByTestId('homePage')).toBeInTheDocument();
    });

    test('renders FAQ page', () => {
        render(<Faq />, {wrapper: MemoryRouter})
        expect(screen.queryByTestId('faqPage')).toBeInTheDocument();
    });

    test('renders Registration page', () => {
        render(<RegistrationPage />, {wrapper: MemoryRouter})
        expect(screen.queryByTestId('registrationPage')).toBeInTheDocument();
    });

    test('renders Login page', () => {
        render(<Login />, {wrapper: MemoryRouter})
        expect(screen.queryByTestId('loginPage')).toBeInTheDocument();
    }); 
});

describe('Router testing of PRIVATE pages',() =>{
    getLoginMock(login.user);
    test('renders User page', () => {
        render(<UserPage />, {wrapper: MemoryRouter})
        expect(screen.queryByTestId('userPage')).toBeInTheDocument();
    });
    
    // Simulate logged in admin
    beforeEach(() => {
        getLoginMock(login.admin);
    })
    
    
    test('renders Dashboard page component after ADMIN login', async () => {
        getLoginMock(login.admin);
        render(<Dashboard />, {wrapper: MemoryRouter})
        await waitFor(() => {
            expect(screen.getByTestId('dashboardPage')).toBeInTheDocument();
        })
    });
    
    test('renders Admin page component after ADMIN login', async () => {
        render(<AdminPage />, {wrapper: MemoryRouter})
        await waitFor(() => {
            expect(screen.getByTestId('adminPage')).toBeInTheDocument();
        })
    });

    test('renders Inbox page component after ADMIN login', async () => {
        render(<Inbox />, {wrapper: MemoryRouter})
        await waitFor(() => {
            expect(screen.getByTestId('inboxPage')).toBeInTheDocument();
        })
    });

    test('renders Profile page component after ADMIN login', async () => {
        getLoginMock(login.admin);
        render(<Profile />, {wrapper: MemoryRouter})
        await waitFor(() => {
            expect(screen.getByTestId('profilePage')).toBeInTheDocument();
        })
    });
});


// https://testing-library.com/docs/example-react-router/