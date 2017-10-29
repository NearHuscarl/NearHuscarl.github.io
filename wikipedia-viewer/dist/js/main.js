let wikipediaViewer = (() => {
   // option for number of search result (dropdown)

   $(document).ready(() => {
      $('.search-bar__btn').on('click', () => {
         let url = 'https://en.wikipedia.org/wiki/Special:Random';
         window.open(url, '_blank');
      });
      $('.search-bar__icon').on('click', () => {
         let numOfResults = $('.search-bar__dropdown').val();

         let crossover = 'https://cors-anywhere.herokuapp.com';
         let baseLink = '/en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
         let query = $('#inlineFormInputGroup').val();
         let apiSearch =  crossover + baseLink + query;

         // remove all previous result before generating new elements
         $('.result__list').children().remove()

         $.getJSON(apiSearch, searchData => {
            for (let i = 0; i < numOfResults; i++) {

               let title   = searchData[1][i];
               let summary = searchData[2][i];
               let link    = searchData[3][i];

               let articleTag = '<article class="card card-block result__review' + i + '"></article>';
               let headerTag = `
                  <h5 class="card-title result__title">
                     ${title}
                  </h5>`;
               let paraTag = '<p class="card-text result__description">' + summary + '</p>';
               let buttonTag = `
                  <span class="btn__link">
                     <a class="btn btn-primary" href="${link}" target="_blank">Read More</a>
                  </span>`;

               $(articleTag).appendTo($('.result__list'));
               $(headerTag).appendTo($('.result__review' + i));
               $(paraTag).appendTo($('.result__review' + i));
               $(buttonTag).appendTo($('.result__review' + i));
            }
         });
      });
   });
})();
