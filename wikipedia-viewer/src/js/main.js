var wikipediaViewer = (function(){
   // option for number of search result (dropdown)

   $(document).ready(function(){
      $('.btn__random').on('click', function() {
         var url = 'https://en.wikipedia.org/wiki/Special:Random';
         window.open(url, '_blank');
      });
      $('.icon__search').on('click', function() {
         var crossover = 'https://cors-anywhere.herokuapp.com';
         var query = $('#inlineFormInputGroup').val();
         var apiSearch =  crossover + '/en.wikipedia.org/w/api.php?action=opensearch&search='
            + query + '&format=json';

         $.getJSON(apiSearch, function(searchData){
            var title   = searchData[1][0];
            var summary = searchData[2][0];

            alert(title);
            alert(summary);
            alert(link);
         });

      });
   });

})();
