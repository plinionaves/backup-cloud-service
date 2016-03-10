module.exports = function(app) {

  var controller = app.controllers.file;

  app.route('/file')
      .get(controller.readAll)
      .post(controller.create);

  app.route('/file/:id')
      .get(controller.read)
      .delete(controller.delete);

}
