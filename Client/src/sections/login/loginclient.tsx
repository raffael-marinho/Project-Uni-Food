import { uni } from "@/assets/imagens";
import LoadingButton from "@/components/loadingbutton";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Mail, Lock } from "lucide-react";

function LoginClient() {
    return (
        <div className="flex flex-col items-center h-screen">
        <div className="flex  items-center h-60 gap-4">
            <img src={uni} alt="logo da unifood" className="w-[100px] h-[128px]"/>
        </div>
            <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="flex flex-col gap-4 items-center">

            {/* Form Para Email*/}
            <div className="flex flex-col w-[300px]">
            <div className="relative">
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
          <Field name="email" 
                type="email" 
                placeholder="Email" 
                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] 
                fontcolor-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none focus:text-foreground" />
            </div>
            </div>

            {/* Form Para Senha*/}
            <div className="flex flex-col w-[300px]">
            <div className="relative">
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
            <Field name="password"
                   type="password" 
                   placeholder="Senha" 
                   className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] placeholder-[#CE9E7E]
                bg-transparent fontcolor-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none focus:text-foreground" />
            </div>
            </div>
          <LoadingButton text="Entrar" to="/" />
      <div >
        <h3 className=" text-center w-64 mt-3 ">se voce ainda nao possui uma conta ? <b>Cadastre-se Agora</b></h3>
      </div>
        </Form>
      </Formik>
        </div>
    );
}   
export default LoginClient;