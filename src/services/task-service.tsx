import { ITask, ITaskStatus } from '@/types/taks';
import { v4 as uuid } from 'uuid';

export class TaskService {
  protected _status: ITaskStatus[] = [
    {
      id: uuid(),
      title: 'A fazer'
    },
    {
      id: uuid(),
      title: 'Fazendo'
    },
    {
      id: uuid(),
      title: 'Feito'
    }
  ];

  protected _tasks: ITask[] = [
    {
      id: uuid(),
      title: 'Criar página de login',
      description: 'Criar página de login com autenticação de usuário',
      status: this._status.find((s) => s.title === 'A fazer')!,
      order: 1,
      tags: ['login', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de cadastro',
      description: 'Criar página de cadastro com autenticação de usuário',
      status: this._status.find((s) => s.title === 'A fazer')!,
      order: 2,
      tags: ['cadastro', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de dashboard',
      description: 'Criar página de dashboard com autenticação de usuário',
      status: this._status.find((s) => s.title === 'Fazendo')!,
      order: 1,
      tags: ['dashboard', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de perfil',
      description: 'Criar página de perfil com autenticação de usuário',
      status: this._status.find((s) => s.title === 'Fazendo')!,
      order: 2,
      tags: ['perfil', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de configurações',
      description: 'Criar página de configurações com autenticação de usuário',
      status: this._status.find((s) => s.title === 'Fazendo')!,
      order: 3,
      tags: ['configuracoes', 'autenticacao']
    },
    {
      id: uuid(),
      title: 'Criar página de tarefas',
      description: 'Criar página de tarefas com autenticação de usuário',
      status: this._status.find((s) => s.title === 'Feito')!,
      order: 1,
      tags: ['tarefas', 'autenticacao']
    }
  ];

  async fetchStatus() {
    return Promise.resolve(this._status);
  }

  async fetchTasks() {
    return Promise.resolve(this._tasks);
  }

  async updateTask(task: ITask) {
    console.log('Update task', task);
  }
}
