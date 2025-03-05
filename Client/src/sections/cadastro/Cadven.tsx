import React from "react";
import { Field, Form, Formik } from "formik";
import { Image } from 'lucide-react';
import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { Button } from "@/components/ui/button";



const Cadven = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Cadastro de Vendedor</h1> 

            <Formik>
                <Form className="flex flex-col gap-4 items-center">
                    
                    <div className="flex flex-col w-[300px]">
                        <div className="relative">
                            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field
                                name="User"
                                type="User"
                                placeholder="Nome da Loja"
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field
                                name="email"                                
                                type="email"
                                placeholder="Email"                                
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
                            />                            
                        </div>
                        <div className="relative">  
                            <MessageCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field                            
                                name="whatsapp"                                
                                type="whatsapp"                                
                                placeholder="Whatsapp"                                
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"                                
                            />                            
                        </div>
                        <div className="relative">  
                            <KeyRound className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field                            
                                name="pix"                                
                                type="pix"                                
                                placeholder="Pix"                                
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"                                
                            />                            
                        </div>
                        <div className="relative">  
                            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field                            
                                name="senha"                                
                                type="senha"                                
                                placeholder="Senha"                                
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"                                
                            />                            
                        </div>   
                        <div className="relative">  
                            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field                            
                                name="senha"                                
                                type="senha"                                
                                placeholder="Confirmação da Senha"                                
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"                                
                            />                            
                        </div>   
                        <div className="relative">  
                            <Image className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                            <Field                            
                                name="imagem"                                
                                type="imagem"                                
                                placeholder="Imagem"                                
                                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"                                
                            />                            
                        </div>                     
                       
                    </div>
                    <Button type="submit">Cadastrar</Button>
                    
                     <div>
                     <h3 className="text-center w-64 mt-3">
                        Se você já possui uma conta? <b>Entre Agora</b>
                     </h3>
                    </div>
                </Form>     
            </Formik>

            </div>
    )
}
    export default Cadven