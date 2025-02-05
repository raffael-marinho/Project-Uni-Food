import {Route, Routes} from 'react-router-dom'
import Intro from '../sections/intro/index'
import Home from '../sections/homepage/index'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}