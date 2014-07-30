DogSittingApp.Views.DogShow = Backbone.CompositeView.extend({
  template: JST['dogs/show'],

  initialize: function() {
    var view = this;
    this.listenTo(this.model, 'add', this.render);
    this.listenTo(this.model.bookings(), 'add', this.addBooking);


    $('.dog_bookings').empty();

  },

  events: {
    'click .removeDog': 'removeDog',
    'click .editDogInfo': 'redirectToDogEdit'
  },

  addBooking: function (booking) {
    var subview = new DogSittingApp.Views.DogBookingShow({
      model: booking
    });

    this.addSubview('.dog_bookings', subview.render());
  },

  redirectToDogEdit: function(event){
    data = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/dogs/'+ data +'/edit', {trigger: true})
  },


  render: function() {

    var renderedContent = this.template({
      dog: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  removeDog: function(event) {

    event.preventDefault();
    this.model.destroy();

    Backbone.history.navigate("/", { trigger: true })
  }
});
