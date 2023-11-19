import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

import { db, storage } from './firebaseConfig';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';


export async function getFavouriteWords(userId = "r49nhVOZMrVizkRbcnJ1") {

    const col = query(collection(db, "users", userId, "favourites"));
    const docSnapshot = await getDocs(col);

    const res = docSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data
        }
    });

    return res;
};

export async function getFavouriteWord({ userId = "r49nhVOZMrVizkRbcnJ1", word }) {
    const col = query(collection(db, "users", userId, "favourites"), where("word", "==", word.word), where("part", "==", word.part));
    const docSnapshot = await getDocs(col);

    const res = docSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data
        }
    });

    return res;
};

export async function addFavouriteWord({ userId = "r49nhVOZMrVizkRbcnJ1", word }) {
    try {
        const col = collection(db, "users", userId, "favourites");
        const wordRef = await addDoc(col, word);
        console.log("Document written with ID: ", wordRef.id);

        return {
            id: wordRef.id,
            ...word
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteFavouriteWord({ userId = "r49nhVOZMrVizkRbcnJ1", wordId }) {
    try {
        const wordRef = doc(db, "users", userId, "favourites", wordId);
        return await deleteDoc(wordRef).then(() => ({ status: 'success' }));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}