var wikipediaViewer = (function(){

   $(document).ready(function(){
      $('.btn__random').on('click', function() {
         var url = 'https://en.wikipedia.org/wiki/Special:Random';
         window.open(url, '_blank');
      });

      $('.icon__search').on('click', function() {

      });
   });

})();
