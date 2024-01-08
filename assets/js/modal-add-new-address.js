/**
 * Add New Address
 */

'use strict';

// Select2 (jquery)
$(function () {
  const select2 = $('.select2');

  // Select2 Country
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'انتخاب',
        dropdownParent: $this.parent()
      });
    });
  }
});

// Add New Address form validation
document.addEventListener('DOMContentLoaded', function () {
  (function () {
    // initCustomOptionCheck on modal show to update the custom select
    let addNewAddress = document.getElementById('addNewAddress');
    addNewAddress.addEventListener('show.bs.modal', function (event) {
      // Init custom option check
      window.Helpers.initCustomOptionCheck();
    });

    FormValidation.formValidation(document.getElementById('addNewAddressForm'), {
      fields: {
        modalAddressFirstName: {
          validators: {
            notEmpty: {
              message: 'لطفا نام خود را وارد کنید'
            },
            regexp: {
              regexp: /^[a-zA-Zs]+$/,
              message: 'نام فقط می‌تواند شامل حروف الفبا باشد'
            }
          }
        },
        modalAddressLastName: {
          validators: {
            notEmpty: {
              message: 'لطفا نام خانوادگی خود را وارد کنید'
            },
            regexp: {
              regexp: /^[a-zA-Zs]+$/,
              message: 'نام خانوادگی فقط می‌تواند شامل حروف الفبا باشد'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-12'
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      }
    });
  })();
});
