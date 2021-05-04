// Global variables for Soil test datasets
// Request all your desired datasets first
// Load county and region polygons
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
const minYear = Math.min.apply(Math,selYear); // get min year
// console.log(minYear);
const maxYear = Math.max.apply(Math,selYear); // get max year
// console.log(maxYear);
const selNutrient = ["Phosphorus", "Potassium"];
const MedData = [ "alfalfaMedData", "canolaMedData", "coolseasonMedData", "cornMedData","smallgrainsMedData", "sorghumMedData", "tobaccoMedData", "warmseasonMedData"];
// set initial variables that change with selection options
let nutValmap1 = "P";
let yearValMap1 = 2010;
