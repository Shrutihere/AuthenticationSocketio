import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './src/components/Login';
import Register from './src/components/Register';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';

describe('Frontend Test', () => {
  describe('Testing Socket IO', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('Register component success', async () => {
      jest.doMock('socket.io-client', () => {
        const mSocket = {
          emit: jest.fn(),
          on: jest.fn(),
        };
        return jest.fn(() => mSocket);
      });

      const io = require('socket.io-client');

      const ENDPOINT = 'localhost:8000';
      const mockSocket = io(ENDPOINT);
      render(
        <BrowserRouter>
          <Register socket={mockSocket} />
        </BrowserRouter>
      );

      const usernameInp = screen.getByRole('textbox', { name: /username/i });
      const passwordInp = screen.getByLabelText(/password/i);
      const emailInp = screen.getByRole('textbox', { name: /email address/i });
      const regBtn = screen.getByRole('button', { name: /register/i });

      userEvent.type(usernameInp, 'test1');
      userEvent.type(passwordInp, '123456');
      userEvent.type(emailInp, 'test1@gmail.com');
      userEvent.click(regBtn);

      await waitFor(() => {
        expect(mockSocket.emit).toBeCalledWith('register', {
          email: 'test1@gmail.com',
          password: '123456',
          username: 'test1',
        });
      });
    });

    it('Login component success', async () => {
      jest.doMock('socket.io-client', () => {
        const mSocket = {
          emit: jest.fn(),
          on: jest.fn(),
        };
        return jest.fn(() => mSocket);
      });

      const io = require('socket.io-client');

      const ENDPOINT = 'localhost:8000';
      const mockSocket = io(ENDPOINT);
      render(
        <BrowserRouter>
          <Login socket={mockSocket} />
        </BrowserRouter>
      );

      const usernameInp = screen.getByRole('textbox', { name: /username/i });
      const passwordInp = screen.getByLabelText(/password/i);
      const logBtn = screen.getByRole('button', { name: /log in/i });

      userEvent.type(usernameInp, 'test1');
      userEvent.type(passwordInp, '123456');
      userEvent.click(logBtn);

      await waitFor(() => {
        expect(mockSocket.emit).toBeCalledWith('login', {
          password: '123456',
          username: 'test1',
        });
      });
    });
  });
});
