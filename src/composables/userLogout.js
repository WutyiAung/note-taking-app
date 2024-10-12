import { auth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "vue-router"

let userLogout = () => {
 let router = useRouter();
 let logout = async() => {
    try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error("Error logging out: ", error);
      }
 }
 return { logout }
}
export default userLogout