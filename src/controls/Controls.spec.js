import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Controls from './Controls.js';
import Dashboard from '../dashboard/Dashboard.js';

test('controls renders correctly.', () => {
    expect(render(<Controls/>)).toMatchSnapshot();
});

test('provide buttons to toggle the closed and locked states', () => {
    const { getByText } = render(<Controls />);
    const button = getByText(/Close Gate/i)

    fireEvent.click(button);
    getByText(/close gate/i);
    getByText(/lock gate/i);
});

test('buttons text changes to refelect the state the door will be in if click', () => {
    const { getByText } = render(
    <Dashboard />);
    
    const actionButton = getByText("Close Gate");
    const lockButton = getByText('Lock Gate');
    fireEvent.click(actionButton);
    getByText("Open Gate")
    fireEvent.click(lockButton);
    getByText('Unlock Gate');

});

test('the closed toggle button is disabled if the gate is locked', () => {
    const toggleLocked = jest.fn();
    const { getByText } = render(
        <Controls locked={false} closed={true} toggleLocked={toggleLocked} />) 

        const lockButton = getByText('Lock Gate');
        fireEvent.click(lockButton);
        expect(toggleLocked).toHaveBeenCalled()
});

test("the locked toggle button is disabled if the gate is open", () => {
    const toggleClosed = jest.fn();
    const {getByText} = render(
    <Controls locked={true} toggleClosed={toggleClosed}/>);
    
    const actionButton = getByText("Close Gate");
    fireEvent.click(actionButton);
    expect(toggleClosed).not.toHaveBeenCalled()
})

