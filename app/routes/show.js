import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition: function(transition) {
      Ember.$("#showModal").modal('hide');
    }
  },

  setupController: function(controller, model){
    this._super(controller, model);
    Ember.run.schedule('afterRender', this, function () {
      Ember.$("#showModal").modal('show');
      var _this = this;
      Ember.$("#showModal").on('hidden.bs.modal', function () {
        _this.transitionTo('application');
      });
    });
  },

  afterModel: function(model) {
   this.setHeadTags(model);
  },

  setHeadTags: function (model) {
   var headTags = [
     {
       type: 'meta',
       attrs: {
         name: 'twitter:card',
         content: 'summary_large_image'
       },
     },
     {
       type: 'meta',
       attrs: {
         name: 'twitter:site',
         content: '@datafruits'
       },
     },
     {
       type: 'meta',
       attrs: {
         name: 'twitter:creator',
         content: '@datafruits'
       },
     },
     {
       type: 'meta',
       attrs: {
         name: 'twitter:title',
         content: model.title
       },
     },
     {
       type: 'meta',
       attrs: {
         name: 'twitter:description',
         content: model.description
       },
     },
     {
       type: 'meta',
       attrs: {
         name: 'twitter:image',
         content: model.image_url
       },
     },
   ];

   this.set('headTags', headTags);
  },

  model: function(params) {
    return Ember.$.getJSON('http://datafruits.streampusher.com/scheduled_shows/'+params.id+'.json')
    .then(function(data){
      return data;
    });
  }
});
