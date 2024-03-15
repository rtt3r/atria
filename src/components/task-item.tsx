import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';

export const TaskItem = () => {
  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg">#boraCodar um Kanban</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-light">
          Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um
          quadro de Kanban.
        </p>
      </CardContent>
      <CardFooter>
        <Badge className="bg-primary/25 text-primary shadow-none">
          rocketseat
        </Badge>
      </CardFooter>
    </Card>
  );
};
