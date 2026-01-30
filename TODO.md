# Project Status: Backend vs Frontend Discrepancies

This document lists features that are implemented in the backend but are missing or incomplete in the frontend.

## Implemented in Backend but Missing in Frontend

### 1. Reviews and Comments
- **Backend**: `Review.router.js` provides endpoints to:
    - Add a comment (`POST /api/v1/review/:id`)
    - Edit a comment (`PATCH /api/v1/review/:id/:commentId`)
    - Delete a comment (`DELETE /api/v1/review/:id/:commentId`)
- **Frontend**:
    - `ProductDescriptionPage.jsx` and `ProductDescription.jsx` do not have any UI components to display reviews or forms to add/edit/delete them.

### 2. Profile Editing
- **Backend**: `Auth.router.js` provides an endpoint to update user profile:
    - `PATCH /api/v1/auth/profile/:id`
- **Frontend**:
    - `ProfileCard.jsx` does not have any "Edit Profile" button or form.

### 3. View All Rents (Admin/Global View)
- **Backend**: `Dashboard.router.js` has an endpoint to get all rents:
    - `GET /api/v1/dashboard/allrents`
- **Frontend**:
    - This endpoint is not used. The frontend uses `/rented` (for leased products) and `/myorder` (for user's orders), but there is no global view of all rents (which might be intended for an admin dashboard).

## Incomplete Frontend Implementations

### 1. Profile Display
- **File**: `client/src/components/ProfileCard.jsx`
- **Issue**: The component displays hardcoded static data (Name: "Manu Acharya", Location: "S N Nagar Sagar", etc.) instead of rendering the `profile` data fetched from the context/API.

### 2. Edit Product
- **File**: `client/src/components/EditProduct.jsx`
- **Issue**: The image handling logic is incomplete/buggy.
    - The `imageArray` state is initialized to `[]` and is used to update the product in `editProduct` function.
    - There is no logic to pre-fill `imageArray` with existing images or to handle new image uploads (the `handleUpload` utility is imported but not used).
    - Submitting the form will likely result in the product having no images or an error.
