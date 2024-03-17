import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';

export const Search = () => {
  return (
    <>
      <Button className="bg-primary text-primary-foreground">
        <Filter className="mr-2 h-4 w-4" />
        Filtrar
      </Button>

      <Input
        placeholder="Busque por cards, assuntos ou responsáveis..."
        className="bg-white border-gray-100 shadow-md"
      />
    </>
  );
};
