import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import {MemoryRouter} from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import HamburgerBar from "../components/layouts/HamburgerBar";

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
        const { getByTestId } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(getByTestId('navbar')).toBeInTheDocument();
    });

    test('renders hamburgerBar', () => {
        Object.defineProperty(global, 'innerWidth', {
            writable: true,
            value: 500
        });
        const { getByTestId } = render(
            <MemoryRouter>
                <HamburgerBar />
            </MemoryRouter>
        );
        expect(getByTestId('hamburgerBar')).toBeInTheDocument();
    });
});
