import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';
import Color from './Color';

const emptyColors = [];

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={emptyColors}/>);
});

const testColors = [{
    color: "testColor1",
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

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColors}/>);
    const colorName1 = screen.queryByText(/testColor1/i);
    const colorName2 = screen.queryByText(/testColor2/i);
    expect(colorName1).toBeInTheDocument();
    expect(colorName2).toBeInTheDocument();
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={testColors} editing={true}/>);
    let editForm = screen.queryByTestId('edit_menu');
    expect(editForm).toBeInTheDocument();
    rerender(<ColorList colors={testColors} editing={false}/>);
    editForm = screen.queryByTestId('edit_menu');
    expect(editForm).not.toBeInTheDocument();
});
