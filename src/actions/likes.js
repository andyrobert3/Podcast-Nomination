import { db } from '../firebase/firebase';
import isEmpty from '../utils/util';

const podcastsRef = db.collection("podcasts");

export const getPodcastDetails = async (listenNotesId) => {
    let doc = await podcastsRef.doc(listenNotesId).get();
    if (doc.exists) {
        return doc.data();
    } else {
        return {};
    }
};


export const addLikeToDb = async (listenNotesId) => {
    let doc = await getPodcastDetails(listenNotesId);
    
    if (isEmpty(doc)) {
        return podcastsRef.doc(listenNotesId).set({
            likes: 1
        });

    } else {
        let previousLikes = doc.likes;

        return podcastsRef.doc(listenNotesId).update({
            likes: previousLikes + 1
        }); 
    }
};

