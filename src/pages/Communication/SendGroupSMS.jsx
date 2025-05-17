import React, { useState } from 'react';
import axios from 'axios';

const SendGroupEmail = () => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const emailList = recipients
      .split(',')
      .map(email => email.trim())
      .filter(email => email);
  
    if (emailList.length === 0 || !subject.trim() || !message.trim()) {
      alert('Please enter recipients, subject, and message.');
      return;
    }
  
    const invalidEmails = emailList.filter(
      email => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
  
    if (invalidEmails.length > 0) {
      alert('These emails are invalid:\n' + invalidEmails.join(', '));
      return;
    }
  
    setIsSending(true);
  
    try {
      const res = await axios.post('http://localhost:5000/api/email/send-group', {
        recipients: emailList,
        subject,
        message,
      });
  
      if (res.data.success) {
        alert('Email sent successfully!');
        setRecipients('');
        setSubject('');
        setMessage('');
      } else {
        alert('Failed to send email: ' + res.data.error);
      }
    } catch (err) {
      console.error('Error sending email:', err);
      alert('Failed to send email.');
    } finally {
      setIsSending(false);
    }
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Send Group Email</h1>

      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Recipients :</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="email1@example.com, email2@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Subject :</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Message :</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </div>

        <button
    onClick={handleSend}
    disabled={isSending}
    className={`px-4 py-2 rounded text-white transition-all duration-200 ${
        isSending
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
    }`}
>
    {isSending ? 'Sending...' : 'Send Message'}
</button>

      </div>
    </div>
  );
};

export default SendGroupEmail;
