import { Button } from '@/components/ui/button';
import { TaskItem } from '@/routes/tasks/components/task-item';
import { TaskService } from '@/services/task-service';
import { ITask, ITaskChanges, ITaskStatus } from '@/types/taks';
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
  DropResult
} from '@hello-pangea/dnd';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Search } from './components/search';

const taskService = new TaskService();

export const TasksPage = () => {
  const [statusList, setStatusList] = useState<ITaskStatus[]>([]);
  const [changes, setChanges] = useState<ITaskChanges>({});
  const [currentState, setCurrentState] = useState<ITask[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const statusList = await taskService.fetchStatus();
      const tasks = await taskService.fetchTasks();

      const state = statusList.reduce((prev, curr, idx) => {
        prev[idx] = tasks
          .filter((task) => task.status.id === curr.id)
          .sort((a, b) => a.order - b.order);
        return prev;
      }, [] as ITask[][]);

      setStatusList(statusList);
      setCurrentState([...state]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      if (changes.updated) {
        await Promise.all(
          changes.updated.map((task) => taskService.updateTask(task))
        );
      }
    };

    updateData();
  }, [changes]);

  const reorder = useCallback(
    (list: ITask[], fromIndex: number, toIndex: number) => {
      let result = Array.from(list);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, { ...removed });

      result = result
        .map((task, idx) => ({ ...task, order: idx + 1 }))
        .sort((a, b) => a.order - b.order);

      setChanges((prev) => {
        return {
          ...prev,
          updated: [...result]
        };
      });

      return result;
    },
    []
  );

  const move = useCallback(
    (
      source: ITask[],
      destination: ITask[],
      droppableSource: DraggableLocation,
      droppableDestination: DraggableLocation
    ) => {
      let sourceClone = Array.from(source);
      let destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      sourceClone = sourceClone
        .map((task, idx) => ({
          ...task,
          order: idx + 1
        }))
        .sort((a, b) => a.order - b.order);

      destClone.splice(droppableDestination.index, 0, removed);

      destClone = destClone
        .map((task, idx) => ({
          ...task,
          order: idx + 1,
          status: statusList[+droppableDestination.droppableId]
        }))
        .sort((a, b) => a.order - b.order);

      const result: { [key: string]: ITask[] } = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;

      setChanges((prev) => {
        return {
          ...prev,
          updated: [...sourceClone, ...destClone]
        };
      });

      return result;
    },
    [statusList]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;

      const newState = [...currentState];

      if (sInd === dInd) {
        const items = reorder(
          currentState[sInd],
          source.index,
          destination.index
        );
        newState[sInd] = items;
        setCurrentState(newState);
        return;
      }

      const moveResult = move(
        currentState[sInd],
        currentState[dInd],
        source,
        destination
      );
      newState[sInd] = moveResult[sInd];
      newState[dInd] = moveResult[dInd];

      setCurrentState(newState);
    },
    [currentState, move, reorder]
  );

  const addState = useCallback(() => {
    setStatusList((prev) => [
      ...prev,
      {
        id: uuid(),
        title: 'Novo'
      }
    ]);

    setCurrentState((prev) => [...prev, []]);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <section className="flex items-center justify-start mb-4">
        <h1 className="font-bold text-2xl">Tasks Page</h1>
      </section>

      <section className="flex items-center gap-3">
        <Search />
      </section>

      <section className="flex-1 flex flex-col gap-2 h-full overflow-x-auto">
        <article className="flex gap-2">
          {statusList.map(({ id, title }) => (
            <div
              key={id}
              className="flex flex-col items-start gap-2 h-full min-w-96 w-96 border border-t-4 border-t-green-500 rounded-sm"
            >
              <h1 className="font-semibold text-md m-2">{title}</h1>
            </div>
          ))}
          <div className="flex flex-col items-start gap-2 h-full min-w-96 w-96 border border-t-4 rounded-sm">
            <Button
              variant="ghost"
              className="hover:bg-transparent w-full flex justify-start items-center font-semibold text-md p-2"
              onClick={addState}
            >
              Novo estado
            </Button>
          </div>
        </article>

        <article className="flex-1 flex gap-2">
          <DragDropContext onDragEnd={onDragEnd}>
            {currentState.map((items, idx) => (
              <Droppable key={idx} droppableId={`${idx}`}>
                {(containerProvided) => (
                  <div
                    className="flex flex-col items-start gap-2 h-full min-w-96 w-96 p-2 border rounded-sm bg-gray-100 dark:bg-slate-900"
                    ref={containerProvided.innerRef}
                    {...containerProvided.droppableProps}
                  >
                    {containerProvided.placeholder}
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

            <div className="flex flex-col items-start gap-2 h-full min-w-96 w-96 p-2 rounded-sm"></div>
          </DragDropContext>
        </article>
      </section>
    </div>
  );
};
