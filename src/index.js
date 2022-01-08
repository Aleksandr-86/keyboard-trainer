document.body.addEventListener('keydown', function(event) {
  console.log(event.code);
  try {
    const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);
    // btnDn.style.boxShadow = '0 0 20px 10px rgb(255, 0, 0, 0.5), inset 0 0 20px rgb(255, 0, 0, 0.5)';
    btnDn.className = 'button2';
    document.body.addEventListener('keyup', function(event) {
      const btnUp = document.querySelector(`#${event.code.toLowerCase()}`);
      if (btnDn === btnUp) setTimeout(() => {
        btnUp.className = 'button';
      }, 100);
    });
  } catch (error) {
    // console.error(`${error.name}: ${error.message}`);
  }
});