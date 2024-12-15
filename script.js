function copyWallet() {
  const walletAddress = document.getElementById("wallet-address").textContent;
  navigator.clipboard
    .writeText(walletAddress)
    .then(() => {
      alert("Wallet address copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy wallet address: ", err);
    });
}

function toggleTheme() {
  const body = document.body;

  // Check which mode is currently active and switch to the next one
  if (body.classList.contains("fire-mode")) {
    body.classList.remove("fire-mode");
    body.classList.add("water-mode"); // Switch to water mode
  } else if (body.classList.contains("water-mode")) {
    body.classList.remove("water-mode");
    body.classList.add("nature-mode"); // Switch to nature mode
  } else if (body.classList.contains("nature-mode")) {
    body.classList.remove("nature-mode");
    body.classList.add("fire-mode"); // Switch back to fire mode
  } else {
    body.classList.add("fire-mode"); // Start with fire mode by default if no mode is set
  }

  // Trigger the animation change for the new theme
  onThemeChange();
}

// Ensure the page starts with fire mode on load
document.body.classList.add("fire-mode");
let isHoodOff = true; // Tracks if it's hood-off or hood-on
let clickCount = 0; // Click counter

// Theme-based image paths
const images = {
  fire: {
    hoodOff: "images/fire-hood-off.png",
    hoodOn: "images/fire-hood-on.png",
  },
  water: {
    hoodOff: "images/fire-hood-off.png",
    hoodOn: "images/fire-hood-on.png",
  },
  nature: {
    hoodOff: "images/fire-hood-off.png",
    hoodOn: "images/fire-hood-on.png",
  },
};

// Get references to DOM elements
const cookieImage = document.getElementById("cookie-image");
const cookieCount = document.getElementById("cookie-count");
const body = document.body;

// Function to get the current theme
function getCurrentTheme() {
  if (body.classList.contains("fire-mode")) return "fire";
  if (body.classList.contains("water-mode")) return "water";
  if (body.classList.contains("nature-mode")) return "nature";
  return "fire"; // Default to fire if no mode is active
}

// Update the cookie image source based on the mode and toggle state
function updateCookieImage() {
  const currentTheme = getCurrentTheme();
  cookieImage.src = isHoodOff
    ? images[currentTheme].hoodOff
    : images[currentTheme].hoodOn;
}

// Add click event to the image
cookieImage.addEventListener("click", (event) => {
  // Toggle the image state
  isHoodOff = !isHoodOff;
  updateCookieImage();

  // Increment and update the click counter
  clickCount++;
  cookieCount.textContent = `Clicks: ${clickCount}`;

  // Trigger the animation at the click location
  createAnimation(event);
});

function createAnimation(event) {
  // Remove any previous animations
  const previousAnimation = document.querySelector(
    ".fire-animation, .leaf-animation, .ripple-animation"
  );
  if (previousAnimation) {
    previousAnimation.remove();
  }

  // Get the current theme
  const currentTheme = getCurrentTheme();
  if (currentTheme === "fire") {
    // Create the fire animation at the click position
    createFireEffect(event);
  } else if (currentTheme === "water") {
    // Create the ripple animation at the click position
    createRippleEffect(event);
  } else if (currentTheme === "nature") {
    // Create the leaf animation at the click position
    createLeafEffect(event);
  }
}

function createLeafEffect(event) {
  const numberOfLeaves = 12; // Number of leaves to generate
  const radius = 100; // Radius for the circular spread
  const angleIncrement = (2 * Math.PI) / numberOfLeaves;

  for (let i = 0; i < numberOfLeaves; i++) {
    const animationElement = document.createElement("div");
    animationElement.classList.add("leaf-animation");
    animationElement.style.backgroundImage = 'url("images/leaf.png")';
    animationElement.style.backgroundSize = "contain";
    animationElement.style.backgroundRepeat = "no-repeat";
    animationElement.style.position = "absolute";
    animationElement.style.width = "30px";
    animationElement.style.height = "30px";

    // Calculate angle for each leaf (spread evenly in a circle)
    const angle = i * angleIncrement;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    // Start position of the leaf at the click location
    const startX = event.clientX;
    const startY = event.clientY;

    animationElement.style.left = `${startX - 15}px`; // Center the leaf on the click point
    animationElement.style.top = `${startY +30}px`;

    // Set custom properties for animation to spread out in a circle
    animationElement.style.setProperty('--offsetX', offsetX + 'px');
    animationElement.style.setProperty('--offsetY', offsetY + 'px');

    // Add the leaf element to the body
    document.body.appendChild(animationElement);

    // Set leaf animation (move outward in a circle)
    animationElement.style.animation = `leafSpray 1.5s ease-out forwards`;
  }
}


function createFireEffect(event) {
  const fireElement = document.createElement("div");
  fireElement.classList.add("fire-animation");

  fireElement.style.left = `${event.clientX - 50}px`;
  fireElement.style.top = `${event.clientY}px`;

  // Add fire element to the body
  document.body.appendChild(fireElement);

  // Attach an event listener to remove the element after animation ends
  fireElement.addEventListener('animationend', () => {
    fireElement.remove();
  });
}

function createRippleEffect(event) {
  const rippleElement = document.createElement("div");
  rippleElement.classList.add("ripple-animation");

  rippleElement.style.left = `${event.clientX - 50}px`;
  rippleElement.style.top = `${event.clientY}px`;

  // Add ripple element to the body
  document.body.appendChild(rippleElement);

  // Attach an event listener to remove the element after animation ends
  rippleElement.addEventListener('animationend', () => {
    rippleElement.remove();
  });
}


// Listen for theme change button clicks
const changeModeButton = document.querySelector(".change-mode-button");
changeModeButton.addEventListener("click", onThemeChange);

// Initialize the cookie image on page load
updateCookieImage();
