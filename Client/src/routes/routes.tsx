import {Route, Routes} from 'react-router-dom'
import Intro from '../sections/intro/index'
import Home from '../sections/homepage/index'
import IntroScreen from '../sections/intro/intro'
import Selector from '../sections/selector/index'
import LoginClient from '../sections/login/loginclient'
import LoginVendedor from '../sections/login/loginvendedor'
import Perfil from '../sections/perfil/perfil'
import Pesquisar from '@/sections/pesquisar/pesquisar'
import EditarPerfil from '../sections/perfil/editarperfil'
import DetalhesProduto from '@/sections/detalhesproduto/DetalheProduto'
import Pedidos from '../sections/pedidos/pedidos'
import Homevendedor from '../sections/homevendedor/index'
import Confirmar from '../sections/checkout/confimar'
import Error from '@/sections/checkout/error'
import CadastroVenda from '../sections/cadastro/Cadven'
import PedidosVendedor from '../sections/pedidosvendedor/PedidosVenda'
import DetalheVendedor from '../sections/detalhesvendedor/DetalheVendedor'
import CadastroCli from '../sections/cadastro/Cadcli'
import RecuperarSenha from '@/sections/recuperarsenha/recuperarsenha'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/intro" element={<IntroScreen />} />
            <Route path="/selector" element={<Selector />} />
            <Route path="/logincliente" element={<LoginClient />} />
            <Route path="/loginvenda" element={<LoginVendedor />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pesquisar" element={<Pesquisar />} />
            <Route path="/editarperfil/:id" element={<EditarPerfil />} />
            <Route path="detalhesproduto/:id" element={<DetalhesProduto />} />
            <Route path="/homevendedor" element={<Homevendedor />} />
            <Route path="/confirmarpedido" element={<Confirmar/>} />
            <Route path="/erropedido" element={<Error />} />
            <Route path="/cadastrovendedor" element={<CadastroVenda />} />
            <Route path="/PedidosVendedor" element={<PedidosVendedor />} />
            <Route path="/detalhesvendedor/:id" element={<DetalheVendedor />} />
            <Route path="/cadastrocliente" element={<CadastroCli />} />
            <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        </Routes>
    )
}