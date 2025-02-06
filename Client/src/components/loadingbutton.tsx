import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
    text: string;
    to: string;
  }
  const LoadingButton: React.FC<LoadingButtonProps> =  ({ text, to }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(to);
    }, 800); 
  };

  return (
    <Button className="w-60 flex items-center gap-2" onClick={handleClick} disabled={loading}>
      {loading && <Loader2 className="animate-spin" />}
      {loading ? "Carregando..." : text}
    </Button>
  );
};

export default LoadingButton;
