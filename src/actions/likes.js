import { db } from '../firebase/firebase';
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

async function incrementCounter(ref) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * NUM_SHARDS).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    await shard_ref.update("count", firebase.firestore.FieldValue.increment(1));
    return shard_id;
}

async function decrementCounter(ref, shard_id) {
    const shard_ref = ref.collection('shards').doc(shard_id);
    const doc = await shard_ref.get();
    const count = await doc.data().count;

    if (count > 0) {
        await shard_ref.update("count", firebase.firestore.FieldValue.increment(-1));
    }
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

const getUserVoteDetails = async (userId, podcastId) => {
    let docs = await usersVotesRef.where("userId", "==", userId)
        .where("podcastId", "==", podcastId).get();

    let result = null;
    
    await docs.forEach(async doc => {
        result = await doc.data();
    });
    
    return result;
} 

const deleteUserVote = async (userId, podcastId) => {
    let docs = await usersVotesRef.where("userId", "==", userId)
        .where("podcastId", "==", podcastId).get();

    let shardId = null;
    
    await docs.forEach(async doc => {
        shardId = await doc.data().shardId;
        await doc.ref.delete();
    });

    return shardId;
}

export async function getVotes(podcastId) {
    return await getCount(podcastsRef.doc(podcastId));
}

export async function checkVote(userId, podcastId) {
    let doc = await usersVotesRef.where("userId", "==", userId)
        .where("podcastId", "==", podcastId).get();

    return !doc.empty;
}

export async function checkPodcastExists(podcastId) {
    let doc = await podcastsRef.doc(podcastId).get();

    return doc.exists
}

export async function registerVote(userId, podcastId) {
    const hasVoted = await checkVote(userId, podcastId);

    if (hasVoted) {    
        return false;
    } else {
        // vote 
        const podcastsExists = await checkPodcastExists(podcastId);
        if (!podcastsExists) {
            await createCounter(podcastsRef.doc(podcastId), NUM_SHARDS);
        }

        const shardId = await incrementCounter(podcastsRef.doc(podcastId));

        await usersVotesRef.add({
            userId: userId,
            podcastId: podcastId,
            shardId: shardId
        });

        return false;
    }
}

export const unregisterVote = async (userId, podcastId) => {
    // const hasVoted = await checkVote(userId, podcastId);
    
    // if (hasVoted) {

    const shardId = await deleteUserVote(userId, podcastId);
    if (shardId === null) {
        alert("Shard Id is null");
        return true;
    } else {
        alert(shardId)
        await decrementCounter(podcastsRef.doc(podcastId), shardId);
        return false;
    }


        
    // } else {

    // }
};
