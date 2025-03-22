 // Input Nama, Email, dan Password
 const nameInput = document.getElementById("name");
 const emailInput = document.getElementById("email");
 const passwordInput = document.getElementById("password");

 // Real-time Validasi Nama
 nameInput.addEventListener("input", function() {
     const nameError = document.getElementById("nameError");
     if (this.value.length <= 3) {
         nameError.textContent = "Nama harus lebih dari 3 karakter.";
     } else {
         nameError.textContent = "";
     }
 });

 // Real-time Validasi Email
 emailInput.addEventListener("input", function() {
     const emailError = document.getElementById("emailError");
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailPattern.test(this.value)) {
         emailError.textContent = "Email tidak valid.";
     } else {
         emailError.textContent = "";
     }
 });

 // Real-time Validasi Password
 passwordInput.addEventListener("input", function() {
     const passwordError = document.getElementById("passwordError");
     if (this.value.length < 8) {
         passwordError.textContent = "Password harus minimal 8 karakter.";
     } else {
         passwordError.textContent = "";
     }
 });

 // Pengiriman Form
 document.getElementById("myForm").addEventListener("submit", function(event) {
     event.preventDefault();
     let isValid = true;

     if (nameInput.value.length <= 3) isValid = false;
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) isValid = false;
     if (passwordInput.value.length < 8) isValid = false;

     if (isValid) {
         this.submit();
     }
 });