define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');
  const UserRowView = require('plug/views/rooms/users/RoomUserRowView');
  const $ = require('jquery');
  const { around } = require('meld');

  const MehIcon = Plugin.extend({
    name: 'Meh Icons',
    description: 'Shows meh icons in the user list next to users who meh\'d ' +
                 'the current song.',

    style: {
      '#app .list .user i.icon-meh': {
        'top': '-1px',
        'right': '9px',
        'left': 'auto'
      },
      // grab icon next to a vote icon
      '#app .list .user i.icon + i.icon-grab': {
        'right': '28px'
      }
    },

    enable() {
      this.advice = around(UserRowView.prototype, 'vote', this.showVote);
    },

    disable() {
      this.advice.remove();
    },

    // bound to the UserRowView instance
    // shows all relevant vote icons instead of just grab or woot.
    showVote() {
      if (this.$icon) this.$icon.remove();
      this.$icon = $();
      if (this.model.get('vote') < 0) {
        this.$icon = this.$icon.add($('<i />').addClass('icon icon-meh extplug-meh-icon'));
      }
      if (this.model.get('vote') > 0) {
        this.$icon = this.$icon.add($('<i />').addClass('icon icon-woot'));
      }
      if (this.model.get('grab')) {
        this.$icon = this.$icon.add($('<i />').addClass('icon icon-grab'));
      }
      this.$icon.appendTo(this.$el);
    }
  });

  module.exports = MehIcon;

});
