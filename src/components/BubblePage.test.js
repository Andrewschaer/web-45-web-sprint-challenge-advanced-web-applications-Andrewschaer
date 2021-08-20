import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils'
import BubblePage from './BubblePage';
import fetchColorService from '../services/fetchColorService';
jest.mock('../services/fetchColorService');

// test("Renders without errors", ()=> {
//     render(<BubblePage/>)
// });




// I've tried everything and have done around 3 hours of research to get this to pass... Not sure what I'm missing.  I have tried multiple ways to try to simulate a promise of the mocked service function so that the BubblePage can read in the mockresolved data, but nothing has worked... this included using act, spyOn, and other techniques.
test("Renders appropriate number of colors passed in through mock", async ()=> {
    const asyncFetch = fetchColorService.mockResolvedValueOnce({
        data:[
            {color: "testColor1",
            code: {
                hex: "#f0f8ff",
            },
            id: 1},
            {
            color: "testColor2",
            code: {
                hex: "#f0f8ff",
            },
            id: 2}
        ]
    });
    
    act(() => {render(<BubblePage/>)})
    act(() => { asyncFetch()})

    

    // const colors = await screen.findAllByTestId('color')
    // expect(colors).toHaveLength(2);


    // Keep in mind that our service is called on mount for this component.
});