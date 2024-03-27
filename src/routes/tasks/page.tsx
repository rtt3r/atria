import { Search } from './components/search';

export const TasksPage = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <section className="flex items-center justify-start mb-4">
        <h1 className="font-bold text-2xl">Tasks Page</h1>
      </section>

      <section className="flex items-center gap-3">
        <Search />
      </section>

      <section className="flex-1 flex gap-2 h-full max-w-[calc(100vw-7rem)] overflow-x-auto">
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto">
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
          <div className="w-full min-h-40 max-h-40 border-2 border-sky-600 rounded-md"></div>
        </div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
        <div className="flex flex-col gap-2 p-2 min-h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)] min-w-64 max-w-64 border-2 border-secondary rounded-md overflow-y-auto"></div>
      </section>
    </div>
  );
};
