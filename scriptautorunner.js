sumHL = function(selector) {
  var sumHL = 0;
  var sum = 0;
  var toTest = $(selector).length;
  $(selector).each(function() {
    var urlFrag = $(this).find('.full-link').attr('href') + ' #game-header-historical-low-prices .lowest-recorded > .numeric';
    var div = $('<div>');
    var toAddTo = $(this).find('.game-price');
    var toSum = $(this).find('.game-price-new');
    sum += Number(toSum.text().replace( /[^0-9,]/g, '' ).replace( ',', '.' ));
    var howLongIs = "https://howlongis.io/results?search_query=" + $(this).find('.game-info-title').text().replaceAll(' ','+');
    var checkWrapper = $(this).find('.game-options-wrapper');
    var div2 = $('<a style="left:24px;text-align:center;vertical-align:middle;font-weight:bolt" class="game-options-trigger-btn" href='+howLongIs+'>@</a>');
    checkWrapper.append(div2);

    div.load(urlFrag, function() {
      sumHL += Number(div.find('span').text().replace( /[^0-9,]/g, '' ).replace( ',', '.'));
      toAddTo.append($(this));
      toTest -= 1;
      if (toTest == 0) {
        console.log(sum + " out of lowest: " + sumHL);
        var sumStr = (Math.ceil(100*sum)/100).toString().replace('.',',');
        var totNr = $('.wishlist-item .game-price-new').length;
        var avgStr = (Math.ceil(100*sum/totNr)/100).toString().replace('.',',');
        var sumHLStr = (Math.ceil(100*sumHL )/100).toString().replace('.',',');
        $('.main-title').append(" (Page avg.: ~€" + avgStr + "; tot.: ~€" + sumStr + " / ~€" + sumHLStr + " )");
        return;
      }
    });
  });
}

sumB = function(selector) {
  var sumHL = 0;
  var sum = 0;
  var toTest = $(selector).length;
  $(selector).each(function() {
    var owned = $(this).find('.svg-icon-owned-fill');
    var urlFrag = $(this).find('.full-link').attr('href') + ' #game-header-historical-low-prices .lowest-recorded > .numeric';
    var div = $('<div>');
    var toAddTo = $(this).find('.game-info-title');
    div.load(urlFrag, function() {
      var nrTest = div.find('span').text().replace( /[^0-9,]/g, '' ).replace( ',', '.');
      if (owned.width() == 12) {
        if ($.isNumeric(nrTest)) {
          sumHL += Number(nrTest);
        }
        toAddTo.append($(this));
      }
      toTest -= 1;
      if (toTest == 0) {
        console.log(sum + " out of lowest: " + sumHL);
        var sumHLStr = (Math.ceil(100*sumHL )/100).toString().replace('.',',');
        $('.game-item-column-head').append(" (~€" + sumHLStr + " )");
        return;
      }
    });
  });
}

if (window.location.toString().includes("/wishlist/")) {
  sumHL('.game-list-item');
}
if (window.location.toString().includes("/alerts/")) {
  sumHL('.game-list-item');
}
else if (window.location.toString().includes("/bundle/")) {
  sumB('.game-item-in-bundle');
}
