import React from "react";
import { Field, Form, Formik } from "formik";
import { Search } from 'lucide-react';


const BarraPesque: React.FC = () => {
  return (
    <div> 
        <Formik
        initialValues={{ Pesquisa: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        >
 <Form className="flex flex-col gap-4 items-center">
    {/* Form Para Email */}
    <div className="flex flex-col w-[300px]">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
        <Field
          name="Pesquisa"
          type="Search"
          placeholder="Pesquisar"
          className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]
          text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
        />
      </div>
      </div>
    </Form>
    </Formik>
    </div>
   
    
  )
    

};

export default BarraPesque;
