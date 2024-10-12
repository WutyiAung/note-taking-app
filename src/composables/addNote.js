import { db, serverTimestamp } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref } from 'vue';

let addNote = () => {
    let error = ref("");
    let addingNote = async(title,content,userId,email) =>{
        if (title && content) {
            try {
                await addDoc(collection(db, 'notes'), {
                    title: title,
                    content: content,
                    userId: userId, 
                    userEmail: email, 
                    createdAt: serverTimestamp(), 
                });
            } catch (err) {
                console.log("Error adding note", err.message)
                error.value = err.message;
            }
        }
    }
    return { addingNote, error }
}
export default addNote;