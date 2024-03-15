import { TaskItem } from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IContainer } from '@/types/container';
import { ITask } from '@/types/taks';
import { Filter } from 'lucide-react';
import { v4 as uuid } from 'uuid';

export const TasksPage = () => {
  const tasks: ITask[] = [
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
  ];

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
        <div className="flex mt-8">
          {containers.map(({ id, label }) => (
            <div
              key={id}
              className="flex-1 w-full h-full flex flex-col items-start mx-2 gap-4"
            >
              <h1 className="font-bold text-lg text-zinc-600">{label}</h1>
            </div>
          ))}
        </div>

        <div className="flex">
          {containers.map(({ id, items }) => (
            <div
              key={id}
              className="flex-1 w-full h-full flex flex-col items-start gap-4 m-2 mb-8"
            >
              {items.map((item) => (
                <TaskItem key={item.id} task={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
