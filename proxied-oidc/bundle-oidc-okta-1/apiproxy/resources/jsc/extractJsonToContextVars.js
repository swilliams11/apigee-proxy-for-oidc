// extractJsonToContextVars.js
// ------------------------------------------------------------------
//
// For a JSON payload, set context vars for all fields.
//
/* global context, properties */
/* jshint esversion:6 */

var what = Object.prototype.toString;

function walkObj(obj, path, fn) {
  var wo = what.call(obj), p;
  path = path || '';

  if (wo == "[object Object]") {
    Object.keys(obj).forEach(function(key){
      var item = obj[key], w = what.call(item);
      var pathelts = path.split('.');
      pathelts.push(key);
      var newpath = pathelts.join('.');
      if (w == "[object Object]" || w == "[object Array]") {
        walkObj(item, newpath, fn);
      }
      else {
        fn(newpath, item);
      }
    });
  }
  else if (wo == "[object Array]") {
    obj.forEach(function(item, ix){
      var w = what.call(item);
      var pathelts = path.split('.');
      pathelts.push('['+ix+']');
      var newpath = pathelts.join('.');
      if (w == "[object Object]" || w == "[object Array]") {
        walkObj(item, newpath, fn);
      }
      else {
        fn(newpath, item);
      }
    });
  }
  else {
    var msg  = "Unknown object to covert: " + wo + "("+ JSON.stringify(obj, null, 2).slice(0, 34) +")";
    //console.log(msg);
    throw {error: true, message: msg };
  }
}

walkObj(JSON.parse(context.getVariable(properties.source)),
            properties.prefix || 'json',
            function(name, value) {
              context.setVariable(name, value);
            });


// example inbound payload:
//
// {
//   "name": "rooms/AAAAra-BjYE/conversations/qo4NQAAAAAE/messages/Ko4NQAAAAAE",
//   "sender": {
//     "name": "users/113884434698534952030",
//     "displayName": "Dino Chiesa",
//     "avatarUrl": "https://lh4.googleusercontent.com/-cBWaVITMntw/AAAAAAAAAAI/AAAAAAAAADg/hxfWDAGRhDY/photo.jpg",
//     "email": "dchiesa@google.com"
//   },
//   "createTime": "2017-03-07T23:53:04.504207Z",
//   "text": "/jira MGMT-3909"
// };

// result is, context variables set like this:
// json.name = "rooms/AAAAra-BjYE/conversations/qo4NQAAAAAE/messages/Ko4NQAAAAAE"
// json.sender.name = "users/113884434698534952030"
// json.sender.displayName = "Dino Chiesa"
// json.sender.avatarUrl = "https://lh4.googleusercontent.com/-cBWaVITMntw/AAAAAAAAAAI/AAAAAAAAADg/hxfWDAGRhDY/photo.jpg"
// json.sender.email = "dchiesa@google.com"
// json.createTime = "2017-03-07T23:53:04.504207Z"
// json.text = "/jira MGMT-3909"
