import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useAppSelector} from "../../app/Hooks";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIh} from "./selectors";
import {authActions} from "./index";
import {useActions} from "../../utils/redux-utils";


type FormikValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const Login = () => {

    const isLoggedIh = useAppSelector(selectIsLoggedIh)
    const {loginTC} = useActions(authActions)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length <= 2) {
                errors.password = 'Invalid password'
            }
            return errors
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const res = await loginTC(values);
            formikHelpers.setFieldError('email', 'Error')
            formik.resetForm();
        },
    })

    if (isLoggedIh) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.email &&
                        formik.errors.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null}
                        <TextField type="password" label="Password" margin="normal"
                                   {...formik.getFieldProps('password')}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.password &&
                        formik.errors.password
                            ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                            : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox color={'secondary'}
                            onChange={formik.handleChange} checked={formik.values.rememberMe} name='rememberMe'/>}/>
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}