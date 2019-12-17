import React from 'react';
import { render } from '@testing-library/react';
import Display from './Display.js';


test('dashboard renders correctly.', () => {
    expect(render(<Display/>)).toMatchSnapshot();
});

test('displays if gate is open/closed and if it is locked/unlocked', () => {
    const { queryByText } = render(
    <Display closed={false} locked={false} />);
    queryByText(/Unlocked/);
    queryByText(/Open/);

    const { getAllByText } = render(
    <Display closed={true} locked={true} />);
    getAllByText(/Locked/);
    getAllByText(/Closed/); 
});

test('displays Closed if the closed prop is true and Open if otherwise', () => {
    const { queryByText } = render(
    <Display locked={false} closed={true} />);
    queryByText(/Closed/);
});

test('displays Locked if the locked prop is true and Unlocked if otherwise', () => {
    const { queryByText } = render(
    <Display locked={false} closed={false} />);
    queryByText(/locked/);
});

test('when locked or closed use the red-led class', () => {
    const { queryByText } = render(
    <Display locked={true} closed={true} />);
    
    const locked = queryByText(/Locked/);
    expect(locked.className).toBe('led red-led');
   
    const closed = queryByText(/Closed/);
    expect(closed.className).toBe('led red-led');
});

test('when unlocked or open use the green-led class', () => {
    const { queryByText } = render(
    <Display locked={false} closed={false} />);
    
    const unlockedButton = queryByText(/Unlocked/);
    expect(unlockedButton.className).toBe('led green-led');
    
    const openGate = queryByText(/Open/);
    expect(openGate.className).toBe('led green-led');
});





