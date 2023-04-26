
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Form from "react-bootstrap/Form";
import "./registerStyle.css";
import { Button, Col, Container, Dropdown, Row, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useraxios from "./../../axiosConfig/axiosInstance";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      Gender: "",
      Date: "",
    },
  });
  // const [formData, setFormData] = useState({});
  const [error, setError] = useState()

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await useraxios.post('/users/register', data);
      console.log('Data posted successfully');
      navigate("/login");

    } catch (error) {
      console.error('Error posting data:', error);
      setError(t("This Email is already Registered"));

    }
  };




  return (
    <>
      <h1>{t('Create New Customer Account')}</h1>

      <Container className="my-auto">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex justify-content-center flex-column align-items-between w-100"
        >
          <Row>
            <Col className="d-flex justify-content-center flex-column align-items-center">
              <h1>{t('Personal Information')}</h1>
              <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {t('First Name')}
                </Form.Label>{" "}
                <br />
                <Form.Control
                  className="register-input "
                  {...register("firstName", { required: true })}
                  placeholder={t('First Name')}
                />
                <p className="text-danger">
                  <errors>
                    {errors.firstName?.type === "required" && `${t('Name Is required')}`}
                  </errors>
                </p>
              </div>
              <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {" "}
                  {t('Last Name')}
                </Form.Label>{" "}
                <br />
                <Form.Control
                  className=" register-input"
                  {...register("lastName", {
                    required: true,
                    minLength: 2,
                    // pattern: /^\S*$/,
                  })}
                  placeholder={t('Last Name')}
                />
                <p className="text-danger">
                  <errors>
                    {errors.lastName?.type === "required" &&
                      `${t('LastName Is required')}`}
                    {/* {errors.UserName?.type === "pattern" && "No Space Allowed"} */}
                  </errors>{" "}
                </p>
              </div>
              <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {" "}
                  {t('Date of Birth')}
                </Form.Label>{" "}
                <br />
                <Form.Control
                  type="date"
                  className="form-control register-input"
                />
              </div>
              <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {t('Mobile Number')}
                </Form.Label>{" "}
                <br />
                <Form.Control
                  className="register-input"
                  {...register("phoneNumber", {
                    required: true, pattern: /^01[0125][0-9]{8}$/,
                  },

                  )}
                  placeholder={t('Mobile Number')}




                />
                <p className="text-danger">
                  <errors>
                    {errors.phoneNumber?.type === "required" &&
                      `${t('Please specify a valid mobile number')}`}
                    {errors.phoneNumber?.type === "pattern" && `${t('Please specify a valid mobile number')}`}

                  </errors>

                </p>
              </div>
              {/* <div>
                <Form.Label className="mt-3 font-weight-bold">
                  Gender
                </Form.Label>
                <br />
                <Dropdown>
                  <Dropdown.Toggle className="register-input bg-warning border-warning">
                    Select Gender
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item value="Male">Male</Dropdown.Item>
                    <Dropdown.Item value="Female">Female</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            
              </div> */}
            </Col>
            <Col className="d-flex justify-content-center flex-column align-items-center">
              <h1>{t('Sign-In Information')}</h1>
              <div>
                <Form.Label className="mt-3 font-weight-bold">{t('Email Address')}</Form.Label>{" "}
                <br />
                <Form.Control
                  className="register-input border-warning "
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})$/,
                  })}
                  placeholder={t('Email Address')}
                />{" "}
                <p className="text-danger">
                  <errors>
                    {errors.email?.type === "required" && `${t('Email is Required')}`}
                    {errors.email?.type === "pattern" && `${t('Please enter a valid email address.')}`}
                  </errors>
                </p>
              </div>
              {/* <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {t('Password')}
                </Form.Label>{" "}
                <br />
                <Form.Control
                  className="register-input"
                  type={"password"}
                  {...register("password", {
                    required: true,
                    minLength: 2,
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  })}
                  placeholder={t('Password')}
                />{" "}
                <p className="text-danger">
                  <errors>
                    {errors.password?.type === "required" &&
                      `${t('Passwrod is Required')}`}
                    {errors.password?.type === "pattern" && `${t('Password Pattern')}`
                    }                  </errors>
                </p>
              </div> */}
              <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {t('Password')}
                </Form.Label>{" "}
                <br />
                <InputGroup>
                  <Form.Control
                    className="register-input"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    })}
                    placeholder={t('Password')}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                <p className="text-danger">
                  {errors.password?.type === "required" &&
                    `${t('Password is Required')}`}
                  {errors.password?.type === "minLength" &&
                    `${t('Password must have at least 8 characters')}`}
                  {errors.password?.type === "pattern" &&
                    `${t('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character')}`}
                </p>
              </div>
              <div>
                <Form.Label className="mt-3 font-weight-bold">
                  {t('Confirm Password')}
                </Form.Label>{" "}
                <br />
                <InputGroup>

                  <Form.Control
                    className="register-input"
                    type={showPassword ? 'text' : 'password'}
                    {...register("ConfirmPassword", {
                      required: true,
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return `${t('Please make sure your passwords match.')}`;
                        }
                      },
                    })}
                    placeholder={t('Confirm Password')}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                <p className="text-danger">
                  <errors>
                    {errors.ConfirmPassword?.type === "required" &&
                      `${t('Passwrod is Required')}`}
                    {errors.ConfirmPassword?.type === "validate" &&
                      `${t('Please make sure your passwords match.')}`}
                  </errors>{" "}
                </p>{" "}
              </div>
              <p className="text-danger ">{error}</p>

              <Button
                variant="warning"
                type="submit"
                className="register-input"
              >
                {t('Create Account')}
              </Button>
              {/* <input type="submit" /> */}
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

////////

