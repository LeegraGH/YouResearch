import { collection, getDocs, addDoc, getDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { isEnglish } from "../../utils/Alphabet";
import { db } from './firebaseConfig';
import { formatPartOfSpeech } from '../../utils/PartsOfSpeech';
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
    const col = query(collection(db, "users", userId, "favourites"), where(what, 'in', [word, word.toLowerCase(), word.toUpperCase(), word[0].toUpperCase() + word.slice(1)]));
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

export async function getCollectionWord({ userId = "r49nhVOZMrVizkRbcnJ1", word }) {
    const what = isEnglish(word.word) ? "word" : "translation";
    const formatPart = isEnglish(word.part) ? word.part : formatPartOfSpeech(word.part);
    const col = query(collection(db, "users", userId, "collection_words"), where(what, '==', word.word), where("part", "==", formatPart));
    const docSnapshot = await getDocs(col);
    const res = docSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            col_word_path: data.col_word_path
        }
    });
    return res;
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

export async function deleteWordFromCollection({ path, wordId, userId = "r49nhVOZMrVizkRbcnJ1" }) {
    try {
        const wordRef = doc(db, path);
        const colWordRef = doc(db, "users", userId, "collection_words", wordId);
        deleteDoc(colWordRef);
        deleteDoc(wordRef);
        return { status: 'success' };
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function addCollectionWord({ word, collectionId, userId = "r49nhVOZMrVizkRbcnJ1" }) {
    try {
        const col = collection(db, "users", userId, "collections", collectionId, "words");
        const ref = await addDoc(col, word);

        const colWord = collection(db, "users", userId, "collection_words",);
        addDoc(colWord, { col_word_path: `/users/${userId}/collections/${collectionId}/words/${ref.id}`, collection_id: collectionId, ...word });

        return { status: 'success' };
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}