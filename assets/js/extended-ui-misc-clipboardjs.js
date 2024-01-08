/**
 * Clipboard
 */

'use strict';

(function () {
  const clipboardList = [].slice.call(document.querySelectorAll('.clipboard-btn'));
  if (ClipboardJS) {
    clipboardList.map(function (clipboardEl) {
      const clipboard = new ClipboardJS(clipboardEl);
      clipboard.on('success', function (e) {
        if (e.action == 'copy') {
          toastr['success']('', 'به کلیپ بورد کپی شد!!');
        }
      });
    });
  } else {
    clipboardList.map(function (clipboardEl) {
      clipboardEl.setAttribute('disabled', true);
    });
  }
})();
