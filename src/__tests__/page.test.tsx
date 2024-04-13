import React, { FormEvent, useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Board from '@/components/ui/Board';
import Cards from '@/components/ui/Cards';
import { TaskStatus, TaskPriority, Task } from '@/types/SchemasTypes';
import ModalConfirm from '@/components/DeleteAlert';

// Mocking the useDispatch hook
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
}));

// Mocking axios
jest.mock('axios');

describe('Board, Cards, and ModalConfirm Components', () => {
    const projectId = 'project_id';

    const task: Task = {
        _id: 'task_id',
        taskName: 'Sample Task',
        created_at: new Date(),
        deadline: new Date(),
        assignedTo: ['User1', 'User2'],
        priority: TaskPriority.Low,
        status: TaskStatus.ToDo,
    };

    it('renders Board component with initial state', () => {
        const { getByText, getByLabelText } = render(
            <Board column={TaskStatus.ToDo} projectId={projectId}>
                hi
            </Board>
        );

        expect(getByText('ToDo')).toBeInTheDocument();
        expect(getByLabelText('Type inside me')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    it('handles form submission in Board component', async () => {
        const { getByText, getByLabelText } = render(
            <Board column={TaskStatus.ToDo} projectId={projectId}>
                hi
            </Board>
        );

        const input = getByLabelText('Type inside me');
        const submitButton = getByText('Submit');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Assertions after form submission
        });
    });

    it('displays ModalConfirm component when deleting a task', () => {
        const { getByText, getByTestId } = render(
            <Cards task={task} projectId={projectId} />
        );

        const deleteButton = getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(getByText("Are you sure you want to delete this Task?")).toBeInTheDocument();
    });

    it('handles deletion confirmation in ModalConfirm component', () => {
        const onDelete = jest.fn();
        const onClose = jest.fn();

        const { getByText } = render(
            <ModalConfirm onDelete={onDelete} onClose={onClose} />
        );

        expect(getByText("Are you sure you want to delete this Task?")).toBeInTheDocument();

        fireEvent.click(getByText("Yes, I'm sure"));
        expect(onDelete).toHaveBeenCalled();

        fireEvent.click(getByText("No, cancel"));
        expect(onClose).toHaveBeenCalled();
    });
});
