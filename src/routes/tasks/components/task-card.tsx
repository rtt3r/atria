import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';

import { Id, Task } from '../types';

interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
  task: Task | null;
  deleteTask: (id: Id) => void;
}

export const TaskCard = ({
  task,
  deleteTask,
  className,
  ...props
}: TaskCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task?.id ?? '',
    data: {
      type: 'Task',
      task
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...props}
      style={style}
      className={cn(
        'flex items-center text-left rounded-xl p-2.5 hover:ring-2 hover:ring-inset cursor-grab relative task',
        className,
        {
          'opacity-30': isDragging
        }
      )}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <CardContent>
        <p className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task?.content}
        </p>

        {mouseIsOver && (
          <button
            type="button"
            onClick={() => {
              deleteTask(task?.id ?? '');
            }}
            className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100"
          >
            <Trash width={20} height={20} />
            <span className="sr-only">Delete task</span>
          </button>
        )}
      </CardContent>
    </Card>
  );
};
