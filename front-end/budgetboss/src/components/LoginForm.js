import React from 'react';
import axios from 'axios';


const LoginForm = ({ onToggleForm }) => {
    const handleToggleClick = () => {
        onToggleForm();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(e.target.email);
        console.log(e.target.password);

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);

            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleToggleClick}>Switch to Sign Up</button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <form className="d-flex flex-column" onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email Address</label>
                        <input required type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-auto">
                        <label for="inputPassword6" className="col-form-label">Password</label>
                        <div className="row g-3 align-items-center mb-1">
                            <div className="col-auto">
                                <input name="password" required minlength="8" maxlength="20" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,}$" title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
                                    placeholder="Enter your password" type="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" placeholder="Password" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 btn-shrink">Login</button>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
