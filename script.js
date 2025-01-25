function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
  
    // Check if the dropdown is already open
    if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
        dropdown.style.maxHeight = "0px"; // Close the dropdown
    } else {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px"; // Open the dropdown
    }
  }
  //dark mode
  // Dark Mode Toggle
  // Get the elements for the dark mode toggle
  // Function to set the theme
  function setTheme(theme) {
      if (theme === 'dark') {
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
      } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
      }
  }
  
  // Check stored theme on page load and apply it
  document.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
  
      // Get the icons
      const lightModeIcon = document.getElementById('lightModeIcon');
      const darkModeIcon = document.getElementById('darkModeIcon');
  
      // Set the correct icon visibility based on the theme
      if (savedTheme === 'dark') {
          lightModeIcon.style.display = 'none';
          darkModeIcon.style.display = 'block';
      } else {
          lightModeIcon.style.display = 'block';
          darkModeIcon.style.display = 'none';
      }
  
      // Add event listeners to toggle theme
      lightModeIcon.addEventListener('click', () => {
          setTheme('dark');
          lightModeIcon.style.display = 'none';
          darkModeIcon.style.display = 'block';
      });
  
      darkModeIcon.addEventListener('click', () => {
          setTheme('light');
          lightModeIcon.style.display = 'block';
          darkModeIcon.style.display = 'none';
      });
  });
  
  
  //burger
  // JavaScript for toggling the hamburger menu
  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
  
    // Toggle menu visibility on hamburger menu click
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
  
    // Close the menu if clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });
  });
  
const popupOverlay = document.getElementById('popupOverlay');
const closePopupButton = document.getElementById('closePopupButton');
const iframeDownloadButton = document.getElementById('iframeDownloadButton');

iframeDownloadButton.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});
const files = [
    { name: "Document 1.pdf", url: "files/document1.pdf" },
    { name: "Image 1.jpg", url: "files/image1.jpg" },
    { name: "Presentation.pptx", url: "files/presentation.pptx" }
];

document.getElementById("select-files-btn").addEventListener("click", () => {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.className = "modal";
    modalContent.innerHTML = `
        <h3>Select Files</h3>
        <button id="select-all-btn">Select All</button>
        <ul>
            ${files.map(file => `<li><label><input type="checkbox" value="${file.url}" /> ${file.name}</label></li>`).join("")}
        </ul>
        <button id="download-selected-btn">Download Selected</button>
        <button id="close-window-btn">Close</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const checkboxes = modalContent.querySelectorAll("input[type='checkbox']");
    const selectAllBtn = modalContent.querySelector("#select-all-btn");

    // Select/Deselect All Button Logic
    let allSelected = false;
    selectAllBtn.addEventListener("click", () => {
        allSelected = !allSelected;
        checkboxes.forEach(checkbox => (checkbox.checked = allSelected));
        selectAllBtn.textContent = allSelected ? "Deselect All" : "Select All";
    });

    // Download Selected Files
    modalContent.querySelector("#download-selected-btn").addEventListener("click", () => {
        const selectedFiles = Array.from(checkboxes)
            .filter(input => input.checked)
            .map(input => input.value);

        if (selectedFiles.length === 0) {
            alert("No files selected!");
        } else {
            selectedFiles.forEach(fileUrl => {
                const link = document.createElement("a");
                link.href = fileUrl;
                link.download = "";
                link.click();
            });
        }
    });

    // Close the Modal Window
    modalContent.querySelector("#close-window-btn").addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
    });

    // Close modal when clicking outside of it
    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });
});
