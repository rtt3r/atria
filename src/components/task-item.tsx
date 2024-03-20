import { ITask } from '@/types/taks';
import { forwardRef, HTMLAttributes } from 'react';

import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';

interface TaskItemProps extends HTMLAttributes<HTMLDivElement> {
  task: ITask;
}

const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  ({ task: { title, description, tags }, ...props }, ref) => {
    return (
      <Card className="shadow-sm rounded-sm w-full" {...props} ref={ref}>
        <CardHeader>
          <CardTitle className="text-md">{title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p className="font-light text-sm">{description}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-start gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-primary/25 text-primary shadow-none text-xs"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    );
  }
);

TaskItem.displayName = 'TaskItem';

export { TaskItem };
