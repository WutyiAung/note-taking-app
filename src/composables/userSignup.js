import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from "vue-router";
let userSignup = () => {
    let error = ref("");
    let router = useRouter();
    let signup = async(email,password,displayName) => {
        try{
            let response = await createUserWithEmailAndPassword(auth,email,password);
            await updateProfile(response.user, {
              displayName: displayName
            });
            console.log("User profile updated with display name:", displayName);
            router.push('/note');
          }catch(err){
            error.value = err.message;
            console.log(err.message);
          }
    }
    return { error, signup }
}
export default userSignup;