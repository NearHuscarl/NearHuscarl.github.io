
var quote = '',
   author = '',
   quoteIcon = '<i class="fa fa-quote-right" style="color:#412f5d"></i> ';

function createQuote(){

   // hide font-size change during the transistion
   $(".well").css('color', '#cdbfe3');

   initHeightFontSize();

   var quoteJson = "https://raw.githubusercontent.com/NearHuscarl/FCC-Exercise-Archive/master/9.%20Intermediate%20Front%20End%20Development%20Projects/Random%20Quote%20Machine/quotes.json";

   $.getJSON(quoteJson, function(quoteList){
      var randNum = Math.floor(Math.random() * quoteList.length);

      quote = quoteList[randNum].quote;
      author = quoteList[randNum].author;

      $("#display-quote").html(quoteIcon + quote);
      $("#display-author").html(author);

      resizeFont();

      $(".well").css('color', '#6e5691');
   });
}

function initHeightFontSize(){
   if(window.innerWidth > 768)
   {
      $(".well").css("height", 200);
      // $("#outline").animate({height: 200}, 100);
      $(".well").css("font-size", 20);
   }
   else if(window.innerWidth > 600)
   {
      $(".well").css("height", 175);
      // $("#outline").animate({height: 175}, 100);
      $(".well").css("font-size", 10);
   }
   else // width < 600
   {
      $(".well").css("height", 150);
      // $("#outline").animate({height: 150}, 100);
      $(".well").css("font-size", 8);
   }
}

function resizeFont(){
   var height = $(".well").height(),
      fontSize = 35;

   $(".well").css('font-size', fontSize);
   while($("#display-quote").height() + $("#display-author").height() * 2 > height)
   {
      $(".well").css('font-size', --fontSize);
   }
}


$(document).ready(function(){

   $("#btn-quote").on("click", function(){
      var animateEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
         animateTarget = ".content";

      $(animateTarget).addClass('animated fadeOut').one(animateEnd, function(){
         $(this).removeClass('animated fadeOut');

         createQuote();

         $(animateTarget).addClass('animated fadeIn').one(animateEnd, function(){
            $(this).removeClass('animated fadeIn');
         });
      });

   });

   $("#btn-tweet").on("click", function(){
      var url = 'https://twitter.com/intent/tweet?text="' + quote + '"%0D -' + author + "%20&hashtags=quote&related=freeCodeCamp";
      window.open(url, '_blank');
   });

   window.onresize = function() {
      $(".well").css("height", "auto");
   };

});
