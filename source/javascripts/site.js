const DIRECTIONS = {
  down: [{top: '-100vh'}, {top: '100vh'}, {top: '0px'}],
  right: [{left: '-100vw'}, {left: '100vw'}, {left: '0px'}],
  left: [{left: '100vw'}, {left: '-100vw'}, {left: '0px'}],
  up: [{top: '100vh'}, {top: '-100vh'}, {top: '0px'}]
}

document.addEventListener("DOMContentLoaded", function() {
  Barba.Pjax.init();
  Barba.Prefetch.init();
  let lastHeaderState = true;
  let currentDirection = 'up'

  Barba.Dispatcher.on('linkClicked', function(el) {
    currentDirection = $(el).data('direction');
  });

  Barba.Dispatcher.on('newPageReady', function(curr, prev, el) {
    $homeLink = $('.home-link')
    if ($(el).hasClass('homie') != lastHeaderState) {
      $homeLink.fadeToggle();
      lastHeaderState = !lastHeaderState;
    } 
  });

  var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.movePage.bind(this));
    },

    movePage: function() {
      const pos = DIRECTIONS[currentDirection];
      console.log(pos);
      $(this.oldContainer).animate(pos[0], 600);
      let newCss = {
        visibility : 'visible',
        position: 'fixed'
      };
      $(this.newContainer).css(Object.assign(newCss, pos[1]));

      $(this.newContainer).animate(pos[2], 600, () => {
        this.done();
      });
    },
  });

  Barba.Pjax.getTransition = function() {
    return HideShowTransition;
  };
})
