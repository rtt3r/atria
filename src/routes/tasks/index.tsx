import { TaskItem } from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';

export const TasksPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Tasks Page</h1>
        <img
          src="https://github.com/rtt3r.png"
          alt="Avatar"
          width={45}
          className="rounded-full"
        />
      </div>

      <div className="flex items-center gap-3 mt-8">
        <Button className="bg-primary text-primary-foreground">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>

        <Input
          placeholder="Busque por cards, assuntos ou responsáveis..."
          className="bg-white border-gray-100 shadow-md"
        />
      </div>

      <div className="flex flex-col mt-8 h-full">
        <div className="flex items-start justify-between mt-8">
          <div className="w-full h-full flex flex-col items-start mx-2 gap-4">
            <h1 className="font-bold text-lg text-zinc-600">A fazer</h1>
          </div>
          <div className="w-full h-full flex flex-col items-start mx-2 gap-4">
            <h1 className="font-bold text-lg text-zinc-600">Fazendo</h1>
          </div>
          <div className="w-full h-full flex flex-col items-start mx-2 gap-4">
            <h1 className="font-bold text-lg text-zinc-600">Feito</h1>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="w-full h-full flex flex-col items-start gap-4 m-2 mb-8">
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </div>
          <div className="w-full h-full flex flex-col items-start gap-4 m-2 mb-8">
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </div>
          <div className="w-full h-full flex flex-col items-start gap-4 m-2 mb-8">
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </div>
        </div>
      </div>
    </>
  );
};
