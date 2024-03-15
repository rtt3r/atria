import { TaskItem } from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IContainer } from '@/types/container';
import { ITask } from '@/types/taks';
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
  DropResult
} from '@hello-pangea/dnd';
import { Filter } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const TasksPage = () => {
  const [containers, setContainers] = useState<IContainer[]>([]);
  const [tasks] = useState<ITask[]>([
    {
      id: uuid(),
      title: 'Criar página de login',
      description: 'Criar página de login com autenticação de usuário',
      status: 'A fazer',
      tags: ['login', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de cadastro',
      description: 'Criar página de cadastro com autenticação de usuário',
      status: 'A fazer',
      tags: ['cadastro', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de dashboard',
      description: 'Criar página de dashboard com autenticação de usuário',
      status: 'Fazendo',
      tags: ['dashboard', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de perfil',
      description: 'Criar página de perfil com autenticação de usuário',
      status: 'Fazendo',
      tags: ['perfil', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de configurações',
      description: 'Criar página de configurações com autenticação de usuário',
      status: 'Fazendo',
      tags: ['configuracoes', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de tarefas',
      description: 'Criar página de tarefas com autenticação de usuário',
      status: 'Feito',
      tags: ['tarefas', 'autenticacao']
    }
  ]);

  useEffect(() => {
    const containers = Object.keys(
      tasks.reduce(
        (prev, curr) => {
          (prev[curr['status']] = prev[curr['status']] || []).push(curr);
          return prev;
        },
        {} as { [key: string]: ITask[] }
      )
    ).map<IContainer>((status) => {
      return {
        id: uuid(),
        label: status,
        items: tasks.filter((task) => task.status === status)
      };
    });

    setContainers(containers);
  }, [tasks]);

  const reorder = useCallback(
    (list: ITask[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    },
    []
  );

  /**
   * Moves an item from one list to another list.
   */
  const move = useCallback(
    (
      source: ITask[],
      destination: ITask[],
      droppableSource: DraggableLocation,
      droppableDestination: DraggableLocation
    ) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      const result = [...containers];
      const sourceContainer = result.find(
        (c) => c.id === droppableSource.droppableId
      )!;
      const destContainer = result.find(
        (c) => c.id === droppableDestination.droppableId
      )!;

      sourceContainer.items = sourceClone;
      destContainer.items = destClone.map((item) => {
        item.status = destContainer.label;
        return item;
      });

      return result;
    },
    [containers]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      const sInd = source.droppableId;
      const dInd = destination.droppableId;

      if (sInd === dInd) {
        const items = reorder(
          containers.find((c) => c.id === sInd)!.items,
          source.index,
          destination.index
        );
        const newState = [...containers];
        containers.find((c) => c.id === sInd)!.items = items;
        setContainers(newState);
      } else {
        const result = move(
          containers.find((c) => c.id === sInd)!.items,
          containers.find((c) => c.id === dInd)!.items,
          source,
          destination
        );
        const newState = [...containers];
        newState.find((c) => c.id === sInd)!.items = result.find(
          (c) => c.id === sInd
        )!.items;
        newState.find((c) => c.id === dInd)!.items = result.find(
          (c) => c.id === dInd
        )!.items;

        setContainers(newState);
      }
    },
    [containers, move, reorder]
  );

  console.log('render TasksPage');

  return (
    <>
      <section className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Tasks Page</h1>
        <img
          src="https://github.com/rtt3r.png"
          alt="Avatar"
          width={45}
          className="rounded-full"
        />
      </section>

      <section className="flex items-center gap-3 mt-8">
        <Button className="bg-primary text-primary-foreground">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>

        <Input
          placeholder="Busque por cards, assuntos ou responsáveis..."
          className="bg-white border-gray-100 shadow-md"
        />
      </section>

      <section className="flex flex-col mt-8 h-full">
        <article className="flex mt-8">
          {containers.map(({ id, label }) => (
            <div
              key={id}
              className="flex-1 w-full h-full flex flex-col items-start mx-2 gap-4"
            >
              <h1 className="font-bold text-lg text-zinc-600">{label}</h1>
            </div>
          ))}
        </article>

        <article className="flex">
          <DragDropContext onDragEnd={onDragEnd}>
            {containers.map(({ id, items }) => (
              <Droppable key={id} droppableId={id}>
                {(containerProvided) => (
                  <div
                    className="flex-1 w-full h-full flex flex-col items-start gap-4 m-2 mb-8"
                    ref={containerProvided.innerRef}
                    {...containerProvided.droppableProps}
                  >
                    {items.map((item, idx) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={idx}
                      >
                        {(provided) => (
                          <TaskItem
                            task={item}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </article>
      </section>
    </>
  );
};
