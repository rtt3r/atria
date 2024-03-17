import { TaskItem } from '@/components/task-item';
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
        <Search />
      </section>

      <section className="flex flex-col mt-8 h-full">
        <article className="flex mt-8">
          {statusList.map(({ id, title }) => (
            <div
              key={id}
              className="flex-1 w-full h-full flex flex-col items-start mx-2 gap-4"
            >
              <h1 className="font-bold text-lg text-zinc-600">{title}</h1>
            </div>
          ))}
        </article>

        <article className="flex">
          <DragDropContext onDragEnd={onDragEnd}>
            {currentState.map((items, idx) => (
              <Droppable key={idx} droppableId={`${idx}`}>
                {(containerProvided) => (
                  <div
                    className="flex-1 w-full h-full flex flex-col items-start gap-4 m-2 mb-8"
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
          </DragDropContext>
        </article>
      </section>
    </>
  );
};
