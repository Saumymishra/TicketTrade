import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          form.current.reset();
        },
        () => {
          setError(true);
          setSuccess(false);
        }
      );
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
        <h2 className="card-title text-center mb-4">Contact Us</h2>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-3">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="5"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn text-white w-100"style={{backgroundColor: "#f97316"}}>
            Send Message
          </button>
          {success && (
            <div className="alert alert-success mt-3 p-2 text-center">
              Message sent successfully!
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-3 p-2 text-center">
              Failed to send message. Try again later.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;