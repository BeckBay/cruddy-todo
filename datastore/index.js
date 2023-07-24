const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {

  counter.getNextUniqueId ((err, id) => {
    if (err) {
      console.log('Error getting next id');
    } else {
      const fileName = './test/testData/' + id.toString() + '.txt';
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id, text });
        }
      });
      // console.log('after create:', { id, text });
    }
  });



};

exports.readAll = (callback) => {
  var data = [];
  fs.readdir('./test/testData/', (err, files) => {
    console.log('filesArray:', files);
    _.each(files, file => {
      var id = file.substring(0, 5);

      data.push({id, text: id});
      console.log('our data:', data);
    });

    callback(null, data);
    //[{ id: '00001', text: '00001' }, { id: '00002', text: '00002' }];
  });

  // var data = _.map(items, (text, id) => {
  //   console.log('looking up text:', text);
  //   console.log('looking up id:', id);
  //   return { id, text };
  // });
};



exports.readOne = (id, callback) => {
  //{ id, text: todoText }
  // get the fileName
  // read the file
  // put text in text property
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }

  const fileName = './test/testData/' + id.toString() + '.txt';
  fs.readFile(fileName, 'utf8', (err, text) => {
    if (!text) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  const fileName = './test/testData/' + id.toString() + '.txt';

  // check if fileName exists (find fileName in dir

  if (fs.existsSync(fileName)) {
    fs.writeFile(fileName, text, (err) => {
      if (err) {
        console.log('Cannot update text');
      } else {
        callback(null, { id, text });
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }

  // if yes, update the text in that file

  // if not,


  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {

  const fileName = './test/testData/' + id.toString() + '.txt';

  // check if fileName exists (find fileName in dir

  if (fs.existsSync(fileName)) {
    //fs.unlink( path, callback )
    //fs.unlinkSync( path )
    fs.unlink(fileName, (err) => {
      if (err) {
        console.log('Failed to delete');
      } else {
        callback();
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }


  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //
  // } else {
  //
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
