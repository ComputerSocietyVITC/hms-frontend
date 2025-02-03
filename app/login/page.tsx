"use client";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./LoginComponent"), { ssr: false });

export default Login;
