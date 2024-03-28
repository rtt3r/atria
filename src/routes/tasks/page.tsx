import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { ColumnContainer } from './components/column-container';
import { Search } from './components/search';
import { TaskCard } from './components/task-card';
import { Column, Id, Task } from './types';

const defaultCols: Column[] = [
  {
    id: 'todo',
    title: 'Todo'
  },
  {
    id: 'doing',
    title: 'Work in progress'
  },
  {
    id: 'done',
    title: 'Done'
  }
];

const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    title: '',
    content: 'List admin APIs for dashboard'
  },
  {
    id: '2',
    columnId: 'todo',
    title: '',
    content:
      'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation'
  },
  {
    id: '3',
    columnId: 'doing',
    title: '',
    content: 'Conduct security testing'
  },
  {
    id: '4',
    columnId: 'doing',
    title: '',
    content: 'Analyze competitors'
  },
  {
    id: '5',
    columnId: 'done',
    title: '',
    content: 'Create UI kit documentation'
  },
  {
    id: '6',
    columnId: 'done',
    title: '',
    content: 'Dev meeting'
  },
  {
    id: '7',
    columnId: 'done',
    title: '',
    content: 'Deliver dashboard prototype'
  },
  {
    id: '8',
    columnId: 'todo',
    title: '',
    content: 'Optimize application performance'
  },
  {
    id: '9',
    columnId: 'todo',
    title: '',
    content: 'Implement data validation'
  },
  {
    id: '10',
    columnId: 'todo',
    title: '',
    content: 'Design database schema'
  },
  {
    id: '11',
    columnId: 'todo',
    title: '',
    content: 'Integrate SSL web certificates into workflow'
  },
  {
    id: '12',
    columnId: 'doing',
    title: '',
    content: 'Implement error logging and monitoring'
  },
  {
    id: '13',
    columnId: 'doing',
    title: '',
    content: 'Design and implement responsive UI'
  }
];

export const TasksPage = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  );

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      title: '',
      content: `Task ${tasks.length + 1}`
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    console.log('DRAG END');

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log('DROPPING TASK OVER COLUMN', { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const generateId = () => {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <section className="flex items-center justify-start mb-4">
        <h1 className="font-bold text-2xl">Tasks Page</h1>
      </section>

      <section className="flex items-center gap-3">
        <Search />
      </section>

      <section className="flex-1 flex gap-2 h-full max-w-[calc(100vw-7rem)] overflow-x-auto">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                className="flex-1 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-80 overflow-y-auto"
                key={col.id}
                column={col}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  className="flex-1 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-80 overflow-y-auto"
                  column={activeColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard task={activeTask} deleteTask={deleteTask} />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </section>
    </div>
  );
};
