import React from 'react';
import axios from 'axios';


const SignUpForm = ({ onToggleForm }) => {
    const handleToggleClick = () => {
        onToggleForm();
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/users/register`, formData, {
                withCredentials: true
            });
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                console.error(error.response.data, error);
            } else {
                console.error('An error occurred during registration.', error);
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleToggleClick}>Switch to Login</button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <form className="d-flex flex-column" onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                        <input value="test@gmail.com" required type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else!</div>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                        <div className="row g-3 align-items-center mb-1">
                            <div className="col-auto">
                                <input value="Test123!!" required minLength="8" maxLength="20" type="password" name="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" placeholder="Password" />
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text">
                                    Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <input value="Test123!!" required minLength="8" maxLength="20" type="password" name="passwordConfirmation" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" placeholder="Password Confirmation" />
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text">
                                    Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 btn-shrink">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
