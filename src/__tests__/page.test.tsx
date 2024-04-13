import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Board from '@/components/ui/Board';
import Cards from '@/components/ui/Cards';
import { TaskStatus, TaskPriority, Task } from '@/types/SchemasTypes';

// Mocking the useDispatch hook
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
}));

// Mocking axios
jest.mock('axios');

describe('Board Component', () => {
    it('renders with initial state', () => {
        const { getByText, getByLabelText } = render(
            <Board column={TaskStatus.ToDo} projectId="projectId">
                hi
            </Board>
        );

        expect(getByText('ToDo')).toBeInTheDocument();
        expect(getByLabelText('Type inside me')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    it('handles form submission in Board component', async () => {
        const { getByText, getByLabelText } = render(
            <Board column={TaskStatus.ToDo} projectId="projectId">
                hi
            </Board>
        );

        const input = getByLabelText('Type inside me');
        const submitButton = getByText('Submit');

        // Change input value
        fireEvent.change(input, { target: { value: 'New Task' } });

        // Click submit button
        fireEvent.click(submitButton);

        // You might want to mock the dispatch functions and axios requests
        // to test the behavior more thoroughly.
        await waitFor(() => {
            // Assertions after form submission
        });
    });
});

