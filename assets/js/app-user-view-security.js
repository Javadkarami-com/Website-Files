/**
 * App User View - Security
 */

'use strict';

(function () {
  const formChangePass = document.querySelector('#formChangePassword');

  // Form validation for Change password
  if (formChangePass) {
    const fv = FormValidation.formValidation(formChangePass, {
      fields: {
        newPassword: {
          validators: {
            notEmpty: {
              message: 'لطفا رمز عبور جدید را وارد کنید'
            },
            stringLength: {
              min: 8,
              message: 'رمز عبور باید بیش از 8 کاراکتر باشد'
            }
          }
        },
        confirmPassword: {
          validators: {
            notEmpty: {
              message: 'لطفا رمز عبور جدید را تایید کنید'
            },
            identical: {
              compare: function () {
                return formChangePass.querySelector('[name="newPassword"]').value;
              },
              message: 'رمز عبور و تایید آن یکسان نیستند'
            },
            stringLength: {
              min: 8,
              message: 'رمز عبور باید بیش از 8 کاراکتر باشد'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          eleValidClass: '',
          rowSelector: '.form-password-toggle'
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      },
      init: instance => {
        instance.on('plugins.message.placed', function (e) {
          if (e.element.parentElement.classList.contains('input-group')) {
            e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
          }
        });
      }
    });
  }
})();
