(function() {

  'use strict';

  angular.module('kiko').controller('HomeController', ['$http', '$timeout', '$window', 'Upload', function($http, $timeout, $window, Upload) {

    var that = this;
    that.files = [];

    $http.get('/file')
      .then(function(response) {
        that.files = response.data;
      }, function(error) {
        console.log(error);
      });

    that.uploadFiles = function(files, invalidFiles) {
      angular.forEach(files, function(file) {
        Upload.upload({
          url: '/file',
          data: {file: file}
        })
        .then(function success(response) {
            $timeout(function () {
                that.files.push(response.data);
                console.log(response);
            });
        }, function error(response) {
            if (response.status > 0)
                console.log(response.status + ': ' + response.data);
        }, function progress(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            that.uploadProgress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      });
    };

    that.removeFile = function(fileDelete) {
      /*$http.delete('/file', {id: file.id})
        .then(function(response) {

        }, function(error) {
          console.log(error);
        });*/
        var deleteConfirm = $window.confirm('Deseja deletar este arquivo?');
        if(deleteConfirm) {
          $http.delete('/file/' + fileDelete._id)
            .then(function(response) {
              that.files = that.files.filter(function(file) {
                return file._id !== fileDelete._id;
              });
            },function(error) {
              console.error(error);
            });
        }
    }

  }]);

})();
