import React from 'react';

import { render, waitForElement, fireEvent } from '@testing-library/react';

import App from '../App';

describe('Tests for Homepage component', () => {
  it('should display searched movies section', async () => {
    const { getByTestId } = render(<App />);
    const inputField = await waitForElement(() => getByTestId('input-field'));
    const inputValue = 'avenger';
    fireEvent.change(inputField, { target: { value: inputValue } });
    expect(inputField.value).toEqual(inputValue);

    const searchedSection = await waitForElement(() =>
      getByTestId('searched-field')
    );
    expect(searchedSection).toBeDefined();
  });
});

describe('Test for Homepage component', () => {
  it('should close searched movies section', async () => {
    const { getByTestId, queryByTestId, debug } = render(<App />);
    const inputField = await waitForElement(() => getByTestId('input-field'));
    const inputValue = 'avenger';
    const withoutValue = '';

    fireEvent.change(inputField, { target: { value: inputValue } });
    debug();
    fireEvent.change(inputField, { target: { value: withoutValue } });
    debug();
    expect(queryByTestId('searched-field')).toBeNull();
  });
});
