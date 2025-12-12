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
  // Wrapper div to style as folder
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer relative m-2 bg-zinc-900 hover:border-blue-500";

  // Hidden file input
  const input = document.createElement("input");
  input.type = "file";
  input.className = "hidden";

  // Default icon (file)
  const defaultIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  defaultIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  defaultIcon.setAttribute("fill", "none");
  defaultIcon.setAttribute("viewBox", "0 0 24 24");
  defaultIcon.setAttribute("stroke", "currentColor");
  defaultIcon.classList.add("w-10", "h-10", "text-gray-400");
  defaultIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />';

  // Folder icon (hidden initially)
  const folderIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  folderIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  folderIcon.setAttribute("fill", "none");
  folderIcon.setAttribute("viewBox", "0 0 24 24");
  folderIcon.setAttribute("stroke", "currentColor");
  folderIcon.classList.add("w-10", "h-10", "text-yellow-400", "hidden");
  folderIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />';

  // Label text
  const labelText = document.createElement("span");
  labelText.className = "text-sm text-gray-300 mt-2 text-center";
  labelText.textContent = "Upload";

  // Append everything
  wrapper.appendChild(input);
  wrapper.appendChild(defaultIcon);
  wrapper.appendChild(folderIcon);
  wrapper.appendChild(labelText);
  files.appendChild(wrapper);


  // Click wrapper to show options
wrapper.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent triggering other click events

  // Check if an existing menu is already open and remove it
  const existingMenu = wrapper.querySelector(".wrapper-menu");
  if (existingMenu) {
    existingMenu.remove();
    return;
  }

  // Create menu
  const menu = document.createElement("div");
  menu.className = "wrapper-menu absolute top-0 left-0 bg-gray-800 text-white text-sm rounded shadow-lg flex flex-col";
  menu.style.zIndex = "10";

  // Delete option
  const deleteOption = document.createElement("div");
  deleteOption.textContent = "Delete";
  deleteOption.className = "px-2 py-1 hover:bg-red-600 cursor-pointer";
  deleteOption.addEventListener("click", (ev) => {
    ev.stopPropagation();
    wrapper.remove();
  });

  // Select File option
  const selectOption = document.createElement("div");
  selectOption.textContent = "Select File";
  selectOption.className = "px-2 py-1 hover:bg-blue-600 cursor-pointer";
  selectOption.addEventListener("click", (ev) => {
    ev.stopPropagation();
    input.click(); // trigger the hidden file input
  });

  menu.appendChild(selectOption);
  menu.appendChild(deleteOption);
  wrapper.appendChild(menu);

  // Remove menu if clicked outside
  document.addEventListener("click", function handler(event) {
    if (!wrapper.contains(event.target)) {
      menu.remove();
      document.removeEventListener("click", handler);
    }
  });
});


  // Change icon and label after file selection
  input.addEventListener("change", () => {
    if (input.files.length > 0) {
      defaultIcon.classList.add("hidden");
      folderIcon.classList.remove("hidden");
      labelText.textContent = input.files[0].name.length > 15 
        ? input.files[0].name.slice(0, 12) + "..." 
        : input.files[0].name;
    }
  });
});

