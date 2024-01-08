/**
 *  Form Wizard
 */

'use strict';

(function () {
  // flatpickrRange
  const flatpickrRange = document.querySelector('#dealDuration');
  if (flatpickrRange) {
    flatpickrRange.flatpickr({
      mode: 'range',
      locale: 'fa',
      altInput: true,
      altFormat: 'Y/m/d',
      disableMobile: true
    });
  }

  // Init custom option check
  window.Helpers.initCustomOptionCheck();
  // Vertical Wizard
  // --------------------------------------------------------------------

  const wizardCreateDeal = document.querySelector('#wizard-create-deal');
  if (typeof wizardCreateDeal !== undefined && wizardCreateDeal !== null) {
    // Wizard form
    const wizardCreateDealForm = wizardCreateDeal.querySelector('#wizard-create-deal-form');
    // Wizard steps
    const wizardCreateDealFormStep1 = wizardCreateDealForm.querySelector('#deal-type');
    const wizardCreateDealFormStep2 = wizardCreateDealForm.querySelector('#deal-details');
    const wizardCreateDealFormStep3 = wizardCreateDealForm.querySelector('#deal-usage');
    const wizardCreateDealFormStep4 = wizardCreateDealForm.querySelector('#review-complete');
    // Wizard next prev button
    const wizardCreateDealNext = [].slice.call(wizardCreateDealForm.querySelectorAll('.btn-next'));
    const wizardCreateDealPrev = [].slice.call(wizardCreateDealForm.querySelectorAll('.btn-prev'));

    let validationStepper = new Stepper(wizardCreateDeal, {
      linear: true
    });

    // Deal Type
    const FormValidation1 = FormValidation.formValidation(wizardCreateDealFormStep1, {
      fields: {
        dealAmount: {
          validators: {
            notEmpty: {
              message: 'لطفا مقدار را وارد کنید'
            },
            numeric: {
              message: 'مقدار باید یک عدد باشد'
            }
          }
        },
        dealRegion: {
          validators: {
            notEmpty: {
              message: 'لطفا منطقه را انتخاب کنید'
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
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // select2 (Region)
    const dealRegion = $('#dealRegion');
    if (dealRegion.length) {
      dealRegion.wrap('<div class="position-relative"></div>');
      dealRegion
        .select2({
          placeholder: 'انتخاب منطقه',
          dropdownParent: dealRegion.parent()
        })
        .on('change.select2', function () {
          // Revalidate the region field when an option is chosen
          FormValidation1.revalidateField('dealRegion');
        });
    }

    // Deal Details
    const FormValidation2 = FormValidation.formValidation(wizardCreateDealFormStep2, {
      fields: {
        // * Validate the fields here based on your requirements
        dealTitle: {
          validators: {
            notEmpty: {
              message: 'لطفا عنوان معامله را وارد کنید'
            }
          }
        },
        dealCode: {
          validators: {
            notEmpty: {
              message: 'لطفا کد معامله را وارد کنید'
            },
            stringLength: {
              min: 4,
              max: 10,
              message: 'کد معامله باید بیش از 4 و کمتر از 10 کاراکتر باشد'
            },
            regexp: {
              regexp: /^[A-Z0-9]+$/,
              message: 'کد معامله فقط می‌تواند شامل حروف الفبای بزرگ و عدد باشد'
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
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // select2 (Offered Item)
    const dealOfferedItem = $('#dealOfferedItem');
    if (dealOfferedItem.length) {
      dealOfferedItem.wrap('<div class="position-relative"></div>');
      dealOfferedItem
        .select2({
          placeholder: 'یک مورد پیشنهاد شده انتخاب کنید',
          dropdownParent: dealOfferedItem.parent()
        })
        .on('change.select2', function () {
          // Revalidate the field if needed when an option is chosen
          // FormValidation2.revalidateField('dealOfferedItem');
        });
    }

    // Deal Usage
    const FormValidation3 = FormValidation.formValidation(wizardCreateDealFormStep3, {
      fields: {
        // * Validate the fields here based on your requirements
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      validationStepper.next();
    });

    // Deal Usage
    const FormValidation4 = FormValidation.formValidation(wizardCreateDealFormStep4, {
      fields: {
        // * Validate the fields here based on your requirements
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-md-12'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // You can submit the form
      // wizardCreateDealForm.submit()
      // or send the form data to server via an Ajax request
      // To make the demo simple, I just placed an alert
      alert('ثبت شد ...!!');
    });

    wizardCreateDealNext.forEach(item => {
      item.addEventListener('click', event => {
        // When click the Next button, we will validate the current step
        switch (validationStepper._currentIndex) {
          case 0:
            FormValidation1.validate();
            break;

          case 1:
            FormValidation2.validate();
            break;

          case 2:
            FormValidation3.validate();
            break;

          case 3:
            FormValidation4.validate();
            break;

          default:
            break;
        }
      });
    });

    wizardCreateDealPrev.forEach(item => {
      item.addEventListener('click', event => {
        switch (validationStepper._currentIndex) {
          case 3:
            validationStepper.previous();
            break;

          case 2:
            validationStepper.previous();
            break;

          case 1:
            validationStepper.previous();
            break;

          case 0:

          default:
            break;
        }
      });
    });
  }
})();
