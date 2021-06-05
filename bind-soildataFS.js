"use strict"

const fs = require('fs');
const countiesJson = d3.json('project-data/ky-farm-ac.geojson');
const regionsJson = d3.json('project-data/ky-regions.json');
// Load nutrient values for each crop from CSV
const alfalfaLevel = d3.csv('project-data/alfalfa_levels.csv');
const canolaLevel = d3.csv('project-data/canola_levels.csv');
const coolseasonLevel = d3.csv('project-data/coolseason_levels.csv');
const cornLevel = d3.csv('project-data/corn_levels.csv');
const smallgrainsLevel = d3.csv('project-data/smallgrains_levels.csv');
const sorghumLevel = d3.csv('project-data/sorghum_levels.csv');
const soyLevel = d3.csv('project-data/soy_levels.csv');
const tobaccoLevel = d3.csv('project-data/tobacco_levels.csv');
const warmseasonLevel = d3.csv('project-data/warmseason_levels.csv');
// Load median values for all categories from Agr1
const alfalfaMedCsv = d3.csv('project-data/alfalfa_median.csv');
const canolaMedCSV = d3.csv('project-data/canola_median.csv');
const coolseasonMedCSV = d3.csv('project-data/coolseason_median.csv');
const cornMedCSV = d3.csv('project-data/corn_median.csv');
const smallgrainsMedCSV = d3.csv('project-data/smallgrains_median.csv');
const sorghumMedCSV = d3.csv('project-data/sorghum_median.csv');
const soyMedCSV = d3.csv('project-data/soy_median.csv');
const tobaccoMedCSV = d3.csv('project-data/tobacco_median.csv');
const warmseasonMedCSV = d3.csv('project-data/warmseason_median.csv');

// Global variables
const loCroptype = ["alfalfa", "canola", "coolseason", "corn", "smallgrains", "sorghum", "soy", "tobacco", "warmseason"];
const selYear = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
const minYear = Math.min.apply(Math, selYear); // get min year
const maxYear = Math.max.apply(Math, selYear); // get max year
const selNutrient = ["Phosphorus", "Potassium"];
const MedData = ["alfalfaMedData", "canolaMedData", "coolseasonMedData", "cornMedData", "smallgrainsMedData", "sorghumMedData", "soyMedData", "tobaccoMedData", "warmseasonMedData"];
// set initial variables that change with selection options
let nutValmap1 = "P";
let nutVal = "P";
let yearVal = $('#yearMap1').val(); //jquery yearVal from slider
let yearVal3 = $('#yearMap3').val(); //jquery yearVal from slider
// legend variables
// var legend,
//   legend3;

// variables for leaflet maps Start map variables
const map01 = L.map('map-01').setView([37.8, -85.65], 7);
const map02 = L.map('map-02').setView([37.8, -85.65], 7);
const map03 = L.map('map-03').setView([37.8, -85.65], 7);
const map04 = L.map('map-04').setView([37.8, -85.65], 7);

// object select variable
let cropval = "alfalfaMedData"

// get width and height of maps with jQuery
const wMap1 = $("#map-01").width();
const hMap1 = $("#map-01").height();
const widthForLegend = 100;


// some global variables here, perhaps, to reference the Leaflet GeoJSON layers
// created within the drawMaps function
let map01LGeoJson,
  map03LGeoJson;

// wait until they are ready and then send to dataReady function
Promise.all([countiesJson, regionsJson, alfalfaLevel, canolaLevel, coolseasonLevel, cornLevel,
  smallgrainsLevel, sorghumLevel, soyLevel, tobaccoLevel,
  warmseasonLevel, alfalfaMedCsv, canolaMedCSV, coolseasonMedCSV,
  cornMedCSV, smallgrainsMedCSV, sorghumMedCSV, soyMedCSV, tobaccoMedCSV, warmseasonMedCSV
]).then(dataReady, error);

// function fired if there is an error
function error(error) {
  console.log(error)
}
// load data with dataReady function
function dataReady(data) {
  // reference the counties GeoJSON data
  const countiesJson = data[0];
  const regionsJson = data[1];
  // reference the data set, the CSV
  const alfalfa = data[2];
  const canola = data[3];
  const coolseason = data[4];
  const corn = data[5];
  const smallgrains = data[6];
  const sorghum = data[7];
  const soy = data[8];
  const tobacco = data[9];
  const warmseason = data[10];
  const alfalfaMedData = data[11];
  const canolaMedData = data[12];
  const coolseasonMedData = data[13];
  const cornMedData = data[14];
  const smallgrainsMedData = data[15];
  const sorghumMedData = data[16];
  const soyMedData = data[17];
  const tobaccoMedData = data[18];
  const warmseasonMedData = data[19];
  // here we want to bind CSV data to the county GeoJSON
  // create variable bindData to loop all csv files in leaflet bind features to json
  const bindData = [alfalfa, canola, coolseason, corn, smallgrains, sorghum, soy, tobacco, warmseason,
    alfalfaMedData, canolaMedData, coolseasonMedData, cornMedData, smallgrainsMedData,
    sorghumMedData, soyMedData, tobaccoMedData, warmseasonMedData
  ];
  // create variable to name loop data bind to GeoJSON
  const bindName = loCroptype;
  MedData.forEach(function(x) {
    bindName.push(x)
  })
  // console.log(alfalfa)
  // loop bindData and send bindName to name crops
  bindData.forEach(function(bindDatum, x) {
    // console.log(bindDatum[x]+" :binData"+x)
    // loop through the county features
    countiesJson.features.forEach(function(feature) {
      bindDatum.forEach(function(row, i) {
        // if the county name and CSV name match

        if (row.COUNTY == feature.properties.name) {

          // create a new property for the csv data in the json and assign the data
          feature.properties[bindName[x]] = row;


        }
      })
    })
  });
writeFile(countiesJson);

}; // END dataReady

function writeFile(geojson) {

  fs.writeFile(__dirname + '/bind-soilData/soilData.json', JSON.stringify(geojson), 'utf8', function (err) {

    if (err) throw err;

    console.log('File all done. Great success!');
  })

}
