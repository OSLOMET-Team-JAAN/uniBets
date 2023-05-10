﻿import '@testing-library/jest-dom/extend-expect';
import Faq from '../pages/Faq';
import {render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import {renderWithRouter} from "../utils/testing_utils/renderWithRouter";
import 'resize-observer-polyfill';



describe('Faq component testing', () => {

    test('defaults to a closed state', () => {
        render(renderWithRouter(<Faq />));
        const accordion1 = screen.getByTestId('acc-1');
        expect(accordion1.hasAttribute('open')).toEqual(false);
        const accordion2 = screen.getByTestId('acc-2');
        expect(accordion2.hasAttribute('open')).toEqual(false);
        // Expecting other accordions acts in similar
    });

    // Not found working solution to test accordions so was commented until
    // further experience
    
    // test('opens an accordion when its header is clicked', async () => {
    //     render(renderWithRouter(<Faq />));
    //     const header1 = screen.getByTestId('accHeader-1');
    //     const accordion1 = await screen.findByTestId('acc-1');
    //     userEvent.click(header1);
    //     expect(accordion1.hasAttribute('open')).toEqual(true);
    //     screen.debug()
    // });
    //
    // test('closes an open accordion when its header is clicked again', async () => {
    //     render(renderWithRouter(<Faq />));
    //     const header1 = screen.getByTestId('accHeader-1');        
    //     const accordion1 = await screen.findByTestId('acc-1');
    //     userEvent.click(header1);
    //     expect(accordion1.hasAttribute('open')).toEqual(true);
    //     screen.debug()
    //     userEvent.click(header1);
    //     expect(accordion1.hasAttribute('open')).toEqual(false);
    // });
});
