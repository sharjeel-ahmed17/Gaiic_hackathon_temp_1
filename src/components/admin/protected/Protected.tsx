'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const Protected = ({children} : {children : React.ReactNode}) => {

    const router = useRouter();

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if(!isLoggedIn){
            router.push("/login")
        }
    },[router])
  return <>
  {children}
  </>
}

export default Protected