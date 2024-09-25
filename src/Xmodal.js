import React, { useState } from 'react';
import './Xmodal.css'; // Assuming you have styles defined for your modal

const Xmodal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});

  // Opens the modal when the button is clicked
  const openModal = () => setIsOpen(true);

  // Closes the modal when clicked outside or after submission
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear error message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Basic validation checks for the form fields
    if (!formData.username) validationErrors.username = 'Please fill out the Username field.';
    if (!formData.email.includes('@')) validationErrors.email = 'Invalid email. Please check your email address.';
    if (!formData.phone || formData.phone.length !== 10) validationErrors.phone = alert('Invalid phone number. Please enter a 10-digit phone number.');
    if (new Date(formData.dob) > new Date()) validationErrors.dob = alert('Invalid date of birth. Date of birth cannot be in the future.');

    // If there are validation errors, show them
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset form and close modal if validation passes
    setFormData({ username: '', email: '', phone: '', dob: '' });
    closeModal();
  };

  return (
    <div className="modal-container">
    <h1>User Details Modal</h1>

    {/* Button to open the modal */}
    <button onClick={openModal} className="open-form-button">Open Form</button>

    {/* Modal Content */}
    {isOpen && (
      <div className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Fill Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <br/>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            </div>
            <br/>

            <div>
              <label>Email Address:</label>
              <br/>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <br/>

            <div>
              <label>Phone Number:</label>
              <br/>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit phone number"
              />
              {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            </div>
            <br/>

            <div>
              <label>Date of Birth:</label>
              <br/>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
            </div>
            <br/>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default Xmodal;
