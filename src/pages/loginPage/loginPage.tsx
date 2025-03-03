import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import styles from './loginPage.module.css';
import { login } from '../../utils/api';

const LoginPage = () => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const [inputsErrors, setinputsErrors] = useState({
        email: '',
        password: '',
    });

    const [ isValid, setIsValid ] = useState(true);


    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!validEmail.test(String(e.target.value))) {
            setinputsErrors({ ...inputsErrors, email: 'Incorrect email' })
        } else {
            setinputsErrors({ ...inputsErrors, email: '' })
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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
        await login({email, password});
    }

    useEffect(() => {
        if (!email || !password || inputsErrors.email || inputsErrors.password) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [password, email]);


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
                            value={email}
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
                            value={password}
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