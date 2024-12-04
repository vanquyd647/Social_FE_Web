// utils/uploadImage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../configs/firebaseConfig";    

export const uploadImageAsync = async (file) => {
    try {
        if (!file) throw new Error("No file provided for upload.");

        // Generate a unique file path in Firebase Storage
        const filename = `Social_app/${Date.now()}_${file.name}`;
        const photoRef = ref(storage, filename);

        // Upload the file
        await uploadBytes(photoRef, file);

        // Get the file's download URL
        return await getDownloadURL(photoRef);
    } catch (error) {
        console.error("Image upload error:", error);
        throw error;
    }
};
