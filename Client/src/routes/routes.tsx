import {Route, Routes} from 'react-router-dom'
import Intro from '../sections/intro/index'
import Home from '../sections/homepage/index'
import IntroScreen from '../sections/intro/intro'
import Selector from '../sections/selector/index'
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/intro" element={<IntroScreen />} />
            <Route path="/selector" element={<Selector />} />
        </Routes>
    )
}