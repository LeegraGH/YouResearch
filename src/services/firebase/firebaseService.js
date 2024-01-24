import { collection, getDocs, addDoc, getDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { isEnglish } from "../../utils/Alphabet";
import { db } from './firebaseConfig';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';


export async function getContent(type, userId = "r49nhVOZMrVizkRbcnJ1") {

    const col = query(collection(db, "users", userId, type));
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
    const what = isEnglish(word) ? "word" : "translation";
    const col = query(collection(db, "users", userId, "favourites"), where(what, 'in', [word.toLowerCase(), word.toUpperCase(), word[0].toUpperCase() + word.slice(1)]));
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

export async function getCollectionWords({ collectionId, userId = "r49nhVOZMrVizkRbcnJ1" }) {
    try {
        const col = query(collection(db, "users", userId, "collections", collectionId, "words"));
        const docSnapshot = await getDocs(col);

        const res = docSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data
            }
        });

        return res;
    } catch (e) {
        console.error("Error getting document: ", e);
    }
};

export async function addContent({ type, content, userId = "r49nhVOZMrVizkRbcnJ1" }) {
    try {
        const col = collection(db, "users", userId, type);
        const ref = await addDoc(col, content);
        console.log("Document written with ID: ", ref.id);

        return {
            id: ref.id,
            ...content
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteContent({ type, contentId, userId = "r49nhVOZMrVizkRbcnJ1" }) {
    try {
        const ref = doc(db, "users", userId, type, contentId);
        return await deleteDoc(ref).then(() => ({ status: 'success' }));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}