# Testing Login Notifications

## How to Test Each Scenario

### 1. Test Empty Fields ❌
1. Go to login page: http://localhost:5173/login
2. Leave both email and password empty
3. Click "Login" button
4. **Expected**: Toast notification "Please fill in all fields"

### 2. Test Invalid Email Format ❌
1. Enter invalid email: `test@` or `invalid.email`
2. Enter any password: `123456`
3. Click "Login"
4. **Expected**: Toast notification "Please enter a valid email address"

### 3. Test Short Password ❌
1. Enter valid email: `test@gmail.com`
2. Enter short password: `12345` (less than 6 characters)
3. Click "Login"
4. **Expected**: Toast notification "Password must be at least 6 characters"

### 4. Test Invalid Credentials ❌
1. Enter valid email: `wrong@gmail.com`
2. Enter valid length password: `wrongpassword`
3. Click "Login"
4. **Expected**: Toast notification "Invalid email or password"

### 5. Test Successful Login ✅
1. Enter correct email: `work@gmail.com`
2. Enter correct password: (your actual password)
3. Click "Login"
4. **Expected**: 
   - Toast notification "Logged in successfully"
   - Redirect to home page

## Troubleshooting

### If notifications are not showing:

1. **Check if react-hot-toast Toaster is rendered**
   - Open `frontend/src/main.jsx` or `frontend/src/App.jsx`
   - Make sure `<Toaster />` component is present

2. **Check browser console for errors**
   - Press F12 to open DevTools
   - Check Console tab for any errors

3. **Verify toast is imported**
   - Open `Login.jsx`
   - Check line 4: `import toast from "react-hot-toast";`

4. **Check if backend is running**
   - Backend should be on http://localhost:5000
   - Test: Open http://localhost:5000 in browser

5. **Check if frontend is running**
   - Frontend should be on http://localhost:5173
   - Open http://localhost:5173/login

## Current Code Location

The validation code is in `frontend/src/pages/Login.jsx` at lines 22-54:

```javascript
const handleLogin = async (e) => {
  e.preventDefault();

  // Client-side validation
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Password length validation
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

  try {
    setLoading(true);
    await login(email, password);
    // Success notification is handled in AppContext
  } catch (error) {
    console.error("Login error:", error);
    // Error notification is handled in AppContext
  } finally {
    setLoading(false);
  }
};
```

## Need Help?

If notifications still not working, please provide:
1. Browser console errors (F12 → Console tab)
2. What you entered in the form
3. What happened (no notification? wrong notification?)
4. Screenshot if possible
