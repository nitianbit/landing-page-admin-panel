import React, { useContext, useNa, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets/index'
import { AppContext } from '../../services/context/AppContext';
import { ENDPOINTS } from '../../services/api/constants';
import { doPOST } from '../../utils/HttpUtil';

const Signup = () => {
    const navigate = useNavigate();

    const { success, error } = useContext(AppContext)

    const [data, setData] = useState({})

    const signUp = async () => {
        if ((!data?.name || !data?.email || !data?.password || !companyName || !websiteURL)) {
            return error('Please Enter all required Fields');
        }
        try {
            const response = await doPOST(ENDPOINTS.register, data)
            navigate("/")
            success("Signup Successfull")
            return
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">
                                    <a href="#!">
                                        <img src={logo} alt="Logo" width="75" height="auto" style={{
                                            borderRadius: "50%",
                                            objectFit: "contain"
                                        }} />
                                    </a>
                                </div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                                <form action="#!">
                                    <div className="row gy-2 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    value={data?.name}
                                                    onChange={(v) => {
                                                        setData(prevData => ({
                                                            ...prevData,
                                                            name: v.target.value
                                                        }))
                                                    }}
                                                    type="text" className="form-control" name="name" id="name" placeholder="Name" required />
                                                <label htmlFor="name" className="form-label required">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    value={data?.email}
                                                    onChange={(v) => {
                                                        setData(prevData => ({
                                                            ...prevData,
                                                            email: v.target.value
                                                        }))
                                                    }}
                                                    type="text" className="form-control" name="email" placeholder="Email" required />
                                                <label htmlFor="email" className="form-label required">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    value={data?.password}
                                                    onChange={(v) => {
                                                        setData(prevData => ({
                                                            ...prevData,
                                                            password: v.target.value
                                                        }))
                                                    }}
                                                    type="password" className="form-control" name="password" id="password" placeholder="Password" required />
                                                <label htmlFor="password" className="form-label required">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    value={data?.companyName}
                                                    onChange={(v) => {
                                                        setData(prevData => ({
                                                            ...prevData,
                                                            companyName: v.target.value
                                                        }))
                                                    }}
                                                    type="text" className="form-control" name="companyName" id="companyName" placeholder="Company Name" required={true} />
                                                <label htmlFor="companyName" className="form-label required">Company Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    value={data?.websiteURL}
                                                    onChange={(v) => {
                                                        setData(prevData => ({
                                                            ...prevData,
                                                            websiteURL: v.target.value
                                                        }))
                                                    }}
                                                    type="text" className="form-control" name="websiteURL" id="websiteURL" placeholder="Website URL" required />
                                                <label htmlFor="websiteURL" className="form-label required">Website URL</label>
                                            </div>
                                        </div>
                                        {/* <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="iAgree" id="iAgree" required />
                                                <label className="form-check-label text-secondary" htmlFor="iAgree">
                                                    I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                                                </label>
                                            </div>
                                        </div> */}
                                        <div className="col-12">
                                            <div className="d-grid my-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        signUp();
                                                    }}
                                                    className="btn btn-primary btn-lg" type="submit">Sign up</button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="m-0 text-secondary text-center">Already have an account? <a onClick={() => navigate("/")} className="link-primary text-decoration-none cursor-pointer">Login</a></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
