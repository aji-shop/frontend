import React, { useState } from 'react'
import {
    Route, useHistory
} from 'react-router-dom'

import './style.css'

import User from '../../service/user'

export interface AuthViewProps {
    handleAuth(token: string, user: any): void,
}

export default function AuthView(props: AuthViewProps) {
    let history = useHistory()

    const [signInEmailValue, setSignInEmailValue]: [string, any] = useState('')
    const [signInPasswordValue, setSignInPasswordValue]: [string, any] = useState('')

    const [signUpNameValue, setSignUpNameValue]: [string, any] = useState('')
    const [signUpEmailValue, setSignUpEmailValue]: [string, any] = useState('')
    const [signUpPhoneValue,setSignUpPhoneValue]: [string, any] = useState('')
    const [signUpPasswordValue, setSignUpPasswordValue]: [string, any] = useState('')

    const handleSignInNameChange = (event: any) => {
        setSignInEmailValue(event.target.value)
    }

    const handleSignInPasswordChange = (event: any) => {
        setSignInPasswordValue(event.target.value)
    }

    const handleSignUpNameChange = (event: any) => {
        setSignUpNameValue(event.target.value)
    }

    const handleSignUpEmailChange = (event: any) => {
        setSignUpEmailValue(event.target.value)
    }

    const handleSignUpPhoneChange = (event: any) => {
        setSignUpPhoneValue(event.target.value)
    }

    const handleSignUpPasswordChange = (event: any) => {
        setSignUpPasswordValue(event.target.value)
    }

    const handleSignin = (event: any) => {
        event.preventDefault()
        User.auth({email: signInEmailValue, password: signInPasswordValue}).then(res => {
            props.handleAuth(res.data.token, res.data.user)
            history.push('/home')
        }, err => {alert('Email or password is incorrect. Please try again')})
    }

    const handleSignUp = (event: any) => {
        event.preventDefault()
        
        const user = {
            name: signUpNameValue,
            email: signUpEmailValue,
            phone: signUpPhoneValue,
            password: signUpPasswordValue
        }

        User.create(user).then(res => {

            props.handleAuth(res.data.token, 
            {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password
            })
            history.push('/home')
        }, err => {alert('email already exists')})
    }

    return (
        <>            
            
                <Route path="/signin">
                <div className="row auth bg-dark text-light">
                    <form onSubmit={(event: any) => {handleSignin(event)}}>
                        <div className="form-group">
                            <label htmlFor="signInEmailInput">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="signInEmailInput"
                                value={signInEmailValue}
                                onChange={handleSignInNameChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signInPasswordInput">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="signInPasswordInput"
                                value={signInPasswordValue}
                                onChange={handleSignInPasswordChange}
                                required
                            />
                        </div>
                        <div className="btn-group" role="group">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                            <button className="btn btn-secondary" onClick={() => {
                                setSignInPasswordValue('')
                                setSignInEmailValue('')
                                history.push('/signup')
                            }}>I don't have an account</button>

                            <button className="btn btn-danger" onClick={() => {
                                setSignInPasswordValue('')
                                setSignInEmailValue('')
                                history.push('/home')
                            }}>Cancel</button>
                        </div>
                    </form>
                    </div>
                </Route>

                <Route path="/signup">
                    <div className="row auth bg-dark text-light">
                    <form onSubmit={(event: any) => {handleSignUp(event)}}>
                        <div className="form-group">
                            <label htmlFor="signUpNameInput">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="signUpNameInput"
                                value={signUpNameValue}
                                onChange={handleSignUpNameChange}
                                minLength={5}
                                maxLength={40}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signUpEmailInput">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="signUpEmailInput"
                                value={signUpEmailValue}
                                onChange={handleSignUpEmailChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signUpPhoneInput">Phone</label>
                            <input 
                                type="tel"
                                placeholder="+48111111111"
                                pattern={'[+]48([0-9]{9})'}
                                className="form-control" 
                                id="signUpPhoneInput"
                                value={signUpPhoneValue}
                                onChange={handleSignUpPhoneChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signUpPasswordInput">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="signUpPasswordInput"
                                value={signUpPasswordValue}
                                onChange={handleSignUpPasswordChange}
                                minLength={5}
                                required
                            />
                        </div>
                        <div className="btn-group" role="group">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                            <button className="btn btn-secondary" onClick={() => {
                                setSignUpNameValue('')
                                setSignUpEmailValue('')
                                setSignUpPhoneValue('')
                                setSignUpPasswordValue('')
                                history.push('/signin')
                            }}>I have already an account</button>
                            <button className="btn btn-danger" onClick={() => {
                                setSignUpNameValue('')
                                setSignUpEmailValue('')
                                setSignUpPhoneValue('')
                                setSignUpPasswordValue('')
                                history.push('/home')
                            }}>Cancel</button>
                        </div>
                    </form>
                    </div>
                </Route>
            
        </>
    )
}
