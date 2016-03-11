module.exports = function(app) {

  var homeController = {};
  var File = app.models.file;

  homeController.read = function(req, res) {
    var _id = req.params.id;
    File.findById(_id).exec()
      .then(
        function(file) {
          if(!file) throw new Error('File not found!');
          res.download(file.path, file.originalName);
          //res.json(file);
        },
        function(err) {
          console.log(err);
          res.status(404).json(err);
        }
      );
  };

  homeController.readAll = function(req, res) {
    File.find().exec()
      .then(
        function(files) {
          res.json(files);
        },
        function(err) {
          console.log(err);
          res.status(500).json(err);
        }
      );
  };

  homeController.create = function(req, res) {
    var file = req.files.file;
    var objectFile = {
      originalName: file.originalFilename,
      path: file.path,
      size: file.size
    };
    File.create(objectFile)
      .then(
        function(file) {
          res.status(201).json(file);
        },
        function(err) {
          console.log(err);
          res.status(500).json(err);
        }
      );
  };

  homeController.delete = function(req, res) {
    var _id = req.params.id;

    // get file to remove in directory
    File.findById(_id).exec()
      .then(
        function(removedFile) {
          if(!removedFile) throw new Error('File not found!');

          // remove in database
          File.remove({'_id': _id}).exec()
            .then(
              function() {
                var fs = require('fs');
                fs.unlinkSync(removedFile.path);
                res.json(removedFile);
              },
              function(err) {
                return console.error(err);
              }
            );

        },
        function(err) {
          console.log(err);
          res.status(404).json(err);
        }
      );
  };

  return homeController;

}
