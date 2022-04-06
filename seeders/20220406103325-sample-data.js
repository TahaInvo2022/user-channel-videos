'use strict';
const fs = require('fs');
const path = require('path');
// const csv = require('fast-csv');
const csv=require('csvtojson');



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
   console.log("helllooo i am here", path.resolve(__dirname,'..','assets','sample_100data.csv'));
    // try {
      // console.log("hello i am here inside row");
      // console.log( fs.createReadStream(path.resolve(__dirname,'..','assets','sample_100data.csv'))
      // .pipe(csv.parse())
      // .on('error', error => console.log(error))
      // .on('data', row => {
      //   console.log("hello i am here inside row", row);
        // return queryInterface.bulkInsert('Users', [{
          
        //   addressOne: row[0],
        //   type: row[1],
        //   name: row[2],
        //   east: row[3],
        //   west: row[4],
        //   north: row[5],
        //   south: row[6],
        //   street: row[7],
        //   shopName: row[8],
        //   discount: row[9],
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // }]);
      // })
      // .on('end', rowCount => console.log(`Parsed ${rowCount} rows`)))
    // } catch (error) {
    //   console.log(error)
    // }


    console.log(csv()
    .fromString(path.resolve(__dirname,'..','assets','sample_100data.csv').toString()).on('json', (user) => {
      console.log(user);
  }))

    csv()
    .fromString(path.resolve(__dirname,'..','assets','sample_100data.csv'))
    .on('json', (user) => {
        console.log(user);
    })
    .on('done', () => {
        console.log('done parsing');
    });
     
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
