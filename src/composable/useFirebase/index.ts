import { inject } from 'vue'
import {FIREBASE_CONTEXT_CONSTANT} from "@plugins/firebase";
import type {FirebaseApp} from "firebase/app";

export const useFirebaseContext = (): FirebaseApp => {
    return inject(FIREBASE_CONTEXT_CONSTANT)!
}
