$(function() {
  window.app = new App();

  ko.applyBindings(app, $('title')[0]);
  createRouter();

  function createRouter() {
    window.router = new Router(renderArea, partials);

    var routes = {
      Home: {
          url: 'partials/mainPage.html',
          name: 'Home',
          id: 'mainPage'
      },

      Login: {
        url: 'partials/login.html',
        name: 'Login',
        id: 'login',
        vm: function() { return new LoginViewModel(); }
      },

      default: 'Home'
    };

    router.registerRouting(app.pageTitle, routes);
  }
});