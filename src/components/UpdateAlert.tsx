import { CircleX } from 'lucide-react';
import React, { MouseEventHandler } from 'react';

export const UpdateConfirm = ({ onUpdate, onClose }: { onUpdate: MouseEventHandler, onClose: MouseEventHandler }) => {
    return (

        <div className="font-body fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div className="flex justify-end p-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-transparent hover:bg-sky-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <CircleX color='darkblue' />
                    </button>
                </div>

                <div className="p-6 pt-0 text-center">
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to update this task?</h3>
                    <button
                        className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                        onClick={onUpdate}>
                        Yes, I'm sure
                    </button>
                    <button
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                        onClick={onClose}
                    >
                        No, cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


