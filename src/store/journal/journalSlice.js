import { createSlice } from '@reduxjs/toolkit';
import { arrayRemove } from 'firebase/firestore/lite';


export const journalSlice = createSlice({
name: 'journal',
initialState: {
    isSaving: false,
    MessageSaved: "",
    notes: [],
    notes: null,
    active: {
        id: "ABC123",
        title: "",
        body: "",
        fecha: 123456,
        imageUrls: [],
    }
},

reducers: {
    savingNewNote: ( state ) => {  
        state.isSaving = true
    },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.MessageSaved = "";
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.MessageSaved = ""
        },
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map( note => {
               
                if (note.id === action.payload.id) {
                    return action.payload
                } 
                
                return note
            })

            state.MessageSaved = `${action.payload.title}, actualizada correctamente`
        },

        setPhotosActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false;
        },

        clearNoteLogout: (state) => {
            state.isSaving = false;
            state.MessageSaved = "";
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload)
        },

    }
})



export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosActiveNote, clearNoteLogout } = counterSlice.actions
