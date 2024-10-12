import { ref } from "vue";
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

let userLogin = () => {
    let error = ref("");
    let login = async(email, password) => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful:', userCredential)
        }catch(err){
            error.value = err.message;
            console.log(err.message)
        }
    }
    return { error, login}
}
export default userLogin;