export interface ITaskStatus {
  id: string;
  title: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: ITaskStatus;
  order: number;
  tags: string[];
}

export type ITaskChanges = { [key: string]: ITask[] };
