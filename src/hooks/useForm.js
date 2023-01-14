
import { useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators()

    }, [ formState ])

    useEffect(() => {
        setFormState(initialForm)
        
    }, [initialForm])
    
    
    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            
            if ( formValidation[formValue] !== null) {
                return false
            }
        }

        return true;

    }, [ formValidation ])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValue = {}

        for( const formFiled of Object.keys( formValidations )) {
            const [fn, errorMessage = "este camo es requerido"] = formValidations[formFiled]

            formCheckedValue[`${ formFiled }Valid`] = fn( formState[formFiled] ) ? null : errorMessage

        }

        setFormValidation(formCheckedValue)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        
        ...formValidation,
        isFormValid
        
    }
}