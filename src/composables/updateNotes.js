import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"


let updateNotes = () => {
    let updateNote = async(noteId,currentNote) => {
        try {
            let noteRef = doc(db, "notes", noteId);
            await updateDoc(noteRef,{
                title : currentNote.title,
                content: currentNote.content,
            });
            console.log("note updated successfully");
        }catch(err){
            console.log(err.message);
        }
    }

    return { updateNote }
}
export default updateNotes