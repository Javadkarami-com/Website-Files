/**
 * Tour
 */

'use strict';

(function () {
  const startBtn = document.querySelector('#shepherd-example');

  function setupTour(tour) {
    const backBtnClass = 'btn btn-sm btn-label-secondary md-btn-flat',
      nextBtnClass = 'btn btn-sm btn-primary btn-next';
    tour.addStep({
      title: 'نوار ناوبری',
      text: 'این نوار ناوبری شماست',
      attachTo: { element: '.navbar', on: 'bottom' },
      buttons: [
        {
          action: tour.cancel,
          classes: backBtnClass,
          text: 'رد کردن'
        },
        {
          text: 'بعدی',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'کارت',
      text: 'این یک کارت است',
      attachTo: { element: '.tour-card', on: 'top' },
      buttons: [
        {
          text: 'رد کردن',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'قبلی',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'بعدی',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'فوتر',
      text: 'این فوتر است',
      attachTo: { element: '.footer', on: 'top' },
      buttons: [
        {
          text: 'رد کردن',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'قبلی',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'بعدی',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'ارتقا',
      text: 'برای ارتقای پلن اینجا کلیک کنید',
      attachTo: { element: '.footer-link', on: 'top' },
      buttons: [
        {
          text: 'قبلی',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'پایان',
          classes: nextBtnClass,
          action: tour.cancel
        }
      ]
    });

    return tour;
  }

  if (startBtn) {
    // On start tour button click
    startBtn.onclick = function () {
      const tourVar = new Shepherd.Tour({
        defaultStepOptions: {
          scrollTo: false,
          cancelIcon: {
            enabled: true
          }
        },
        useModalOverlay: true
      });

      setupTour(tourVar).start();
    };
  }

  // ! Documentation Tour only
  const startBtnDocs = document.querySelector('#shepherd-docs-example');

  function setupTourDocs(tour) {
    const backBtnClass = 'btn btn-sm btn-label-secondary md-btn-flat',
      nextBtnClass = 'btn btn-sm btn-primary btn-next';
    tour.addStep({
      title: 'نوار ناوبری',
      text: 'این نوار ناوبری شماست',
      attachTo: { element: '.navbar', on: 'bottom' },
      buttons: [
        {
          action: tour.cancel,
          classes: backBtnClass,
          text: 'رد کردن'
        },
        {
          text: 'بعدی',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'فوتر',
      text: 'این فوتر است',
      attachTo: { element: '.footer', on: 'top' },
      buttons: [
        {
          text: 'رد کردن',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'قبلی',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'بعدی',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'لینک اجتماعی',
      text: 'برای اشتراک گذاری در رسانه اجتماعی اینجا کلیک کنید',
      attachTo: { element: '.footer-link', on: 'top' },
      buttons: [
        {
          text: 'قبلی',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'پایان',
          classes: nextBtnClass,
          action: tour.cancel
        }
      ]
    });

    return tour;
  }

  if (startBtnDocs) {
    // On start tour button click
    startBtnDocs.onclick = function () {
      const tourDocsVar = new Shepherd.Tour({
        defaultStepOptions: {
          scrollTo: false,
          cancelIcon: {
            enabled: true
          }
        },
        useModalOverlay: true
      });

      setupTourDocs(tourDocsVar).start();
    };
  }
})();
