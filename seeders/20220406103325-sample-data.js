'use strict';
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
// const csv=require('csvtojson');



module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  console.log("path consoling ====> ", path.resolve(__dirname,'..','assets','sample_100data.csv'));
    try {
      // console.log("inside try");
    fs.createReadStream(path.resolve(__dirname,'..','assets','sample_100data.csv'))
      .pipe(csv.parse({
        delimiter: '\t', 
        endLine: '\n', 
        escapeChar: '"', 
        enclosedChar: '"'
    }))
      .on('error', error => console.log(error))
      .on('data', await function(row){
        console.log("row consoling ======>", row);
        
      })
      .on('done', rowCount => console.log(`Parsed ${rowCount} rows`))
    } catch (error) {
      console.log(error)
    }


  //   console.log(csv()
  //   .fromString(path.resolve(__dirname,'..','assets','sample_100data.csv').toString()).on('json', (user) => {
  //     console.log(user);
  // }))

    // csv()
    // .fromString(path.resolve(__dirname,'..','assets','sample_100data.csv'))
    // .on('json', await function(user){
    //     console.log(user);
    // })
    // .on('done', () => {
    //     console.log('done parsing');
    // });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('sample_datas', null, {});
  }
};
