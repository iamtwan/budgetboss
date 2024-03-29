'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createSignUp, sendSignUpCode } from '../../../services/apiService';
import { Button, Form } from 'react-bootstrap';

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [verificationPrompt, setVerificationPrompt] = useState(false);
  const verificationCodeRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;
    const passwordConfirmationValue = e.target.passwordConfirmation.value;

    if (passwordValue !== passwordConfirmationValue) {
      setError('Passwords do not match.');
      return;
    } else {
      setFormData({
        email: emailValue,
        password: passwordValue,
        passwordConfirmation: passwordConfirmationValue,
      });
    }

    try {
      await sendSignUpCode(emailValue);

      setVerificationPrompt(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(`The email ${emailValue} already exists.`);
        return;
      }
      setError(`Error sending verification email to '${emailValue}'.`);
    }
  };

  const handleSignUpVerification = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      verificationCode: verificationCodeRef.current.value,
    };

    console.log(updatedFormData.verificationCode);

    try {
      await createSignUp(updatedFormData);

      router.push('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (
          error.responseData &&
          error.responseData.detail.toLowerCase() === 'invalid or expired verification code'
        ) {
          setError('Invalid or Expired Verification Code');
          return;
        }
      }
      setError(`Registration error for '${formData.email}'. Please try again or contact support.`);
    }
  };

  return (
    <div className="container row">
      <Form className="row d-flex justify-content-around" onSubmit={handleSignUp}>
        <div className="container row d-flex justify-content-around">
          <div className="col-sm-12 col-md-5 col-lg-4">
            <Form.Label htmlFor="exampleInputEmail1" className="col-form-label fw-bold nav-text">
              Email Address
            </Form.Label>
            <div className="row g-3 align-items-center mb-1">
              <div className="col-auto">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter a valid email"
                  autoComplete="email"
                />
              </div>
              <div className="col-auto">
                <Form.Text id="emailHelp" className="form-text">
                  We'll never share your email with anyone else!
                </Form.Text>
              </div>
            </div>
            {verificationPrompt && (
              <>
                <Form.Label htmlFor="codeInput" className="form-label fw-bold nav-text">
                  Verification Code
                </Form.Label>
                <div className="row g-3 align-items-center mb-1">
                  <div className="col-auto">
                    <Form.Control
                      required
                      type="number"
                      name="verificationCode"
                      ref={verificationCodeRef}
                      className="form-control"
                      id="codeInput"
                      aria-describedby="verificationCode"
                      placeholder="Enter code"
                    />
                  </div>
                  <div className="col-auto">
                    <Form.Text id="passwordHelpInline" className="form-text text-center">
                      {error && <p className="text-danger">{error}</p>}
                    </Form.Text>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    id="auth-signup-btn"
                    type="button"
                    className="btn mt-3 btn-shrink"
                    onClick={handleSignUpVerification}
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
            {!verificationPrompt && error && <p className="text-danger">{error}</p>}
          </div>
          <div className="col-sm-12 col-md-5 col-lg-4">
            <Form.Label htmlFor="password" className="col-form-label fw-bold nav-text">
              Password
            </Form.Label>
            <div className="row g-3 align-items-center mb-1">
              <div className="col-auto">
                <Form.Control
                  required
                  // value='Test123!!'
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$"
                  title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
                  minLength="8"
                  maxLength="20"
                  type="password"
                  name="password"
                  id="inputPassword1"
                  className="form-control"
                  aria-labelledby="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </div>
              <div className="col-auto">
                <Form.Text id="passwordHelpInline" className="form-text text-center">
                  Must be 8-20 characters long.
                </Form.Text>
              </div>
            </div>
            <Form.Label htmlFor="passwordConfirmation" className="col-form-label fw-bold nav-text">
              Confirm Password
            </Form.Label>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <Form.Control
                  required
                  // value='Test123!!'
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$"
                  title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
                  minLength="8"
                  maxLength="20"
                  type="password"
                  name="passwordConfirmation"
                  id="inputPassword2"
                  className="form-control"
                  aria-labelledby="passwordConfirmation"
                  placeholder="Password Confirmation"
                  autoComplete="new-password"
                />
              </div>
              <div className="col-auto">
                <Form.Text id="passwordHelpInline" className="form-text">
                  Must be 8-20 characters long.
                </Form.Text>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                id="auth-signup-btn"
                type="submit"
                className="btn btn-primary mt-3 btn-shrink"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
