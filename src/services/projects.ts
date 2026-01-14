import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const addProject = async (project: any) => {
  await addDoc(collection(db, "projects"), project);
};

export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const deleteProject = async (id: string) => {
  await deleteDoc(doc(db, "projects", id));
};
