import axios from 'axios';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { FormEvent, MouseEventHandler, useState } from 'react';

const Form = ({ onCreate }: { onCreate?: MouseEventHandler }) => {
  const { data: user } = useSession()
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility


  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post("/api/projects", { title, members, userId: user?.user.id }).then(() => {
        setTitle("")
        setMembers([])
        setShowForm(false)
        setMember("")
      }
      )
    } catch (error) {

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
      {showForm && ( // Render form only when showForm is true
        <div className="font-body fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-[#7A54CC]">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Project title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="members" className="block text-gray-700 font-bold mb-2">Members</label>
                <input
                  type="text"
                  id="members"
                  value={members}
                  onChange={(e) => setMember(e.target.value)}
                  placeholder="Enter members"
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
