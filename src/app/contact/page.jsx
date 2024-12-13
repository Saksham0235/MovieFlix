import React from "react";
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import styles from "./contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <ContactCard />
      <section className={styles.contact_section}>
        <h2>
          We'd love to hear <span>from you </span>
        </h2>
        <ContactForm />
      </section>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224096.98009549628!2d76.92842336292017!3d28.64428520953214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1734004425209!5m2!1sen!2sin"
        width={1000}
        height={450}
        style={{border:0}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={styles.mapping}
      ></iframe>
    </div>
  );
};

export default Contact;
