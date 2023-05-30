jQuery(function($){

	// Filtro per data-key="value"
  $.fn.filterData = function(key, value) {
    return this.filter(function() {
      return $(this).data(key) == value;
    });
  };
  // :contains case-insensitive
  $.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });
  // reimposta alfabeto
	function resetAlphabet(ab, letter) {
    var starter = (letter == '') ? $(ab).children('button').first().data('value') : letter;
    var lettercode = starter.charCodeAt(0);    
    if ((lettercode >= 65) && (lettercode <= 90) && (ab != '')) {
      activateLetter($(ab).children('button').filterData("value", starter));
    }
  }
  // attiva div lettera
  function activateLetter(ellet) {
    var thisletter = $(ellet).data('value');
    window.scrollTo(0, 0);
    $(ellet).addClass('active');
    $(ellet).siblings().removeClass('active');
    if (!$("#" + thisletter).hasClass('active')) {
      $(source).children('div').removeClass('active');
      $("#" + $(ellet).data('value')).addClass('active');
      $("html,body").animate({ scrollTop: $("#"+thisletter).offset().top - 100 }, 1000 );
    }
  }
  // delay di scrittura
  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  // Startup
	var $ts = $('.text-search');
	var source = '';
	var alphabet = '';
  var searchtitle = '';
  var searchin = '';
  var lbl = '';
	var $elemsfound;
  var offset = 0;
          
	if ($ts.length > 0) {		
		alphabet = $ts.data('alphabet') || alphabet;
		source = $ts.data('source') || source;
    searchtitle = $ts.data('searchtitle') || searchtitle;
    lbl = $("label[for='" + $ts.attr('id') + "']");
    offset = $ts.data('offset') || 0;
    offset = ((searchtitle != '') && offset == 0)  ? parseInt($(searchtitle).css('marginTop')) : offset;
    
		if ($(source).length == 1) {                         
      if (alphabet != '') {
        var $ab = $(alphabet);
        if ($ab.length > 0) {       
          var alphaletters = $(source).children('div');
          // Rimuovo eventuali colori di sfondo e bordi presenti x aiutare l'editing
          $(alphaletters).css('backgroundColor','').css('border','');
          $ab.html('');
          $(alphaletters).each(function(id, elem){
            $ab.append('<button type="button" class="btn btn-outline-default" data-value="' + $(elem).attr('id') + '">' + $(elem).attr('id') + '</button>');
          });				
          $ab.on('click', 'button', function(e){            
            e.preventDefault();
            e.stopPropagation();
            $('.text-search').val('');     
            activateLetter($(this))
          }); 
          resetAlphabet(alphabet, '');
        } else {
          alphabet = '';
          $(source).children('div').addClass('active');
        }
      } else {
        $(source).children('div').addClass('active');
      }
			
			$('body').on('keyup', '.text-search', delay(function(e){
				var sRicerca = $(this).val();				
				if (sRicerca != '') {					
          var fl = sRicerca.substring(0, 1).toUpperCase();
          $(searchin + '.found').removeClass('found');
          searchin = source + ((alphabet == '') ? '' : ' > div#' + fl) + ((searchtitle == '') ? '' : ' ' + searchtitle);
					console.log('Search for word: "' + sRicerca + '" in "' + searchin + '"');
					$elemsfound = $(searchin + ':contains("' + sRicerca + '")');
          console.log('items found: ' + $elemsfound.length);
          if ($elemsfound.length > 0) {
            resetAlphabet(alphabet, fl);            
            if (searchtitle != '') {
              var goto = $elemsfound.first().offset().top - offset;
              //$("html,body").animate({ scrollTop: goto}, 1000 );
            } else {
              // TODO:  {... impostare goto per andare al testo selezionato .. }
              //https://stackoverflow.com/questions/10442513/how-to-wrap-part-of-the-text-with-spans-using-jquery
              console.log('it is a global search')
              $(source).html().replace(sRicerca, '<span class="found">' + sRicerca + '</span>');
            }
          } else {
            searchin = source + ((alphabet == '') ? '' : ' > div') + ((searchtitle == '') ? '' : ' ' + searchtitle);
            console.log('Could not FIND ANYTHING, Searching for the word: "' + sRicerca + '" in "' + searchin + '"');
            $elemsfound = $(searchin + ':contains("' + sRicerca + '")');
            if ($elemsfound.length > 0) {              
              fl = $elemsfound.first().parent().attr('id');
              resetAlphabet(alphabet, fl);
              searchin = source + ((alphabet == '') ? '' : ' > div#' + fl) + ((searchtitle == '') ? '' : ' ' + searchtitle);
              $elemsfound = $(searchin + ':contains("' + sRicerca + '")');
              var goto = $elemsfound.first().offset().top - offset;
              console.log(goto);
              //$("html,body").animate({ scrollTop: goto}, 1000 );
            }
          }  
          $elemsfound.addClass('found');
          $("html,body").animate({ scrollTop: $elemsfound.offset().top - 100 }, 1000 );
          //if (lbl.length == 1) {lbl.html('Found' + ($elemsfound.length == 1 ? 'o' : 'i') + ' ' + $elemsfound.length + ' topics' + ($elemsfound.length == 1 ? 'o' : 'i'))};
				} else {
          resetAlphabet(alphabet, '');
          $(searchin).removeClass('found');
          //if (lbl.length == 1) {lbl.html('Enter the text to search for')}
        }
			}, 500));
		}
	}

});
