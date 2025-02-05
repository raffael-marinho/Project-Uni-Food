import {uni} from '../../assets/imagens.ts'
import { Button } from '../../components/ui/button.tsx'
function Intro() {

  return (
    <>
      <div className='center flex flex-col p-4 justify-center items-center'>

        <img className='w-45 h-45 pt-16 mt-8' src={uni} alt="" />
        <div className='flex flex-col items-center text-center gap-4 pt-8 m-4'>
        <h1 className='text-4xl font-'>Bem Vindo ao UniFood</h1>
        <p className='text-lg text-justify mt-4 '>Facilitando sua vida no campus: compre e venda lanches com facilidade.</p>
        </div>
        <div className='flex flex-col items-center text-center pt-10'>
          <Button className=' w-60'>Vamos Começar</Button>
        </div>
      </div>
    </>
  )
}

export default Intro;
