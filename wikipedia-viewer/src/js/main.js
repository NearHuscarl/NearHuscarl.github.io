let wikipediaViewer = (() => {
   const TITLE = 1;
   const SUMMARY = 2;
   const LINK = 3;
   const ENTER_CODE = 13;
   /**
    * @summary Generate result content after clicking search or press enter
    */
   function onEventSearch() {
      let numOfResults = $('.search-bar__dropdown').val();

      let crossover = 'https://cors-anywhere.herokuapp.com';
      let baseLink = '/en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
      let query = $('#inlineFormInputGroup').val();
      let apiSearch =  crossover + baseLink + query;

      // remove all previous results before generating new elements
      $('.result__list').children().remove();

      let resultHeaderTag = '<h5 class="result__headline">Search result</h5>';
      $(resultHeaderTag).appendTo($('.result__list'));

      $.getJSON(apiSearch, searchData => {
         // insert 'No Description' in empty result description
         searchData[SUMMARY] = searchData[SUMMARY].map(summary => {
            if (!summary) {
               return 'No Description';
            }
            return summary;
         });

         for (let i = 0; i < numOfResults; i++) {
            let title   = searchData[TITLE][i];
            let summary = searchData[SUMMARY][i];
            let link    = searchData[LINK][i];

            // result may not be result content but sth like "<keyword> refer to" and its variant
            if (summary.search(/(may refer to)/) !== -1) {
               numOfResults++;
               continue;
            }

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

         // no result found
         if ($('.result__list').children().length === 0) {
            let warningTag = '<h1 class="card-title result__warning"></h1>';

            $(warningTag).appendTo($('.result__list'));
         }
      });
   }

   $(document).ready(() => {
      $('.search-bar__btn').on('click', () => {
         let url = 'https://en.wikipedia.org/wiki/Special:Random';
         window.open(url, '_blank');
      });

      // press button to search
      $('.search-bar__icon').on('click', onEventSearch);
      // press enter to search
      $('.search-bar__input-box').on('keydown', event => {
         if (event.which === ENTER_CODE || event.keycode === ENTER_CODE) {
            onEventSearch();
         }
      });
   });
})();
