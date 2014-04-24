Router.map(function() {
  this.route('hello', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('records');
    },
    loadingTemplate: 'loading',
    data: function() {
      if (this.ready())
        return true;
    }
  })
});

// this is similar to a standard user hook
var recordExists = function(pause) {
  if (! Records.findOne()) {
    this.render('awaiting');
    pause()
  }
}

Router.onBeforeAction(recordExists);
Router.onBeforeAction('loading');

if (Meteor.isClient) {
  Records = new Meteor.Collection('records');
  
  Template.hello.created = function() {
    if (this.data) {
      console.log("Data is set. Woo");
    } else {
      console.log("Data is unset. :sadface:");
    }
  }
}

if (Meteor.isServer) {
  Meteor.publish('records', function() {
    var self = this;
    
    console.log('subscribing to records')
    self.added('records', Random.id(), {foo: 'bar'});
    
    // Meteor.setTimeout(function() {
      console.log('subscription done');
      self.ready();
    // }, 1000)
  });
}

