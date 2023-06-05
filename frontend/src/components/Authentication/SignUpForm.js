import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createSignUp } from '../../utils/apiService';

const SignUpForm = ({ onToggleForm }) => {
    const router = useRouter();
    const [error, setError] = useState('');

    const handleToggleClick = () => {
        onToggleForm();
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
            passwordConfirmation: e.target.passwordConfirmation.value,
        };

        try {
            await createSignUp(formData);

            router.push('/dashboard');
        } catch (error) {
            setError(`The email '${formData.email}' already exists.`);
            console.error("An error has occurred during registration.", error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleToggleClick}>Switch to Login</button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <form className="d-flex flex-column" onSubmit={handleSignUp}>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                        <input
                            required
                            value="test@gmail.com"
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else!</div>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="password" className="col-form-label">Password</label>
                        <div className="row g-3 align-items-center mb-1">
                            <div className="col-auto">
                                <input
                                    required
                                    value="Test123!!"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$"
                                    title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number." minLength="8"
                                    maxLength="20"
                                    type="password"
                                    name="password"
                                    id="inputPassword1"
                                    className="form-control"
                                    aria-labelledby="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text">
                                    Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                        <label htmlFor="passwordConfirmation" className="col-form-label">Password</label>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <input
                                    required
                                    value="Test123!!"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$"
                                    title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number." minLength="8"
                                    maxLength="20"
                                    type="password"
                                    name="passwordConfirmation"
                                    id="inputPassword2"
                                    className="form-control"
                                    aria-labelledby="passwordConfirmation"
                                    placeholder="Password Confirmation"
                                />
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
