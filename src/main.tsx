import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Formik } from "formik";
import "./style.css";

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  interface FormValues {
    cardholderName: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
  }

  const initialValues: FormValues = {
    cardholderName: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.cardholderName) {
      errors.cardholderName = "Cardholder Name is required";
    }

    if (!values.cardNumber) {
      errors.cardNumber = "Card Number is required";
    } else if (!/^\d+$/.test(values.cardNumber)) {
      errors.cardNumber = "Card Number must contain only digits";
    } else if (values.cardNumber.length !== 16) {
      errors.cardNumber = "Card Number must be 16 digits";
    }

    if (!values.expirationMonth) {
      errors.expirationMonth = "Expiration Month is required";
    } else if (!/^(0[1-9]|1[0-2])$/.test(values.expirationMonth)) {
      errors.expirationMonth = "Expiration Month must be between 01 and 12";
    }

    if (!values.expirationYear) {
      errors.expirationYear = "Expiration Year is required";
    } else if (!/^\d{2}$/.test(values.expirationYear)) {
      errors.expirationYear = "Expiration Year must be in YY format";
    }

    if (!values.cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(values.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }

    return errors;
  };

  const onSubmit = (values: FormValues) => {
    // Form gönderimi başarılı olduğunda
    setIsSubmitted(true);
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <div className="app-container">
          <div className="row">
            <div className="col-md-4 col-sm-12 p-0">
              <div className="bg-img">
                <div className="card-front">
                  <div className="dots">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                  </div>
                  <div className="card-info">
                    <div className="card-number pb-3">
                      <h1>{values.cardNumber || "0000 0000 0000 0000"}</h1>
                    </div>
                    <div className="name-date-area pb-3">
                      <h4>{values.cardholderName || "JANE APPLESEED"}</h4>
                      <h4>
                        {values.expirationMonth || "00"}/{values.expirationYear || "00"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="card-back">
                  <div className="cvc">
                    <h3>{values.cvv || "000"}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12 ">
              <div className="form-area">
                {/* Form gönderildiyse başarı mesajı, gönderilmediyse form alanı */}
                {isSubmitted ? (
                  <div className="success-message">
                    <img src="./images/icon-complete.svg"/>
                    <h1 className="pt-4">THANK YOU!</h1>
                    <p className="py-2">We've added your card details</p>
                    <button>Continue</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="payment-form">
                    <label htmlFor="cardholderName">CARDHOLDER NAME</label>
                    <input
                      type="text"
                      name="cardholderName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cardholderName}
                      placeholder="e.g Jane Appleseed"
                    />
                    {errors.cardholderName && touched.cardholderName && (
                      <div style={{ color: "red" }}>{errors.cardholderName}</div>
                    )}

                    <label htmlFor="cardNumber">CARD NUMBER</label>
                    <input
                      type="text"
                      name="cardNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cardNumber}
                      placeholder="e.g 1234 5678 9123 0000"
                      maxLength={16}
                    />
                    {errors.cardNumber && touched.cardNumber && (
                      <div style={{ color: "red" }}>{errors.cardNumber}</div>
                    )}

                    <div className="row">
                      <div className="col-6">
                        <div>
                          <label htmlFor="expirationMonth">EXP. DATE (MM/YY)</label>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="expirationMonth"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.expirationMonth}
                              maxLength={2}
                              placeholder="MM"
                            />
                            {errors.expirationMonth && touched.expirationMonth && (
                              <div style={{ color: "red" }}>{errors.expirationMonth}</div>
                            )}
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="expirationYear"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.expirationYear}
                              maxLength={2}
                              placeholder="YY"
                            />
                            {errors.expirationYear && touched.expirationYear && (
                              <div style={{ color: "red" }}>{errors.expirationYear}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div>
                          <label htmlFor="cvv">CVC</label>
                        </div>
                        <input
                          type="text"
                          name="cvv"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cvv}
                          placeholder="e.g. 123"
                          maxLength={4}
                        />
                        {errors.cvv && touched.cvv && (
                          <div style={{ color: "red" }}>{errors.cvv}</div>
                        )}
                      </div>
                    </div>

                    <button type="submit">Confirm</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
 