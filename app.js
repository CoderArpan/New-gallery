// Initialize Cloudinary Widget for Uploads
const uploadWidget = cloudinary.createUploadWidget({
  cloudName: 'dwotbb200',  // Replace with your Cloudinary cloud name
  uploadPreset: 'Photos_app', // Replace with your preset from Cloudinary
  sources: ['local', 'url', 'camera'],  // Sources: file input, URL, camera (optional)
  showAdvancedOptions: true,
  cropping: true,
  multiple: true
}, (error, result) => {
  if (result.event === "success") {
    // Display uploaded image in the gallery and store the URL
    displayImage(result.info.secure_url);
    saveImageUrl(result.info.secure_url); // Save to localStorage
  }
});

// Handle the upload button click
document.getElementById('upload-btn').addEventListener('click', () => {
  uploadWidget.open();
});

// Display uploaded image in the gallery
function displayImage(imageUrl) {
  const gallery = document.getElementById('gallery');
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = "Uploaded Image";
  imgElement.classList.add('w-full', 'h-60', 'object-cover', 'rounded', 'transition', 'transform', 'image-item');
  gallery.appendChild(imgElement);

  // Trigger animation after a short delay
  setTimeout(() => {
    imgElement.classList.add('show');
  }, 50);

  // Add click event to zoom the image
  imgElement.addEventListener('click', () => zoomImage(imageUrl));
}

// Zoom image in the modal
function zoomImage(imageUrl) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  
  // Set the modal image source to the clicked image URL
  modalImage.src = imageUrl;

  // Show the modal
  modal.classList.remove('hidden');
}

// Close the modal when the close button is clicked
document.getElementById('close-modal').addEventListener('click', () => {
  const modal = document.getElementById('image-modal');
  modal.classList.add('hidden');
});

// Save image URL to localStorage (for persistence)
function saveImageUrl(imageUrl) {
  let images = JSON.parse(localStorage.getItem('imageUrls')) || [];
  images.push(imageUrl);
  localStorage.setItem('imageUrls', JSON.stringify(images));
}

// Load and display saved images from localStorage
function loadGallery() {
  const gallery = document.getElementById('gallery');
  let images = JSON.parse(localStorage.getItem('imageUrls')) || [];

  images.forEach(url => {
    displayImage(url);
  });
}

// Load gallery images on page load
window.onload = loadGallery;
