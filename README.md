# University of Kentucky's soil test data analysis of phosphorus and potassium against AGR-1 recommendations.
Masters project for New Maps Plus program at the University of Kentucky.

## TOC
- [Introduction](#introduction)
- [Methodology](#methodology)<br/>
     - [Data](#data)
     - [Medium for Delivery](#medium for delivery)
     - [Application Layout](#application layout)
     - [Thematic Representation](#thematic representation)
     - [User Interaction](#user interaction)
     - [Aesthetics and Design Considerations](#aesthetics)
     - [Conclusion](#conclusion)

## Introduction
Soil nutrient test values are invaluable to farmers and homeowner to create the most productive growing conditions for crops or grasses in the backyard. The [University of Kentucky College of Agriculture](http://www.rs.uky.edu/soil/TestingService.php) offer testing for Kentucky residents through their local [County Extension Office](http://extension.ca.uky.edu/county) so people are not blindly applying unneeded nutrients that will lead to environmental pollution. Nutrient recommendations can be found in [AGR-1](http://www2.ca.uky.edu/agcomm/pubs/agr/agr1/agr1.pdf) for crops and [AGR-53](http://www.uky.edu/WaterResources/FF/Nutrient%20Management/pdf/Lawn%20Fertilizer%20in%20Kentucky.pdf) for lawns. Most farmers collect soil samples on a three year rotation from their fields to verify soil nutrient values are adequate for the growing crop. In recent years farmers have started to question whether AGR-1 recommendations have kept up with the new high yielding hybrids crops and nutrient recommendations should be higher for these production systems. <br/>

Using the University soil test data from 1990 to 2019, we are going to look for trends in phosphorus(P) and potassium(K) data. This data will be used create a Kentucky map showing P and K categories using AGR-1 and have user interactives to select year and nutrient of interest. Also have bar graph showing category frequencies across counties. This map will help farmers, extension agents, and agronomist understand whether AGR-1 recommendations are potentially not on par with high yielding cropping systems.<br/>

## Methodology

### Data

### Medium for Delivery

### Application Layout

### Thematic Representation

### User Interaction

### Aesthetics and Design Considerations

## Topic
1. Design a map using Kentucky soil test data showing nutrient trend in phosphorus(P) and potassium(K) by county from 1990 to 2019.
2. Estimate agricultural crop land using the USDA AG Census data.

## Questions
1. Use the AGR-1 nutrient recommendations categories for each nutrient (P,K) to create bar graph for each County by year to see trend in direction soil nutrient is going across the State and verify University of Kentucky recommendations are adequate to maintain soil nutrient levels?
    The nutrient levels should be in the medium range for productive crop growth.

2. Does the import of nutrients into the State exceed export of harvested crops?
    This mass balance may be not be possible due to Kentucky have river ports that import fertilizer and farmers from other counties pickup at port then cross Countyline's where product is applied. This will skew data analysis where port Counties have surplus of nutrients.
        Not sure if this is possible to create.

## Significance
The significance of the map will help determine if the nutrients are being used efficiently and show that Kentucky is doing it's part in curbing pollution runoff with excessive nutrient application. Also determine if AGR-1 recommendations may need to be updated due to higher yielding hybrid seed.

## Literature_Review
1. Nutrient Use Geographic Information System [NuGIS](http://nugis.ipni.net/About%20NuGIS/)
    - interactive map to select nutrient inputs displayed as point data
    - can select watershed nutrient balance
2. [Bay out of Balance](https://www.ewg.org/sites/default/files/report/bay_out_of_balance_full_report.pdf)
    -  examples of mapping phosphorus in soils see Appendix C
3.    [County-Level Estimates of Nutrient Inputs to the Land](https://pubs.usgs.gov/sir/2006/5012/pdf/sir2006_5012.pdf)
    - Nitrogen inputs from manure and fertilizer  temporal patterns
4. [Potential for Livestock and Poultry Manure to Provide the Nutrients Removed by Crops and Forages in Kentucky](http://www2.ca.uky.edu/agcomm/pubs/ip/ip57/ip57.pdf)
    - Counties are represented by percentage of Nitrogen coming from manure

## Methods
1. Create a CSV file from the University's Grand database which is a Microsoft Access database file.
    - use Access query to select County data only
    - export query as a CSV file with header
    - add County FIPS code
2. Separate data into crop type using AGR-1 crop types
    - Tobacco, Corn, Soybeans, Small Grains, Grain Sorghum, Canola, Hay/Pasture
    - some data overlaps more than one category example: wheat/soybeans
1. Boundary files simplified with [mapshaper](https://mapshaper.org/)
    * County boundary simplified 15.0% and export as GeoJSON file

## Packages
Installed python packages with conda
1. jupyter
2. pandas
3. pyodbc [Help with Access](https://datatofish.com/how-to-connect-python-to-ms-access-database-using-pyodbc/) files in python

## Data_References
1. University of Kentucky [AGR-1 Lime and Nutrient Recommendations](http://www2.ca.uky.edu/agcomm/pubs/agr/agr1/agr1.pdf)

2. [University of Kentucky Soil Testing Lab](http://www.rs.uky.edu/soil/) private data

3. Kentucky's State, Counties, and Regions download from [Kentucky Geological Survey](https://www.uky.edu/KGS/gis/bounds.htm)<br />
    Metadata:
    *  [State KY](https://www.uky.edu/KGS/gis/ky.htm)
    *  [Regions of Kentucky](https://www.uky.edu/KGS/gis/regions.htm)

4. [United States Department of Agriculture National Agricultural Statistics Service](https://www.nass.usda.gov/Data_and_Statistics/index.php)
