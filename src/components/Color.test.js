import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const blankTestColor = {
    color: "",
    code: {
        hex: "",
    },
    id: null
}

test("Renders without errors with blank color passed into component", () => {
    render (<Color color={blankTestColor}/>);
});

const testColor = {
    color: "testColor",
    code: {
        hex: "#f0f8ff",
    },
    id: 1
}
  
test("Renders the color passed into component", () => {
    render (<Color color={testColor}/>);
    const colorName = screen.queryByText(/testColor/i);
    expect(colorName).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const fakeToggleEdit = jest.fn();
    const fakeDeleteColor = jest.fn();
    render (<Color color={testColor} toggleEdit={fakeToggleEdit} deleteColor={fakeDeleteColor}/>);
    const deleteButton = screen.queryByTestId('delete')
    userEvent.click(deleteButton);
    expect(fakeToggleEdit).toBeCalledTimes(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const fakeSetEditColor = jest.fn();
    const fakeToggleEdit = jest.fn();
    const fakeSetEditColorID = jest.fn();
    render (<Color color={testColor} setEditColor={fakeSetEditColor} toggleEdit={fakeToggleEdit} setEditColorID={fakeSetEditColorID}/>);
    const colorDiv = screen.queryByTestId('color');
    userEvent.click(colorDiv);
    expect(fakeSetEditColor).toBeCalledTimes(1);
    expect(fakeToggleEdit).toBeCalledTimes(1);
});