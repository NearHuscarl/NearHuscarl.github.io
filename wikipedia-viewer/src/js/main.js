let wikipediaViewer = (() => {
   // option for number of search result (dropdown)

   $(document).ready(() => {
      $('.btn__random').on('click', () => {
         let url = 'https://en.wikipedia.org/wiki/Special:Random';
         window.open(url, '_blank');
      });
      $('.icon__search').on('click', () => {
         let numOfResults = $('.search-bar__dropdown').val();

         let crossover = 'https://cors-anywhere.herokuapp.com';
         let baseLink = '/en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
         let query = $('#inlineFormInputGroup').val();
         let apiSearch =  crossover + baseLink + query;

         $.getJSON(apiSearch, searchData => {
            let title   = searchData[1][0];
            let summary = searchData[2][0];
            let link    = searchData[3][0];

            // alert(title);
            // alert(summary);
            // alert(link);
         });
      });
   });
})();
