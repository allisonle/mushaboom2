document.addEventListener("DOMContentLoaded", function() {
  Barba.Pjax.init();
  Barba.Prefetch.init();
  Barba.Dispatcher.on('linkClicked', function(el) {
    console.log("HERE WE GOOOOOOO");
  });

  var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.movePage.bind(this));
    },

    movePage: function() {
      $(this.oldContainer).animate({top: "-100vh"}, 600);
      $(this.newContainer).css({
        visibility : 'visible',
        position: 'fixed',
        top: '100vh'
      });

      $(this.newContainer).animate({top: '0px'}, 600, () => {
        this.done();
      });
    },
  });

  Barba.Pjax.getTransition = function() {
    return HideShowTransition;
  };
})
