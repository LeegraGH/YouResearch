import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    writeBatch,
    setDoc,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import {isEnglish} from "../../../utils/Alphabet";
import {db} from './firestoreConfig';
import {formatPartOfSpeech} from '../../../utils/PartsOfSpeech';


export async function getContent(type, userId = "r49nhVOZMrVizkRbcnJ1") {
    try {
        const col = query(collection(db, "users", userId, type),
            orderBy('created_at', 'desc'));
        const docSnapshot = await getDocs(col);

        return docSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data
            }
        });
    } catch (e) {
        console.error("Error getting docs: " + e.message);
    }
}

export async function getFavouriteWord({userId = "r49nhVOZMrVizkRbcnJ1", word}) {
    try {
        const what = isEnglish(word) ? "word" : "translation";
        const col = query(collection(db, "users", userId, "favourites"), where(what, 'in', [word, word.toLowerCase(), word.toUpperCase(), word[0].toUpperCase() + word.slice(1)]));
        const docSnapshot = await getDocs(col);

        return docSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data
            }
        });
    } catch (e) {
        console.error("Error getting doc: " + e.message);
    }
}

export async function getCollectionWords({type, collectionId, userId = "r49nhVOZMrVizkRbcnJ1"}) {
    try {
        let col;
        if (type === "app") {
            const appCol = collection(db, "app");
            const appId = await getDocs(appCol).then(data => data.docs[0].id)

            // col = collection(db, "app", appId, "collections", collectionId, "words");
            col = query(collection(db, "app", appId, "collections", collectionId, "words"),
                orderBy('created_at', 'desc'));
        } else if (type === "user") {
            col = query(collection(db, "users", userId, "collections", collectionId, "words"),
                orderBy('created_at', 'desc'));
        }
        const docSnapshot = await getDocs(col);

        return docSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data
            }
        });
    } catch (e) {
        console.error("Error getting docs: " + e.message);
    }
}

export async function getCollectionWord({userId = "r49nhVOZMrVizkRbcnJ1", word}) {
    try {
        const what = isEnglish(word.word) ? "word" : "translation";
        const formatPart = isEnglish(word.part) ? word.part : formatPartOfSpeech(word.part);
        const col = query(collection(db, "users", userId, "collection_words"),
            where(what, '==', word.word), where("part", "==", formatPart));
        const docSnapshot = await getDocs(col);
        return docSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data,
                col_word_path: data.col_word_path
            }
        });
    } catch (e) {
        console.error("Error getting doc: " + e.message);
    }
}

export async function addContent({type, content, userId = "r49nhVOZMrVizkRbcnJ1"}) {
    try {
        const col = collection(db, "users", userId, type);
        const data = {...content, created_at: serverTimestamp()};
        const ref = await addDoc(col, data);

        return {
            id: ref.id,
            ...data
        }
    } catch (e) {
        console.error("Error adding doc: " + e.message);
    }
}

export async function deleteFavourite({contentId, userId = "r49nhVOZMrVizkRbcnJ1"}) {
    try {
        const ref = doc(db, "users", userId, "favourites", contentId);
        return await deleteDoc(ref).then(() => ('Success deleting doc'));
    } catch (e) {
        console.error("Error deleting doc: " + e.message);
    }
}

export async function deleteCollection({collectionId, userId = "r49nhVOZMrVizkRbcnJ1"}) {
    try {
        const batch = writeBatch(db);

        const wordsCol = collection(db, "users", userId, "collections", collectionId, "words");
        const wordsDocSnapshot = await getDocs(wordsCol);
        wordsDocSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        })

        const ref = doc(db, "users", userId, "collections", collectionId);
        batch.delete(ref);

        const col = query(collection(db, "users", userId, "collection_words"), where("collection_id", "==", collectionId));
        const docSnapshot = await getDocs(col);
        docSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        })

        return await batch.commit().then(() => ('Success deleting doc'));
    } catch (e) {
        console.error("Error deleting doc: " + e.message);
    }
}

export async function deleteCollectionWord({collectionId, wordId, userId = "r49nhVOZMrVizkRbcnJ1"}) {
    try {
        const batch = writeBatch(db);

        const ref1 = doc(db, "users", userId, "collections", collectionId, "words", wordId);
        const ref2 = doc(db, "users", userId, "collection_words", wordId);

        batch.delete(ref1);
        batch.delete(ref2);

        await batch.commit();
        return 'Success deleting doc';
    } catch (e) {
        console.error("Error deleting doc: " + e.message);
    }
}

export async function addCollectionWord({word, collectionId, userId = "r49nhVOZMrVizkRbcnJ1"}) {
    try {
        const col1 = collection(db, "users", userId, "collections", collectionId, "words");
        const col2 = collection(db, "users", userId, "collection_words");

        const data = {...word, created_at: serverTimestamp()};
        const ref1 = await addDoc(col1, data);

        const wordData = {
            collection_id: collectionId,
            ...data
        };
        const ref2 = doc(col2, ref1.id);
        await setDoc(ref2, wordData);

        return 'Success adding doc';
    } catch (e) {
        console.error("Error adding doc: " + e.message);
    }
}

export async function getAppCollections() {
    try {
        const appCol = collection(db, "app");
        const appId = await getDocs(appCol).then(data => data.docs[0].id)

        const col = collection(db, "app", appId, "collections");
        const docSnapshot = await getDocs(col);

        return docSnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data
            }
        });

    } catch (e) {
        console.error("Error getting docs: " + e.message);
    }
}