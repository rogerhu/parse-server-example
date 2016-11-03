// See http://parseplatform.github.io/docs/js/guide/
// https://parseplatform.github.io/docs/js/guide/#query-constraints
Parse.Cloud.define('pushToChannel', function(request, response) {

  var params = request.params;

  var channel = params.channel;

  if (!channel) {
     response.error('must provide a channel');
  }

  var customData = params.customData;

  // use to custom tweak whatever payload you wish to send
  var channels = [channel];

  var payload = {};

  if (customData) {
      payload = JSON.parse(customData);
  }

  // Note that useMasterKey is necessary for Push notifications to succeed.

  Parse.Push.send({
  channels: channels,
  // Parse.Push requires a dictionary, not a string.
  data: {"customData": customData},
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
