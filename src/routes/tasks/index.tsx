import { Draggable } from '@/components/draggable';
import { TaskItem } from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DndContext } from '@dnd-kit/core';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const TasksPage = () => {
  const [parent, setParent] = useState(null);

  const handleDragEnd = (event) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  };

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

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex items-start justify-between">
            <div className="w-full h-full flex flex-col items-start gap-4 m-2 mb-8">
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
            </div>
            <div className="w-full h-full flex flex-col items-start gap-4 m-2 mb-8">
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
            </div>
            <div className="w-full h-full flex flex-col items-start gap-4 m-2 mb-8">
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
              <Draggable id={uuid()}>
                <TaskItem id={uuid()} />
              </Draggable>
            </div>
          </div>
        </DndContext>
      </div>
    </>
  );
};
