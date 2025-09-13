  const button = document.getElementById('menu-button');
    const dropdown = document.getElementById('dropdown');
    const input=document.getElementById('files');
    const plus=document.getElementById('plus');
    button.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });
    // Close dropdown if clicked outside
     window.addEventListener('click', function(e) {
      if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  plus.addEventListener('click',()=>{
    input.classList.toggle('hidden');
  });