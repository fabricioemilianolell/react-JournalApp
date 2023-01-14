import { async } from "@firebase/util"
import { deleteDoc, doc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/provider"
import { fileUpload } from "../../helpers/fileUpload"
import { clearNoteLogout, deleteNoteById, setNotes, setPhotosActiveNote, setSaving } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )
    }
}


export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )        

        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( logout ( result.errorMessage )) 
    
        dispatch( login( result ) )
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, photoURL } = await registerUserWithEmailPassword( { email, password, displayName })
        
        if (!ok) return dispatch( logout( { errorMessage } ) )
    
        dispatch( login( { uid, displayName, email, photoURL }))
    }

}

export const startLoginWithEmailPassword = ( { email, password } ) => {

   return async ( dispatch ) => {

    dispatch( checkingCredentials() )

    const result = await loginWithEmailPassword( { email, password })
    
    if( !result.ok ) return dispatch( logout ( result )) 
    
    dispatch( login( result ) ) 

    }
}

export const startLogout = () => {
    
    return async (dispatch) => {
        
        await logoutFirebase();
        dispatch( clearNoteLogout() )
        dispatch( logout() );


    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth
        if (!uid) throw new Error("El UID del usuario no existe")

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    
    return async(dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB,`${ uid }/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })
        
        dispatch(updateNote(note))
    }
}

export const startUploadFiles = ( files = [] ) => {
    return async(dispatch) => {
        dispatch(setSaving() )

        await fileUpload(files[0])

        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all( fileUploadPromises )
        
        dispatch(setPhotosActiveNote(photosUrls))
    }
}

export const starDeletingNote = () => {
    return async( dispatch, getState ) => {

        const {uid} = getState().auth
        const {active: note} = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)

        dispatch(deleteNoteById(note.id))

    }
}