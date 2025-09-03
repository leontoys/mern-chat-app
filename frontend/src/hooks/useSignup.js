import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const handleInput = (fullName, userName, password, confirmPassword, gender) => {
    
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all required fields!")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords don't match")
        return false
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters")
        return false
    }

    return true

}

const useSignup = () => {

    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    
    const signup = async ({fullName,userName,password,confirmPassword,gender}) => {

        const success = handleInput(fullName,userName,password,confirmPassword,gender)

        if (!success) return
        
        setLoading(true)
        try {

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({fullName,userName,password,confirmPassword,gender})
            });

            const data = await response.json()
            console.log(data)
            if (data.error) {
                throw new Error(data.error)
            }

            //add local storage
            localStorage.setItem("chatuser", JSON.stringify(data))
            //set this user to the context
            setAuthUser(data)
            
            
        } catch (error) {
            console.log('Error while signing up', error)
            toast.error(error.message)
            
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,signup
    }

}

export default useSignup