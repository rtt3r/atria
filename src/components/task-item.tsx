import { ITask } from '@/types/taks';

import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';

interface TaskItemProps {
  task: ITask;
}

export const TaskItem = ({
  task: { title, description, tags }
}: TaskItemProps) => {
  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-light">{description}</p>
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
};
