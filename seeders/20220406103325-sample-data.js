'use strict';
const fs = require('fs');
const path = require('path');
const xlsx2json = require('xlsx2json');
const bcrypt = require('bcrypt');



module.exports = {
  async up (queryInterface, Sequelize) {
    
    // seeder made by reading the xlsx file 

    try {
      
      let parseData;
      await xlsx2json(path.resolve(__dirname,'..','assets','sample_data.xlsx'),{
        dataStartingRow: 2,
        mapping: {
          'firstName': 'A',
          'lastName': 'B',
          'email': 'C',
          'password': 'D'
      }
      }).then(jsonArray => {
        parseData = jsonArray
      });
      parseData[0].map(el => {
        el.password = bcrypt.hashSync(el.password, bcrypt.genSaltSync(10));
        el.createdAt = new Date();
        el.updatedAt = new Date();
      });

      return queryInterface.bulkInsert('Users', parseData[0]);

    } catch (error) {
      console.log(error)
    }

    


  
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
