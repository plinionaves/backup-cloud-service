(function() {

  'use strict';

  angular.module('kiko').controller('HomeController', ['$http', '$timeout', '$window', 'Upload', function($http, $timeout, $window, Upload) {

    var that = this;
    that.files = [];
    that.errors = [];
    that.progresses = {
      /*'arquivo de teste': {
        valueNow: 50
      },
      'outro arquivo': {
        valueNow: 35
      }*/
    };

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
                var newFile = response.data;
                that.files.unshift(newFile);
                // delete field of upload bar
                delete that.progresses[newFile.originalName];
                console.log(response);
            });
        }, function error(response) {
            if (response.status > 0)
                console.log(response.status + ': ' + response.data);
            delete that.progresses[response.data.op.originalName];
            console.log(that.errors);
            that.errors.push({
              code: response.data.code,
              message: 'Arquivo duplicado!',
              messageSecondary: 'Você já subiu este arquivo para o servidor!'
            });
            $timeout(function () {
              that.errors = [];
            }, 5000);
        }, function progress(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            that.progresses[file.name] = {
              valueNow: progress
            }
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
    };

    that.isObjectEmpty = function(object) {
      for(var property in object) {
        return false;
      }
      return true;
    };

    that.getFileSize = function(size) {
      var level = {
        kb: 1000000,
        mb: 1000000000,
        gb: 1000000000000
      };
      if(size < level.kb) {
        size = ((size/1000).toFixed(1)) + ' KB';
      } else if(size >= level.kb && size < level.mb) {
        size = ((size/Math.pow(1000, 2)).toFixed(1)) + ' MB';
      } else if(size >= level.mb && size < level.gb) {
        size = ((size/Math.pow(1000, 3)).toFixed(1)) + ' GB';
      }
      return size.toString().replace('.', ',');
    };

  }]);

})();
