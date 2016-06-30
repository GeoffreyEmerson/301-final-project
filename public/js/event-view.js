$(function() {
  $('#share-url').val('http://convoke.herokuapp.com/' + location.pathname.split('/')[1]);

  console.log('http://convoke.herokuapp.com/' + location.pathname.split('/')[1]);

  $('#share-url').on('focus', function(){
    this.select();
  });
});
