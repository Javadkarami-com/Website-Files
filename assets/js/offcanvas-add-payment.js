/**
 * Add Payment Offcanvas
 */

'use strict';

(function () {
  // Invoice amount
  const paymentAmount = document.querySelector('.invoice-amount');

  // Prefix
  if (paymentAmount) {
    new Cleave(paymentAmount, {
      numeral: true
    });
  }

  // Datepicker
  const date = new Date(),
    invoiceDateList = document.querySelectorAll('.invoice-date');

  if (invoiceDateList) {
    invoiceDateList.forEach(function (invoiceDateEl) {
      invoiceDateEl.flatpickr({
        monthSelectorType: 'static',
        defaultDate: new JDate(date),
        locale: 'fa',
        altInput: true,
        altFormat: 'Y/m/d',
        disableMobile: true
      });
    });
  }
})();
