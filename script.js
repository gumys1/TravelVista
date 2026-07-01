document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const contactNumber = document.getElementById('contactNumber');
  const bookingRef = document.getElementById('bookingRef');
  const formMessage = document.getElementById('formMessage');

  // reusable helpers
  function showError(input, message){
    const err = document.getElementById(input.id + 'Error');
    input.classList.add('invalid');
    err.textContent = message;
  }

  function clearError(input){
    const err = document.getElementById(input.id + 'Error');
    input.classList.remove('invalid');
    err.textContent = '';
  }

  function isEmpty(value){ return value.trim() === ''; }

  // individual validators
  function validateFullName(){
    const val = fullName.value;
    if (isEmpty(val)) { showError(fullName, 'Full name is required'); return false; }
    clearError(fullName); return true;
  }

  function validateEmail(){
    const val = email.value.trim();
    if (isEmpty(val)) { showError(email, 'Email is required'); return false; }
    // must have exactly one @ and a basic structure
    const atCount = (val.match(/@/g) || []).length;
    if (atCount !== 1) { showError(email, 'Email must contain exactly one @'); return false; }
    const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basic.test(val)) { showError(email, 'Enter a valid email address'); return false; }
    clearError(email); return true;
  }

  function validatePasswords(){
    const p = password.value;
    const cp = confirmPassword.value;
    if (isEmpty(p)) { showError(password, 'Password is required'); return false; }
    clearError(password);
    if (isEmpty(cp)) { showError(confirmPassword, 'Please confirm password'); return false; }
    if (p !== cp) { showError(confirmPassword, 'Passwords do not match'); return false; }
    clearError(confirmPassword); return true;
  }

  function validateContact(){
    const val = contactNumber.value.trim();
    if (isEmpty(val)) { showError(contactNumber, 'Contact number is required'); return false; }
    // allow digits and hyphens only
    if (!/^[0-9-]+$/.test(val)) { showError(contactNumber, 'Only digits and hyphens are allowed'); return false; }
    const digitsOnly = val.replace(/-/g,'');
    if (!/^[0-9]+$/.test(digitsOnly)) { showError(contactNumber, 'Invalid contact format'); return false; }
    if (digitsOnly.length > 11) { showError(contactNumber, 'Contact must not exceed 11 digits'); return false; }
    clearError(contactNumber); return true;
  }

  function validateBookingRef(){
    const val = bookingRef.value.trim();
    if (isEmpty(val)) { showError(bookingRef, 'Booking Reference ID is required'); return false; }
    // accept case-insensitive TV- followed by 4 digits
    if (!/^TV-\d{4}$/i.test(val)) { showError(bookingRef, 'Format must be TV-YYYY (e.g. TV-2025)'); return false; }
    clearError(bookingRef); return true;
  }

  function clearAllWarnings(){
    [fullName,email,password,confirmPassword,contactNumber,bookingRef].forEach(clearError);
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }

  // live validation
  fullName.addEventListener('input', validateFullName);
  email.addEventListener('input', validateEmail);
  password.addEventListener('input', validatePasswords);
  confirmPassword.addEventListener('input', validatePasswords);
  contactNumber.addEventListener('input', validateContact);
  bookingRef.addEventListener('input', validateBookingRef);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllWarnings();
    const okName = validateFullName();
    const okEmail = validateEmail();
    const okPass = validatePasswords();
    const okContact = validateContact();
    const okRef = validateBookingRef();

    if (okName && okEmail && okPass && okContact && okRef) {
      formMessage.textContent = 'Booking inquiry submitted successfully.';
      formMessage.classList.add('success');
      // clear fields
      form.reset();
    } else {
      formMessage.textContent = 'Please fix the errors above.';
      formMessage.classList.add('error');
    }
  });
});
