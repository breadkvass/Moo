import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import styles from './loginPage.module.css';

const LoginPage = () => {
    const [ emailValue, setEmailValue ] = useState<string>('');
    const [ passwordValue, setPasswordValue ] = useState<string>('');

    const [inputsErrors, setinputsErrors] = useState({
        email: '',
        password: '',
    });

    const [ isValid, setIsValid ] = useState(true);


    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!validEmail.test(String(e.target.value))) {
            setinputsErrors({ ...inputsErrors, email: 'Incorrect email' })
        } else {
            setinputsErrors({ ...inputsErrors, email: '' })
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
        const validPasswordLength = 8;
        if (e.target.value.length < validPasswordLength) {
            setinputsErrors({ ...inputsErrors, password: 'The password must be 8 characters or more' })
        } else {
            setinputsErrors({ ...inputsErrors, password: '' })
        }
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(emailValue, passwordValue);
        // await loginUser(emailValue, passwordValue);
        // navigate('/profile');
    }

    useEffect(() => {
        if (!emailValue || !passwordValue || inputsErrors.email || inputsErrors.password) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [passwordValue, emailValue]);


    return (
        <Layout>
            <form className={styles.form} onSubmit={e => onSubmitHandler(e)}>
                <div className={styles.inputs}>
                    <label className={styles.label}>Email address
                        <input
                            className={styles.input}
                            type='email'
                            placeholder='Enter email'
                            onChange={(e) => emailHandler(e)}
                            value={emailValue}
                            name={'login'}
                        />
                        {inputsErrors.email && <p className={styles.error}>{inputsErrors.email}</p>}
                        <p className={styles.text}>We'll never share your email with anyone else</p>
                    </label>
                    <label className={styles.label}>Password
                        <input
                            className={styles.input}
                            type='password'
                            placeholder='Password'
                            onChange={(e) => passwordHandler(e)}
                            value={passwordValue}
                            name={'password'}
                        />
                        {inputsErrors.password && <p className={styles.error}>{inputsErrors.password}</p>}
                    </label>
                </div>
                <button className={styles.button} type='submit' disabled={!isValid ? true : false} >Submit</button>
            </form>
        </Layout>
    );
}

export default LoginPage;