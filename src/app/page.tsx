import Cards from '@/components/ui/Cards'
import React from 'react'

export default function page() {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      completed: false,
      created_at: "13,Nov 2022",
      deadline: "20,Nov 2022",
      stared: false,
      priority: "medium"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      completed: false,
      created_at: "13,Nov 2022",
      deadline: "20,Nov 2022",
      stared: false,
      priority: "low"
    },
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      completed: false,
      created_at: "13,Nov 2022",
      deadline: "20,Nov 2022",
      stared: false,
      priority: "high",
    }
  ]
  return (
    <div className='flex gap-8'>
      {tasks.map(task => (
        <Cards task={task} />
      ))}
    </div>
  )
}
