/**
 * Media Player
 */

'use strict';

(function () {
  var options = {
    i18n: {
      restart: 'راه اندازی مجدد',
      rewind: 'عقب کشیدن {seektime}s',
      play: 'پخش',
      pause: 'مکث',
      fastForward: 'جلو بردن {seektime}s',
      seek: 'جستجو',
      seekLabel: '{currentTime} از {duration}',
      played: 'پخش شده',
      buffered: 'بافر شده',
      currentTime: 'زمان کنونی',
      duration: 'مدت زمان',
      volume: 'حجم صدا',
      mute: 'بی‌صدا',
      unmute: 'صدا دار',
      enableCaptions: 'فعال کردن زیرنویس',
      disableCaptions: 'غیرفعال کردن زیرنویس',
      download: 'دریافت',
      enterFullscreen: 'ورود به تمام‌صفحه',
      exitFullscreen: 'خروج از تمام‌صفحه',
      frameTitle: 'پخش کننده برای {title}',
      captions: 'زیرنویس‌ها',
      settings: 'تنظیمات',
      pip: 'تصویر در تصویر',
      menuBack: 'بازگشت به منوی قبلی',
      speed: 'سرعت',
      normal: 'معمولی',
      quality: 'کیفیت',
      loop: 'حلقه',
      start: 'شروع',
      end: 'پایان',
      all: 'همه',
      reset: 'بازنشانی',
      disabled: 'غیرفعال',
      enabled: 'فعال',
      advertisement: 'تبلیغات',
      qualityBadge: {
        2160: '4K',
        1440: 'HD',
        1080: 'HD',
        720: 'HD',
        576: 'SD',
        480: 'SD'
      }
    }
  };

  const videoPlayer = new Plyr('#plyr-video-player', options);
  const audioPlayer = new Plyr('#plyr-audio-player', options);
})();
