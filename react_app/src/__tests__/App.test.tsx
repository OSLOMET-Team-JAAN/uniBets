import React from 'react';
import {render, screen} from '@testing-library/react';
import Navbar from "../components/layouts/Navbar";
import HamburgerBar from "../components/layouts/HamburgerBar";
import {MemoryRouter} from "react-router-dom";
import ResizeObserver from '../utils/testing_utils/resizeObserverMock';

// Assign the ResizeObserver mock to the global ResizeObserver variable
global.ResizeObserver = ResizeObserver;

describe('App component', () => {
    beforeEach(() => {
        Object.defineProperty(global, 'innerWidth', {
            writable: true,
            value: 800
        });
    });

    afterEach(() => {
        Object.defineProperty(global, 'innerWidth', {
            writable: true,
            value: window.innerWidth
        });
    });

    test('renders Navbar', () => {
        render(<Navbar />, {wrapper: MemoryRouter});
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    test('renders hamburgerBar', () => {
        Object.defineProperty(global, 'innerWidth', {
            writable: true,
            value: 500
        });
        render(<HamburgerBar />, {wrapper: MemoryRouter})
        expect(screen.getByTestId('hamburgerBar')).toBeInTheDocument();
    });
});

// https://testing-library.com/docs/example-react-router/