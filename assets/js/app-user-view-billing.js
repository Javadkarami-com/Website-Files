/**
 * App User View - Billing
 */

'use strict';

(function () {
  // Cancel Subscription alert
  const cancelSubscription = document.querySelector('.cancel-subscription');

  // Alert With Functional Confirm Button
  if (cancelSubscription) {
    cancelSubscription.onclick = function () {
      Swal.fire({
        text: 'آیا از لغو کردن اشتراک اطمینان دارید؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'انصراف',
        customClass: {
          confirmButton: 'btn btn-primary me-2',
          cancelButton: 'btn btn-label-secondary'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            icon: 'success',
            title: 'اشتراک لغو شد!',
            text: 'اشتراک با موفقیت لغو شد.',
            confirmButtonText: 'باشه',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'انصراف داده شد',
            text: 'از لغو اشتراک انصراف داده شد!!',
            confirmButtonText: 'باشه',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      });
    };
  }

  // On edit address click, update text of add address modal
  const addressEdit = document.querySelector('.edit-address'),
    addressTitle = document.querySelector('.address-title'),
    addressSubTitle = document.querySelector('.address-subtitle');

  addressEdit.onclick = function () {
    addressTitle.innerHTML = 'ویرایش آدرس'; // reset text
    addressSubTitle.innerHTML = 'آدرس خود را ویرایش کنید';
  };
})();
