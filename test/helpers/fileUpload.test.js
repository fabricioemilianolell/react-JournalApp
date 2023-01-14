import { v2 as cloudinary } from 'cloudinary'
import { FileUpload  } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: "dijrj6sqt",
    apy_key: "585983625326531",
    api_secret: "9A1f5mPwWbSDfFuFwn8AeRPr6Ik",
    secure: true

})

describe('Pruebas en fileUpload', () => { 

    test('debe de subir el archivo correctamente a cloudinary', async () => { 

        const imageUrl = "https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000"
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], "foto.jpg")

        const url = await FileUpload(file)
        expect( typeof url ).toBe("string")

        const segments = url.split("/")
        const imgUd = segments[segments.length - 1].replace(".jpg","");

        const cloudResp = await cloudinary.api.delete_resources([ "journal/" + imageId ])
            resource_type: "image" 

     });

     test('debe de retornar null', async() => {

        const file = new File([blob], "foto.jpg")
        const url = await FileUpload(file)
        expect( typeof url ).toBe("null")


     })

});