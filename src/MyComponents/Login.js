import React,{useState} from "react";
import { Link } from 'react-router-dom';
import { X } from "lucide-react";
import Register from "./Register";

export default function Login({onClose,Register}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return(
        <div onClick={onClose} className="fixed inset-0 bg-gray-400 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5">
                <button className="place-self-end" onClick={onClose}><X size={30}/></button>
                <div className="bg-white rounded-xl px-15 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-3xl font-medium">Login</h1>
                    <form className="w-[90%]">
                        <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 text-black border border-gray-300 rounded-md" onChange={(e)=>{setEmail(e.target.value);}} required/>
                        <input type="password" placeholder="Enter your Password" className=" mt-4 w-full px-4 py-2 text-black border border-gray-300 rounded-md" onChange={(e)=>{setPassword(e.target.value);}} required/>
                        <button className="w-full mt-4 flex items-center justify-center px-5 py-2 font-medium rounded-md bg-red-400">Sign in</button>
                        <hr className="mt-4"/>
                        <button className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-2 text-black border border-gray-300 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Sign in with Google
                        </button>
                        <p>New User? <Link className="text-red-400" onClick={Register}>Create an account</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}