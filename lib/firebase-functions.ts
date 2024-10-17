import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {setDoc, doc, serverTimestamp, updateDoc} from "firebase/firestore";

import {storage, auth, db} from "./firebase";

// user authentication
interface CreateUserProps {
  email: string;
  username: string;
  mobileNumber: string;
  password: string;
}

export const createUser = async (form: CreateUserProps) => {
  try {
    const {email, username, mobileNumber, password} = form;

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "user", response.user.uid), {
      email,
      mobileNumber,
      username: username.toLowerCase(),
      timestamp: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

interface SignInProps {
  email: string;
  password: string;
}

export const signIn = async (form: SignInProps) => {
  try {
    const {email, password} = form;

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error);
  }
};

interface UpdateUserImageProps {
  userId: string;
  cAvatar?: any;
  file: any;
}

export const updateUserImage = async (form: UpdateUserImageProps) => {
  try {
    const {userId, cAvatar, file} = form;

    if (cAvatar) {
      await deleteImage(cAvatar);
    }

    const avatar = await uploadImage(file, "user");

    const obj = {avatar};

    await updateDoc(doc(db, "user", userId), {...obj});
  } catch (error: any) {
    throw new Error(error);
  }
};

interface UpdateUserDataProps {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  dob: any;
  gender: string;
}

export const updateUserData = async (form: UpdateUserDataProps) => {
  try {
    const {userId, firstName, lastName, username, dob, gender} = form;

    await updateDoc(doc(db, "user", userId), {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username: username.toLowerCase(),
      dob,
      gender,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

interface UpdateUserAddressProps {
  userId: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  addressline: string;
}

export const updateUserAddress = async (form: UpdateUserAddressProps) => {
  try {
    const {userId, city, state, country, zip, addressline} = form;

    await updateDoc(doc(db, "user", userId), {
      city: city.toLowerCase(),
      state: state.toLowerCase(),
      country: country.toLowerCase(),
      zip,
      addressline: addressline.toLowerCase(),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

// storage
export const uploadImage = async (file: any, path: string) => {
  try {
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `${path}/${file.fileName}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export const uploadImages = async (files: any, path: string) => {
  const multipleImagePromise = files.map(async (file: any) => {
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `${path}/${file.fileName}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  });
  const result = await Promise.all(multipleImagePromise);
  return result;
};

export const deleteImage = async (imageURL: string) => {
  try {
    const imageRef = ref(storage, imageURL);
    await deleteObject(imageRef);
  } catch (error) {
    throw error;
  }
};
