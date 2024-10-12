import {  doc, deleteDoc } from 'firebase/firestore';
import { db } from "@/firebase";
import { ref } from "vue";

let deleteNote = () => {
    let error = ref("");
    let deletingNote =  async(noteId) => {
            try {
                await deleteDoc(doc(db, 'notes', noteId));
                // alert('Note deleted successfully');
              } catch (err) {
                console.error('Error deleting note: ', err);
                error.value = err.message;
                // alert('Failed to delete note');
              }
        }
    
    return { error, deletingNote}
}
export default deleteNote;