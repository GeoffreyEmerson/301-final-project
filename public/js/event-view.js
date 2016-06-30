$(function() {
  // var regEx = '(\/\w*)+(?=\/)';
  // console.log(location.pathname);
  // var str = location.pathname;
  // n = str.search(\u/\w*)+(?=\u/));

  // var str = location.pathname;
  // var patt = new RegExp('/(\u0x5C\w*)+(?=\u0x5C)/g');
  // var res = patt.exec(str);
  // console.log(res);

  $('#share-url').on('focus', function(){
    this.select();
  });
});
