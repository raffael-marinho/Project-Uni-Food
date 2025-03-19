import { Route, Routes, Navigate } from 'react-router-dom';
import Intro from '../sections/intro/index';
import Home from '../sections/homepage/index';
import IntroScreen from '../sections/intro/intro';
import Selector from '../sections/selector/index';
import LoginClient from '../sections/login/loginclient';
import LoginVendedor from '../sections/login/loginvendedor';
import Perfil from '../sections/perfil/perfil';
import Pesquisar from '@/sections/pesquisar/pesquisar';
import EditarPerfil from '../sections/perfil/editarperfil';
import DetalhesProduto from '@/sections/detalhesproduto/DetalheProduto';
import Pedidos from '../sections/pedidos/pedidos';
import Homevendedor from '../sections/homevendedor/index';
import Confirmar from '../sections/checkout/confimar';
import Error from '@/sections/checkout/error';
import CadastroVenda from '../sections/cadastro/Cadven';
import PedidosVendedor from '../sections/pedidosvendedor/PedidosVenda';
import DetalheVendedor from '../sections/detalhesvendedor/DetalheVendedor';
import CadastroCli from '../sections/cadastro/Cadcli';
import RecuperarSenha from '@/sections/recuperarsenha/recuperarsenha';
import AdicionarProduto from '@/sections/adicionarproduto/adicionarproduto';
import PerfilVendedor from '@/sections/perfilvendedor/perfil';
import EditarProduto from '@/sections/editarproduto/editarproduto';
import ProdutoVendedor from '@/sections/detalhesprodutodovendedor/detalhesdoprodutvenda';
import EditarPerfilVendedor from '@/sections/perfilvendedor/editarperfilvenda';
import { useAuth } from '@/context/auth-context';
import { useVendedor } from '@/context/vendedor-auth-context';
import SemInternet from '@/sections/seminternet/seminternet';

export const AppRoutes = () => {
  const { isAuth } = useAuth();
  const { isAuthVendedor } = useVendedor();

  return (
    <Routes>
      {/* Rotas públicas - Se estiver logado, redireciona para /home ou /homevendedor */}
      <Route path="/index" element={isAuth ? <Navigate to="/home" /> : isAuthVendedor ? <Navigate to="/homevendedor" /> : <Intro />} />
      <Route path="/selector" element={isAuth || isAuthVendedor ? <Navigate to={isAuth ? "/home" : "/homevendedor"} /> : <Selector />} />
      <Route path="/logincliente" element={isAuth ? <Navigate to="/home" /> : <LoginClient />} />
      <Route path="/loginvenda" element={isAuthVendedor ? <Navigate to="/homevendedor" /> : <LoginVendedor />} />
      <Route path="/intro" element={isAuth || isAuthVendedor ? <Navigate to={isAuth ? "/home" : "/homevendedor"} /> : <IntroScreen />} />
      <Route path="/cadastrovendedor" element={isAuthVendedor ? <Navigate to="/homevendedor" /> : <CadastroVenda />} />
      <Route path="/cadastrocliente" element={isAuth ? <Navigate to="/home" /> : <CadastroCli />} />
      <Route path="/recuperarsenha" element={isAuth || isAuthVendedor ? <Navigate to={isAuth ? "/home" : "/homevendedor"} /> : <RecuperarSenha />} />
      <Route path="/no-internet" element={<SemInternet />} />

      {/* Rotas protegidas - Se não estiver logado, redireciona para / */}
      <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/index" />} />
      <Route path="/perfil/:id" element={isAuth ? <Perfil /> : <Navigate to="/index" />} />
      <Route path="/pedidos" element={isAuth ? <Pedidos /> : <Navigate to="/index" />} />
      <Route path="/pesquisar" element={isAuth ? <Pesquisar /> : <Navigate to="/index" />} />
      <Route path="/editarperfil/:id" element={isAuth ? <EditarPerfil /> : <Navigate to="/index" />} />
      <Route path="/detalhesproduto/:id" element={isAuth ? <DetalhesProduto /> : <Navigate to="/index" />} />
      <Route path="/confirmarpedido" element={isAuth ? <Confirmar /> : <Navigate to="/index" />} />
      <Route path="/erropedido" element={isAuth ? <Error /> : <Navigate to="/index" />} />
      <Route path="/detalhesvendedor/:id" element={isAuth ? <DetalheVendedor /> : <Navigate to="/index" />} />

      {/* Rotas protegidas para vendedores */}
      <Route path="/homevendedor" element={isAuthVendedor ? <Homevendedor /> : <Navigate to="/index" />} />
      <Route path="/PedidosVendedor" element={isAuthVendedor ? <PedidosVendedor /> : <Navigate to="/index" />} />
      <Route path="/adicionarproduto" element={isAuthVendedor ? <AdicionarProduto /> : <Navigate to="/index" />} />
      <Route path="/perfilvendedor/:id" element={isAuthVendedor ? <PerfilVendedor /> : <Navigate to="/index" />} />
      <Route path="/editarproduto/:id" element={isAuthVendedor ? <EditarProduto /> : <Navigate to="/index" />} />
      <Route path="/produtovendedor/:id" element={isAuthVendedor ? <ProdutoVendedor /> : <Navigate to="/index" />} />
      <Route path="/editarperfilvendedor/:id" element={isAuthVendedor ? <EditarPerfilVendedor /> : <Navigate to="/index" />} />
      <Route path="/" element={<Navigate to="/index" />} />

      {/* Rota de fallback */}
    </Routes>
  );
};
