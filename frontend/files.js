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
  const wrapper = document.createElement("div");
  wrapper.className = "file-tile";

  const input = document.createElement("input");
  input.type = "file";
  input.className = "file-input";

  const icon = document.createElement("div");
  icon.className = "file-icon";
  icon.textContent = "FILE";

  const labelText = document.createElement("span");
  labelText.className = "file-label";
  labelText.textContent = "Upload";

  wrapper.appendChild(input);
  wrapper.appendChild(icon);
  wrapper.appendChild(labelText);
  files.appendChild(wrapper);

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();

    const existingMenu = wrapper.querySelector(".file-menu");
    if (existingMenu) {
      existingMenu.remove();
      return;
    }

    const menu = document.createElement("div");
    menu.className = "file-menu";

    const selectOption = document.createElement("div");
    selectOption.textContent = "Select File";
    selectOption.className = "file-menu-item";
    selectOption.addEventListener("click", (ev) => {
      ev.stopPropagation();
      input.click();
    });

    const deleteOption = document.createElement("div");
    deleteOption.textContent = "Delete";
    deleteOption.className = "file-menu-item";
    deleteOption.addEventListener("click", (ev) => {
      ev.stopPropagation();
      wrapper.remove();
    });

    menu.appendChild(selectOption);
    menu.appendChild(deleteOption);
    wrapper.appendChild(menu);

    document.addEventListener("click", function handler(event) {
      if (!wrapper.contains(event.target)) {
        menu.remove();
        document.removeEventListener("click", handler);
      }
    });
  });

  input.addEventListener("change", () => {
    if (input.files.length > 0) {
      icon.textContent = "DOC";
      labelText.textContent = input.files[0].name.length > 15
        ? input.files[0].name.slice(0, 12) + "..."
        : input.files[0].name;
    }
  });
});
