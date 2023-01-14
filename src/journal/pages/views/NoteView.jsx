import { DeleteOutline, NotStartedOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormAction } from "react-router-dom"
import { useForm } from "../../../hooks/useForm"
import { setActiveNote } from "../../../store/journal/journalSlice"
import { ImageGallery } from "../components/ImageGallery"
import Swal from "sweetalert2"
import  "sweetalert2/dist/sweetalert2.css";
import { starDeletingNote, startUploadFiles } from "../../../store/auth/thunks"

export const NoteView = () => {

const dispatch = useDispatch()

const { active:note, MessageSaved, isSaving } = useSelector( state => state.journal); 

const { body, title, date, onInputChange, formState } = useForm( note );

const dateString = useMemo(() => {
    const newDate = new Date( date )
    return newDate.toUTCString()

}, [date])

const fileInputRef = useRef(second)()

useEffect(() => {
    dispatch(setActiveNote(formState))

}, [formState])

useEffect(() => {
if (MessageSaved.length > 0) {
    Swal.fire("Nota actualizada", MessageSaved, "succes")
}
}, [MessageSaved])

const onSaveNote = () => {
    dispatch( startSaveNote() )
}

const onFileInputChange = (e) => {
    if (e.target.files === 0) return;
    dispatch(startUploadFiles(target.files))
}

const onDelete = () => {
    dispatch(starDeletingNote())
}

return (
        <Grid 
        container 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 1 }}
        className="animate__animated animate__fadeIn animate__faster"
        >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight= "light">{ dateString }</Typography>
        </Grid>

        <Grid item>

            <input 
            type="file"
            multiple
            ref={fileInputRef}
            onChange={ onFileInputChange }
            style={{ display: "none" }}
            />

            <IconButton 
            color="primary"
            disabled={isSaving}
            onClick={ () => fileInputRef.current.click() }>
                <UploadOutlined/>
            </IconButton>

            <button
             disabled={isSaving}
            onClick={onSaveNote}
            color="primary" 
            sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingresar un título"
                label="Titulo"
                sx={{ border: "none", mb: 1 }}
                name="title"
                value={ title }
                onChange={onInputChange}

                />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Qué sucedió Hoy"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={onInputChange}
                
                />
        </Grid>

        <Grid container justifyContent="end">
            <Button
            onClick={onDelete} 
            sx={{ mt: 2}}
            color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>

        <ImageGallery images={note.imageUrls} />
        

    </Grid>
    
  )
}
