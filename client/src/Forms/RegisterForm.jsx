import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '../schema/Auth.Schema';
import Image from '../components/ui/Image';
import { Link } from 'react-router-dom';
import { handleUpload } from '../utils/imageupload';
import toast from 'react-hot-toast';

const RegisterForm = ({ handleSubmit, isProcessing }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImageUrl(localUrl);
      setUploading(true);
      
      const uploadPromise = handleUpload(file);

      toast.promise(uploadPromise, {
        loading: 'Uploading avatar...',
        success: (url) => {
           setUploading(false);
           const avatarUrl = url.href || url;
           setValue("avatar", avatarUrl);
           return "Avatar uploaded successfully!";
        },
        error: (err) => {
           setUploading(false);
           console.error(err);
           return "Failed to upload avatar.";
        },
      });
    }
  };

  const onSubmit = (data) => {
    handleSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="grid-form">
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="tel"
          id="phonenumber"
          placeholder="Enter your phone number"
          {...register('phonenumber')}
        />
        {errors.phonenumber && <span className="error-message">{errors.phonenumber.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <div className="input-group span-2">
         {/* Custom Image component integration */}
         {/* Note: The Image component uses internal input logic but passes change event up. 
             We intercept to update RHF state and local preview. 
             The Image component expects 'index' but we can use it for unique ID if needed or just omit if optional/handled internal.
             Based on Image.jsx: id={`custom-image-${index}`}
         */}
         <Image 
            label="Upload Avatar" 
            index="register-avatar" 
            url={imageUrl} 
            handleImageChange={handleImageChange} 
         />
         {errors.avatar && <span className="error-message">{errors.avatar.message}</span>}
      </div>

      <button type="submit" disabled={isProcessing || uploading} className="span-2 full-width">
        {uploading ? 'Uploading Image...' : (isProcessing ? 'Registering...' : 'Register')}
      </button>

      <div className="span-2" style={{ textAlign: 'center', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;


