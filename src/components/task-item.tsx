import { ITask } from '@/types/taks';

import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';
import { HTMLAttributes, forwardRef } from 'react';

interface TaskItemProps extends HTMLAttributes<HTMLDivElement> {
  task: ITask;
}

const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  ({ task: { title, description, status, tags }, ...props }, ref) => {
    console.log('render TaskItem');
    return (
      <Card className="border-none shadow-xl" {...props} ref={ref}>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p className="font-light">{description}</p>
          <Badge className="shadow-none">{status}</Badge>
        </CardContent>

        <CardFooter className="flex items-center justify-start gap-2">
          {tags.map((tag) => (
            <Badge key={tag} className="bg-primary/25 text-primary shadow-none">
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
