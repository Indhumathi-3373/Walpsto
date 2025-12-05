const button = document.getElementById('menu-button');
const dropdown = document.getElementById('dropdown');
const plus = document.getElementById('plus');
const files = document.getElementById('files');

button.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

// Close dropdown when clicked outside
window.addEventListener('click', (e) => {
  if (!button.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

// Add new file input on + click
plus.addEventListener('click', () => {
  const input = document.createElement("input");
  input.type = "file";
  input.name = "file-" + Date.now();

  input.className = "inline-block mt-3 bg-white text-black p-2 rounded-md mr-5 mr-l-2";

  files.appendChild(input);
});


