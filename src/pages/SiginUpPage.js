import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import logo from "../assets/images/bsb-logo-light.svg";

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await AuthService.signUp(firstname, lastname, email, password, confirmPassword);
      history.push('signin');
    } catch(err) {
      console.error('Sign-up error:', err);
    }
  }
 

  return (
    <div className='content-sigin'> 
      <section class="bg-primary py-3 py-md-5 py-xl-8">
        <div class="container m-auto">
          <div class="row gy-4">
            <div class="col-12 col-md-6 col-xl-7">
              <div class="d-flex justify-content-center text-bg-primary">
                <div class="col-12 col-xl-9">
                  <img class="img-fluid rounded mb-4" loading="lazy" src={logo} width="245" height="80" alt="BootstrapBrain Logo" />
                  <hr class="border-primary-subtle mb-4" />
                  <h2 class="h1 mb-4">We make digital products that drive you to stand out.</h2>
                  <p class="lead mb-5">We write words, take photos, make videos, and interact with artificial intelligence.</p>
                  <div class="text-endx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-grip-horizontal" viewBox="0 0 16 16">
                      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xl-5">
              <div class="card border-0 rounded-4">
                <div class="card-body p-3 p-md-4 p-xl-5">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-4">
                        <h3>Sign Up</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="row gy-3 overflow-hidden">
                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" name="firstname" id="firstname" placeholder="First name" required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                          <label for="text" class="form-label">First name</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" name="lastname" id="lastname" placeholder="Last name" required value={lastname} onChange={(e) => setLastname(e.target.value)} />
                          <label for="test" class="form-label">Last name</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input type="email" class="form-control" name="email" id="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                          <label for="email" class="form-label">Email</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input type="password" class="form-control" name="password" id="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                          <label for="password" class="form-label">Password</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                          <label for="confirmPassword" class="form-label">Confirm Password</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
                          <label class="form-check-label text-secondary" for="remember_me">
                            Keep me logged in
                          </label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="d-grid">
                          <button class="btn btn-primary btn-lg" type="submit">Sign up</button>
                        </div>
                      </div>
                    </div>

                  </form>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                        <a href="#!">Forgot password</a>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
