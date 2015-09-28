function VolunteerViewModel() {
  this.username = ko.observable();
  this.password = ko.observable();

  this.apiRoute = 'Volunteer/';

  this.login = function() {
    app.actionBegin();

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json",
        //TODO: Improve url thing.
        url: '../' + app.apiBase + this.apiRoute + 'Login',
        data: ko.toJSON(this),
        success: function(data, textStatus, request) {
          var authToken = request.getResponseHeader('authToken');
          if(authToken) {
            app.authToken = authToken;
            //TODO: Let user know they logged in.
          }
          else {
            //Bad things
          }
        }.bind(this),

        error: function(data) {
          if(data.responseJSON){
            if(Array.isArray(data.responseJSON) && data.responseJSON.length > 1) {
              //Aggregate errors

              return;
            }
            else if(Array.isArray(data.responseJSON) && data.responseJSON.length == 1) {
              data.responseJSON = data.responseJSON[0];
            }

            //Handle single error.
          }
          debugger;
        }.bind(this),

        complete: function() {
          app.actionEnd();
        }.bind(this)
      });
  }.bind(this);

  this.register = function() {
    app.actionBegin();

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json",
        //TODO: Improve url thing.
        url: '../' + app.apiBase + this.apiRoute + 'CreateVolunteer',
        data: ko.toJSON(this),
        success: function(data, textStatus, request) {
          if(data.result == 'success') {
            //Good things
          }
          else {
            //Bad things!
          }
          debugger;
        }.bind(this),

        error: function(data) {
          if(data.responseJSON){
            if(Array.isArray(data.responseJSON) && data.responseJSON.length > 1) {
              //Aggregate errors

              return;
            }
            else if(Array.isArray(data.responseJSON) && data.responseJSON.length == 1) {
              data.responseJSON = data.responseJSON[0];
            }

            //Handle single error.
          }
          debugger;
        }.bind(this),

        complete: function() {
          app.actionEnd();
        }.bind(this)
      });
  }.bind(this);
}