document.body.addEventListener('keydown', function(event) {
  try {
    const btnDn = document.querySelector(`#${event.code.toLowerCase()}`);
    // console.log(event.code);
    if (event.code === 'Tab' || event.code === 'OSLeft' || event.code === 'ContextMenu' || event.altKey || event.ctrlKey) {
      console.log('first condition');
      event.preventDefault();
    } else {
      btnDn.className = 'button-dn';
      document.body.addEventListener('keyup', function(event) {
        const btnUp = document.querySelector(`#${event.code.toLowerCase()}`);
        if (btnDn === btnUp) setTimeout(function() {
          btnUp.className = 'button-up';
        }, 100);
      });
    }
  } catch (error) {
    // console.error(`${error.name}: ${error.message}`);
  }
});