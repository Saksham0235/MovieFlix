"use client";
import React, { useState } from "react";
import styles from "@/app/contact/contact.module.css";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
const ContactForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  //   passing data to the backend ie route.js and it will add data to the db
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Content_Type: "application/json" },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          phone: user.phone,
          message: user.message,
        }),
      });
      if (response.status === 200) {
        setUser({
          username: "",
          email: "",
          phone: "",
          message: "",
        });
        setStatus("Success");
      } else setStatus("Error");
    } catch (e) {
      console.log(e, "error in submission of form");
    }
  };
  return (
    <form className={styles.contact_form} onSubmit={handleSubmit}>
      <div className={styles.input_field}>
        <label htmlFor="username" className={styles.label}>
          Enter your name
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your name"
            className={mulish.className}
            value={user.username}
            onChange={handleChange}
            required 
            autoComplete="off"
          />
        </label>
      </div>
      <div className={styles.input_field}>
        <label htmlFor="email" className={styles.label}>
          Enter your Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={mulish.className}
            value={user.email}
            onChange={handleChange}
            required 
            autoComplete="off"
          />
        </label>
      </div>
      <div className={styles.input_field}>
        <label htmlFor="phone" className={styles.label}>
          Enter your Phone No
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter your Phone no"
            className={mulish.className}
            value={user.phone}
            onChange={handleChange}
            required 
            autoComplete="off"
          />
        </label>
      </div>

      <div className={styles.input_field}>
        <label htmlFor="message" className={styles.label}>
          Enter you Message
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            className={mulish.className}
            rows={5}
            value={user.message}
            onChange={handleChange} 
            autoComplete="off"
          />
        </label>
      </div>
      <div>
        <button type="submit" className={mulish.className}>
          Send Message
        </button>
      </div>
      <div>
        {status === "Success" && (
          <p className={styles.success_msg}>Thank you for your message</p>
        )}
        {status === "Error" && (
          <p className={styles.success_msg}>Error in Submitting the Form</p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
