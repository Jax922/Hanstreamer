

import firebase from "firebase/compat/app";
import { database, storage } from "../../firebase";


export default function slidesUpload(uid, file, title) {
    const fileName = `slide_${Date.now()}.json`
    const uploadTask = storage
        .ref(`/slides/${uid}/${fileName}`)
        .put(file);

    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.error('Error during upload:', error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const data = {
                    url: downloadURL,
                    name: fileName,
                    userId: uid,
                    coverImg: "/empty_slides.jpeg",
                    createdAt: database.getCurrentTimestamp(),
                    ordering: 0,
                    updateTime: database.getCurrentTimestamp(),
                    title: title
                };
                database.slides.add(data);
            });
        }
    );
    


}