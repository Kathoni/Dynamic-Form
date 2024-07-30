import React, { useState } from 'react';

const CreateAccount = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    // Regular expression to check for exactly 8 characters and at least one number
    if (value.length <= 8 && /\d/.test(value)) {
      setPassword(value);
      setError('');
    } else {
      setError('Password must be exactly 8 characters long and contain a number.');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) {
        throw new Error('Account creation failed');
      }

      alert('Account created successfully!');

      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className='text-bg-white p-3'>
      <div style={{ backgroundColor: '#F4F6F7', padding: '30px', maxWidth: '600px', margin: 'auto', fontSize: '600', flex: 'center', borderRadius: '40px' }}>
        <h1 className='fs-2 color-#fff'>Create Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleCreateAccount} style={{ padding: '20px', borderRadius: '40px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'black' }}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'black' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'black' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              maxLength={8}
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'black' }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', border: 'none', color: 'black', cursor: 'pointer' }}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
