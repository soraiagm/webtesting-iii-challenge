import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard.js';


test('dashboard renders correctly.', () => {
    expect(render(<Dashboard/>)).toMatchSnapshot();
});