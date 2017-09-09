JavaScript GameBoy Color Emulator
=================================

A GameBoy Color emulator that utilizes HTML5 canvas and JavaScript audio APIs to provide a full emulation of the console.

Known browsers to work well in:
-------------------------------

* Firefox 4-27 (Windows 7, Windows Vista, Mac OS X)
* Google Chrome 18+
* Safari 5.1.5+

Browsers that suck at performance or fail to run the code correctly:
--------------------------------------------------------------------

* Firefox 4+ (*nix versions of Firefox have audio lockup bugs) - Retest this
* Firefox 28+ (Web Audio API creates 500 ms or greater latency, forced by Firefox)
* Opera (Crashes + Slow + Graphics Glitches) - Retest this
* Safari 5.1.X (Below 5.1.5) (Slow or crashes)
* IE 1-8 (Cannot run)
* IE 9-10 (Slow, No native audio support (Requires flash bridge in the audio lib))
* IE 11 (No native audio support (Requires flash bridge in the audio lib))
* Firefox 1-3.6 (Slow)
* ALL VERSIONS OF MOBILE SAFARI AND OPERA (Stop pestering me, iOS just **CAN'T** run this well.)