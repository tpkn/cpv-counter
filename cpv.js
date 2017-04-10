/**
 * CPV Counter (v1.0.20160212), http://tpkn.me
 */

function CPVCounter(video, cpv_point, pixel_link, callback){
   var counted = false, 
       has_pixel = true, 
       has_callback = true;

   /**
    * (Important) 
    * Chech is it <video> tag 
    */
   if(video.tagName.toLowerCase() !== 'video'){
      return console.error('Error: current object is not a <video> object');
   }

   /**
    * (Important)
    * Check is cpv point set
    */
   if(typeof cpv_point !== 'number'){
      return console.error('Error: "cpv_point" is not set');
   }

   /**
    * (Meh...)
    * Check is pixel set
    */
   if(typeof pixel_link !== 'string' || !/^(https?\:)?\/\//gi.test(pixel_link)){
      has_pixel = false;
      console.warn('Warn: "pixel_link" is not a string or not a link (http, https or //)');
   }

   /**
    * (Meh...)
    * Check is callback function set
    */
   if(typeof callback !== 'function'){
      has_callback = false;
      console.info('Notice: you may call callback function when cpv is triggered');
   }

   /**
    * Cross-browsers add/removeEventListener
    * @param {String}   event
    * @param {Function} fn
    */
   Object.prototype.addEvent = function(event, fn){
      if(video.addEventListener){
         video.addEventListener(event, fn, false);
      } else {
         video.attachEvent("on" + event, function(){
            return(fn.call(video, window.event));   
         });
      }
   }
   Object.prototype.removeEvent = function(event, fn){
      if(video.removeEventListener){
         video.removeEventListener(event, fn, false);
      } else {
         video.detachEvent("on" + event, function(){
            return(fn.call(video, window.event));   
         });
      }
   }

   /**
    * Reset cpv counter
    */
   function resetCounter(){
      counted = false;
   }

   /**
    * Track pixel and call callback (if set)
    */
   function trackPixel(){
      if(has_pixel){
         var img = new Image();
         img.src = pixel_link + '?' + (Math.floor(Math.random() * 1e15));
      }
      if(has_callback){
         callback(cpv_point, pixel_link);
      }
      console.log('CPV triggered at ' + cpv_point + 's');
   }

   /**
    * Check if it's time to call cpv pixel
    */
   function checkTime(){
      // Reset counter each 0 second (helps when "loop" attribute is used)
      if(this.currentTime == 0){
         resetCounter();
      }
      if(this.currentTime >= cpv_point && !counted){
         counted = true;
         trackPixel();
      }
   }

   /**
    * Video 'ended' event
    */
   function videoEnded(){
      checkTime();
      resetCounter();
   }

   /**
    * Public method that immediately kills counter 
    */
   this.kill = function(){
      resetCounter();
      this.removeEvent('timeupdate', checkTime);
      this.removeEvent('ended', videoEnded);
      console.log('CPV killed');
   }

   if(cpv_point < this.duration || cpv_point > 0){
      this.addEvent('timeupdate', checkTime);
      this.addEvent('ended', videoEnded);
      console.log('CPV enabled');
   }else{
      console.log('CPV time is beyond video range');
   }
}