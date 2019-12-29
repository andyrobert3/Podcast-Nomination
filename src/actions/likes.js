import { db } from '../firebase/firebase';
import isEmpty from '../utils/util';
import firebase from "firebase/app";

const NUM_SHARDS = 5;

const podcastsRef = db.collection("podcasts");
const usersVotesRef = db.collection("UsersVotes");

const createCounter = (ref, num_shards) => {
    let batch = db.batch();

    // Initialize the counter document
    batch.set(ref, { num_shards: num_shards });

    // Initialize each shard with count=0
    for (let i = 0; i < num_shards; i++) {
        let shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
}

function incrementCounter(ref) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * NUM_SHARDS).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    return shard_ref.update("count", firebase.firestore.FieldValue.increment(1));
}

function getCount(ref) {
    // Sum the count of each shard in the subcollection
    return ref.collection('shards').get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });

        return total_count;
    });
}

export async function getVotes(podcastId) {
    return await getCount(podcastsRef.doc(podcastId));
}

export async function checkVote(userId, podcastId) {
    let doc = await usersVotesRef.where("userId", "==", userId)
        .where("podcastId", "==", podcastId).get();

    return doc.exists;
}

export async function checkPodcastExists(podcastId) {
    let doc = await podcastsRef.doc(podcastId);

    return doc.exists
}

export async function registerVote(userId, podcastId) {
    const hasVoted = await checkVote(userId, podcastId);
    
    if (hasVoted) {
        // invalid vote
        return {
            valid: false
        };
    } else {
        // vote 
        if (!checkPodcastExists(podcastId)) {
            createCounter(podcastsRef.doc(podcastId), NUM_SHARDS);
        }

        await usersVotesRef.add({
            userId: userId,
            podcastId: podcastId
        });

        await incrementCounter(podcastsRef.doc(podcastId));

        return {
            valid: true
        }
    }
}

// function create

export const createCounterHelper = () => createCounter(podcastsRef, NUM_SHARDS);


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

