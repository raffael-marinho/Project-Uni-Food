import React from "react";
import { Search } from 'lucide-react';

interface BarraPesqueProps {
  termo: string;
  setTermo: React.Dispatch<React.SetStateAction<string>>;
}

const BarraPesque: React.FC<BarraPesqueProps> = ({ termo, setTermo }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col w-[300px]">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
          <input
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)} // Atualiza o termo enquanto digita
            placeholder="Pesquisar vendedores..."
            className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]
              text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export default BarraPesque;
