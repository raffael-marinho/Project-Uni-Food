import {Route, Routes} from 'react-router-dom'
import Intro from '../sections/intro/index'
import Home from '../sections/homepage/index'
import IntroScreen from '../sections/intro/intro'
import Selector from '../sections/selector/index'
import LoginClient from '../sections/login/loginclient'
import LoginVendedor from '../sections/login/loginvendedor'
import Perfil from '../sections/perfil/perfil'
import Reservas from '../sections/reservas/reservas'
import Pesquisar from '@/sections/pesquisar/pesquisar'
import EditarPerfil from '../sections/perfil/editarperfil'
import DetalhesProduto from '@/sections/detalhesproduto/DetalheProduto'


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
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/pesquisar" element={<Pesquisar />} />
            <Route path="/editarperfil/:id" element={<EditarPerfil />} />
            <Route path="detalhesproduto/:id" element={<DetalhesProduto />} />
        </Routes>
    )
}