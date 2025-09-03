import { useState } from "react";
import { toast } from "react-hot-toast";

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

    const [loading, setLoading] = useState(true)
    
    const signup = async ({fullName,userName,password,confirmPassword,gender}) => {

        const success = handleInput(fullName,userName,password,confirmPassword,gender)

        if (!success) return
        
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
            
        } catch (error) {
            console.log('Error while signing up', error)
            toast.error('Error while Signing up')
            
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,signup
    }

}

export default useSignup