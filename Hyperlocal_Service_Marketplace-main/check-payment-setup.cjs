#!/usr/bin/env node

console.log('🔍 Backend Payment Error Checker\n');
console.log('This script will help identify why payment is failing.\n');
console.log('━'.repeat(60));
console.log('📋 CHECKLIST:');
console.log('━'.repeat(60));
console.log('\n1. ✅ Check Backend .env file has STRIPE_SECRET_KEY');

const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(__dirname, 'backend', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('STRIPE_SECRET_KEY=sk_test_')) {
    console.log('   ✅ STRIPE_SECRET_KEY found in .env\n');
  } else if (envContent.includes('STRIPE_SECRET_KEY=')) {
    console.log('   ⚠️  STRIPE_SECRET_KEY found but may be invalid\n');
  } else {
    console.log('   ❌ STRIPE_SECRET_KEY not found in .env\n');
  }
  
  if (envContent.includes('FRONTEND_URL=')) {
    const match = envContent.match(/FRONTEND_URL=(.*)/);
    console.log('2. ✅ FRONTEND_URL is set to:', match[1]);
  } else {
    console.log('2. ⚠️  FRONTEND_URL not set (will use fallback)\n');
  }
  
} catch (e) {
  console.log('   ❌ Could not read .env file:', e.message, '\n');
}

console.log('\n━'.repeat(60));
console.log('🎯 TO DEBUG THE 500 ERROR:');
console.log('━'.repeat(60));
console.log('\nThe 500 error means the backend code is crashing.');
console.log('Most likely causes:\n');
console.log('1. Stripe API key is invalid or expired');
console.log('2. Booking ownership check is failing');
console.log('3. Stripe API call is failing\n');

console.log('📝 NEXT STEPS:\n');
console.log('1. Make sure your backend server is running');
console.log('2. In the backend terminal, you should see console.log output');
console.log('3. When you click "Pay Now", watch the backend terminal');
console.log('4. You should see lines like:');
console.log('   - "Create payment session request: ..."');
console.log('   - "Booking found: ..."');
console.log('   - "Creating Stripe session with: ..."');
console.log('   - Either "Stripe session created successfully" OR "Checkout Session Error"\n');

console.log('If you see "Checkout Session Error", that\'s the problem!');
console.log('The error details will tell us exactly what\'s wrong.\n');

console.log('━'.repeat(60));
console.log('🔧 QUICK FIX TO TRY:');
console.log('━'.repeat(60));
console.log('\nIf Stripe test key is the issue, get a new one:');
console.log('1. Go to https://dashboard.stripe.com/test/apikeys');
console.log('2. Reveal and copy the "Secret key" (starts with sk_test_)');
console.log('3. Update STRIPE_SECRET_KEY in backend/.env');
console.log('4. Restart the backend server\n');

console.log('━'.repeat(60));
console.log('📞 OR - Check the booking owner:');
console.log('━'.repeat(60));
console.log('\nThe booking might belong to a different user.');
console.log('You need to be logged in as: work@gmail.com');
console.log('\nTo check who you\'re logged in as:');
console.log('1. Open browser console (F12)');
console.log('2. Run: document.cookie');
console.log('3. Or check the Navbar - it shows your email\n');
