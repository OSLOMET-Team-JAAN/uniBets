import React from 'react';
import {render, screen} from '@testing-library/react';
import Navbar from "../components/layouts/Navbar";
import HamburgerBar from "../components/layouts/HamburgerBar";
import {renderWithRouter} from "../utils/testing_utils/renderWithRouter";
import 'resize-observer-polyfill';

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
       render(renderWithRouter(<Navbar />))
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    test('renders hamburgerBar', () => {
        Object.defineProperty(global, 'innerWidth', {
            writable: true,
            value: 500
        });
        render(renderWithRouter(<HamburgerBar />))
        expect(screen.getByTestId('hamburgerBar')).toBeInTheDocument();
    });
});
