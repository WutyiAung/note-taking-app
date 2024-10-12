import { ref } from "vue";
import { db } from "@/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

let notes = ref([]);
let getNotes = (userId) => {
    let gettingNotes = () => {
      let notesCollection = collection(db, 'notes');
      let userNotesQuery = query(notesCollection, where('userId', '==', userId)); 

        onSnapshot(userNotesQuery, (snapshot) => {
          notes.value = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, 
          }));
        });
        return notes.value;
    }
    return { gettingNotes , notes }
}
export default getNotes;