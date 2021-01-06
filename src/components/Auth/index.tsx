import React from 'react'
import {
    Link
} from 'react-router-dom'


export default function Auth(props:any) {
    return (
        <div className="auth d-flex mr-2">
            {props.user != null ? (
                <>
                    <span>{props.user.name}</span>
                    <button className="btn btn-danger ml-3" onClick={props.handleLogOut}>Log out</button>  
                </>
            ) : (
            <>
                <Link to="/signin">
                    <button className="btn btn-primary m-2">Sign in</button>
                </Link>
                
                <Link to="/signup">
                    <button className="btn btn-dark m-2">Sign up</button>
                </Link>
            </>
            )
            }
            
        </div>
    )
}