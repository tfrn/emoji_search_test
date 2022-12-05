import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';

describe(() => {
    beforeEach(() => {
        render(<App />);
    });
    test('Başlık kısmının başarılı bir şekilde render edildiğini kontrol edecek olan test', () => {
        expect(screen.getByText("Emoji Search")).toBeInTheDocument();
    });

    test('Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol edecek olan test', () => {
        expect(screen.getAllByText("Click to copy emoji")).toHaveLength(20);
    });

    test('Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde yeniden render edildiğini kontrol edecek olan test', () => {
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'snow' } });

        expect(screen.getAllByText(/snow/i)).toHaveLength(6);
    });

    test('Liste üzerinden herhangi emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol edecek olan test', async () => {
        const emoji = screen.getByText('100');
        userEvent.click(emoji);

        const text = '100';
        userEvent.paste(emoji, text);
        expect(emoji).toHaveTextContent(text);
    });
});