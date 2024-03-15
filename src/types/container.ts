import { ITask } from './taks';

export interface IContainer {
  id: string;
  label: string;
  items: ITask[];
}
