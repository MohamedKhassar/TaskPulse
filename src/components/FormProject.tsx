import { createProject, fetchAllProjects } from '@/store/project/projectThunk';
import { AppDispatch, RootState } from '@/store/store';
import { Plus } from 'lucide-react';
import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

const Form = () => {

  const [projectData, setProjectData] = useState({
    title: ""
  });
  const { error } = useSelector((state: RootState) => state.projectSlice)
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>()


  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await dispatch(createProject({ title: projectData.title.trim() })).then(() => {
        setProjectData({
          ...projectData,
          title: ""
        })
        setShowForm(false)
      }
      ).then(async () => {
        await dispatch(fetchAllProjects())
      })

      toast.success('Created Successfully!')


    }
    catch (error) {
      console.log(error)
      toast.error('There is an error!')

    }
  };

  return (
    <div>
      <button
        className='text-start flex gap-x-2 capitalize items-center font-body font-bold text-xl text-gray-200 bg-[#7A54CC] p-2 rounded-md'
        onClick={() => setShowForm(true)} // Set showForm to true when clicked
      >
        create new project <Plus strokeWidth={6} size={18} />
      </button>
      {showForm && (


        <div className="font-body fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-[#7A54CC]">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  autoFocus
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  placeholder="Enter Project title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className='grid grid-cols-2 place-items-center'>

                <button
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 capitalize"
                >
                  create project
                </button>
                <button
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                  onClick={() => {
                    setShowForm(false)
                  }}
                  type='button'
                >
                  No, cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
