import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus } from 'lucide-react';
import { HTMLAttributes, useMemo, useState } from 'react';

import { Column, Id, Task } from '../types';
import { TaskCard } from './task-card';

interface ColumnContainerProps extends HTMLAttributes<HTMLDivElement> {
  column: Column;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

export const ColumnContainer = ({
  column,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  className,
  ...props
}: ColumnContainerProps) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  if (isDragging) {
    return (
      <article
        ref={setNodeRef}
        style={style}
        className={cn(
          'flex flex-col gap-2 opacity-40 bg-gray-100 border-2 rounded-md',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn('flex flex-col gap-2 bg-gray-100 rounded-md', className)}
      {...props}
    >
      <CardHeader
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="flex-row space-y-0 items-center justify-between gap-2 text-md font-bold cursor-grab p-3"
      >
        <div className="flex-1">
          {!editMode && (
            <h3>
              {column.title} <span className="text-sm">({tasks.length})</span>
            </h3>
          )}
          {editMode && (
            <input
              className="border rounded outline-none px-2 w-full"
              value={column.title}
              placeholder="Column title"
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </SortableContext>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          className="flex gap-2 items-center border-2 rounded-md p-4 w-full"
          onClick={() => createTask(column.id)}
        >
          <Plus width={20} height={20} />
          Add task
        </Button>
      </CardFooter>
    </Card>
  );
};
