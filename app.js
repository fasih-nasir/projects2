window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 300) {
    document.getElementById("log").src="assets/logo (2).png"
 document.getElementById("contbnt").style.backgroundColor="black"
    document.getElementById("contbnt").style.color="white"

    navbar.classList.add('fixed-top');
  } else {
    navbar.classList.remove('fixed-top');
  document.getElementById("contbnt").style.backgroundColor="white"
  document.getElementById("contbnt").style.color="black"

     document.getElementById("log").src="assets/logo (1).png"
  }
});
// loader
setTimeout(function() {
  const loader = document.getElementById('loader');
  
  // Add the animation class
  loader.classList.add('animate__animated', 'animate__slideOutUp');
  
  // Listen for when the animation ends
  loader.addEventListener('animationend', function() {
    loader.style.display = 'none'; // Hide the loader after the animation ends
    document.querySelector('.ld').style.display = 'none'; // Hide the full-screen overlay
  }, { once: true }); // The listener will remove itself after being called once
  
},  3000); // 3500 milliseconds = 3.5 seconds

// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWvgs60p2gxh6qUKWr2OW63udRbkJ79Bc",
  authDomain: "vinauditpro.firebaseapp.com",
  projectId: "vinauditpro",
  storageBucket: "vinauditpro.firebasestorage.app",
  messagingSenderId: "94890464255",
  appId: "1:94890464255:web:cd9a44a688d26f93f54dca",
  measurementId: "G-9CE7NTCS43"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Form submission event listener
const form = document.getElementById("form");
document.getElementById('form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form's default submission

  // Get values from the form
  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const vinNumber = document.getElementById('vin-number').value.trim();
  const country = document.getElementById('country').value;

  // Validate form fields
  if (!fullName || !email || !vinNumber || country === 'Select') {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Please fill in all fields correctly.',
    });
    return;
  }

  // Show loading state
  Swal.fire({
    title: 'Please wait...',
    text: 'Submitting your details',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Add data to Firebase Firestore
    await addDoc(collection(db, 'userdata'), {
      fullName,
      email,
      vinNumber,
      country,
      timestamp: new Date(),
    });

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Data Submitted Successfully!',
      text: 'Your information has been saved.',
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      window.location.href = 'price.html'; // Change this to the correct path if necessary
    }, 1000);
    // Reset the form
    document.getElementById('form').reset();
  } catch (error) {
    console.error('Error submitting data to Firebase:', error);

    // Show error message
    Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: 'There was an error submitting your details. Please try again later.',
    });
  }
});

// Event listener for the form submission
// form.addEventListener('submit', async function (e) {
//   e.preventDefault(); // Prevent default form submission behavior

//   const formData = new FormData(form);
//   const object = Object.fromEntries(formData);
//   const json = JSON.stringify(object);

//   // Display a loading message
//   Swal.fire({
//     title: 'Please wait...',
//     text: 'Submitting your form',
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();
//     }
//   });

//   try {
//     // Send data to Web3Forms API
//     const response = await fetch('https://api.web3forms.com/submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: json,
//     });

//     // Parse Web3Forms response
//     const jsonResponse = await response.json();

//     if (response.status === 200) {
//       // Success alert for Web3Forms submission
//       Swal.fire({
//         icon: 'success',
//         title: 'Form Submitted Successfully!',
//         text: 'You will be redirected shortly.',
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       // Proceed to add data to Firebase
//       const fullName = document.getElementById('full-name').value;
//       const email = document.getElementById('email').value;
//       const vinNumber = document.getElementById('vin-number').value;
//       const country = document.getElementById('country').value;

//       await addUserData(fullName, email, vinNumber, country);

//       // Success alert for Firebase data addition
//       Swal.fire({
//         icon: 'success',
//         title: 'Data Saved in Database!',
//         text: 'Redirecting to price page...',
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       // Redirect to price.html after a short delay
//       setTimeout(() => {
//         location.href = 'price.html';
//       }, 2000);
//     } else {
//       // Error alert for Web3Forms server-side issues
//       Swal.fire({
//         icon: 'success',
//         title: 'Form Submitted Successfully!',
//         text: 'You will be redirected shortly.',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//   } catch (error) {
//     console.error(error);

//     // Success alert even if Web3Forms fails (as per requirement)
//     Swal.fire({
//       icon: 'success',
//       title: 'Form Submitted Successfully!',
//       text: 'You will be redirected shortly.',
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   } finally {
//     // Reset form after submission
//     form.reset();
//   }
// });

// Function to add user data to Firebase

// async function addUserData(fullName, email, vinNumber, country) {
//   try {
//     // Replace this with your Firebase code to add data
//     const db = firebase.firestore(); // Ensure you have initialized Firebase
//     await db.collection('users').add({
//       fullName,
//       email,
//       vinNumber,
//       country,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//     console.log('User data added successfully to Firebase');
//   } catch (error) {
//     console.error('Error adding user data to Firebase:', error);
//   }
// }


// const arr = ["HIDDEN PROBLEM", "NOTHING", "MORE"];

// var home=document.getElementById("home")
// home.style.backgroundImage="url('assets/dic.png')";
 const arr = ["HIDDEN PROBLEM", "MINOR DEFECT", " DETAILED ANALYSIS"];
const arr1 = ["Don't buy, sell or trade a vehicle with", "Ensure transparency before buying, selling, or trading a vehicle.", " Make informed decisions with detailed vehicle insights."];
const arr2 = [
  "Helping you choose the right vehicle. The seller should always assume the responsibility of providing the car's history before selling it. You've done a great job with the website and service..",
  "Empowering you to make informed decisions with comprehensive vehicle inspection reports. Sellers are encouraged to present full vehicle histories.",
  "Our thorough inspection reports ensure you have a complete understanding of a vehicle's condition. Sellers are responsible for full transparency, so buyers can make confident, informed choices",
];

let num = 0;
const textElement = document.getElementById("ide");
const textElement1 = document.getElementById("ide1");
const textElement2 = document.getElementById("ide2");

setInterval(() => {
  // Apply the fade-out class to all elements at once
  textElement.classList.remove("fade-up");
  textElement1.classList.remove("fade-up");
  textElement2.classList.remove("fade-up");

  textElement.classList.add("fade-bottom");
  textElement1.classList.add("fade-bottom");
  textElement2.classList.add("fade-bottom");

  setTimeout(() => {
    // Change the text after the fade-out transition
    num++;
    if (num >= arr.length) {
      num = 0; // Reset num to 0 once it reaches the end of the array
    }
    textElement.innerHTML = arr[num];
    textElement1.innerHTML = arr1[num];
    textElement2.innerHTML = arr2[num];

    // Apply the fade-in class to all elements at once
    textElement.classList.remove("fade-bottom");
    textElement1.classList.remove("fade-bottom");
    textElement2.classList.remove("fade-bottom");

    textElement.classList.add("fade-up");
    textElement1.classList.add("fade-up");
    textElement2.classList.add("fade-up");

  }, 50); // Matches the duration of the opacity transition
}, 6000); // Change text every 8 seconds to keep the new text visible for 8 seconds


// 
// Add animation class when the element is in the viewport
