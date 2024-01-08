/**
 * App User View - Suspend User Script
 */
'use strict';

(function () {
  const suspendUser = document.querySelector('.suspend-user');

  // Suspend User javascript
  if (suspendUser) {
    suspendUser.onclick = function () {
      Swal.fire({
        title: 'آیا اطمینان دارید؟',
        text: "قادر به بازگردانی کاربر نخواهید بود!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله، معلق کن!',
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
            title: 'معلق شد!',
            text: 'کاربر معلق شد.',
            confirmButtonText: 'باشه',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'لغو شد',
            text: 'معلق سازی کاربر لغو شد :)',
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

  //? Billing page have multiple buttons
  // Cancel Subscription alert
  const cancelSubscription = document.querySelectorAll('.cancel-subscription');

  // Alert With Functional Confirm Button
  if (cancelSubscription) {
    cancelSubscription.forEach(btnCancle => {
      btnCancle.onclick = function () {
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
    });
  }
})();
