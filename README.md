# University of Kentucky's soil test data analysis of phosphorus and potassium against AGR-1 recommendations.
Masters project for New Maps Plus program at the University of Kentucky.

## TOC
- [Introduction](#introduction)
- [Methodology](#methodology)<br/>
     - [Data](#data)
     - [Medium for Delivery](#Medium_for_Delivery)
     - [Application Layout](#application_layout)
     - [Thematic Representation](#thematic_representation)
     - [User Interaction](#User_Interaction)
     - [Aesthetics and Design Considerations](#Aesthetics_and_Design_Considerations)
- [Conclusion](#conclusion)
- [Thanks](#thanks)
- [Literature Review](#literature_review)


## Introduction
Soil nutrient test values are invaluable to farmers and homeowner to create the most productive growing conditions for crops or grasses in the backyard. The [University of Kentucky College of Agriculture](http://www.rs.uky.edu/soil/TestingService.php) offer testing for Kentucky residents through their local [County Extension Office](http://extension.ca.uky.edu/county) so people are not blindly applying unneeded nutrients that will lead to environmental pollution. Nutrient recommendations can be found in [AGR-1](http://www2.ca.uky.edu/agcomm/pubs/agr/agr1/agr1.pdf) for crops and [AGR-53](http://www.uky.edu/WaterResources/FF/Nutrient%20Management/pdf/Lawn%20Fertilizer%20in%20Kentucky.pdf) for lawns. Most farmers collect soil samples on a three year rotation from their fields to verify soil nutrient values are adequate for the growing crop. In recent years farmers have started to question whether AGR-1 recommendations have kept up with the new high yielding hybrids crops and nutrient recommendations should be higher for these production systems. <br/>

Using the University soil test data from 1990 to 2019, we are going to look for trends in phosphorus(P) and potassium(K) data. This data will be used create a Kentucky map showing P and K categories using AGR-1 and have user interactives to select year and nutrient of interest. Also have bar graph showing category frequencies across counties. This map will help farmers, extension agents, and agronomist understand whether AGR-1 recommendations are potentially not on par with high yielding cropping systems. Include USDA AG Census data on crop yield and crop acreage by county.<br/>

## Methodology
Use the Grand Soil Database from the University of Kentucky's Soil test lab to extract P and K from agricultural fields using crop types. This data will create an interactive map showing trends in the nutrients.

### Data

#### Links
1. University of Kentucky [AGR-1 Lime and Nutrient Recommendations](http://www2.ca.uky.edu/agcomm/pubs/agr/agr1/agr1.pdf)

2. [University of Kentucky Soil Testing Lab](http://www.rs.uky.edu/soil/) private data

3. Kentucky's State, Counties, and Regions download from [Kentucky Geological Survey](https://www.uky.edu/KGS/gis/bounds.htm)<br/>
    Metadata:
    *  [State KY](https://www.uky.edu/KGS/gis/ky.htm)
    *  [Regions of Kentucky](https://www.uky.edu/KGS/gis/regions.htm)

4. [United States Department of Agriculture National Agricultural Statistics Service](https://www.nass.usda.gov/Data_and_Statistics/index.php)<br/>
Use [CropScape](https://nassgeodata.gmu.edu/CropScape/) map to download Kentucky crop mask layer

#### Tools used in Data Wrangling
1. Create a CSV file from the University's Grand database which is a Microsoft Access database file.
    - use Access query to select County data only
    - export query as a CSV file with header
    - add County FIPS code
2. Separate data into crop type using AGR-1 crop types use Python/Jupyter Notebook with pandas.
    - Tobacco, Corn, Soybeans, Small Grains, Grain Sorghum, Canola, Hay/Pasture
    - some data overlaps more than one category example: wheat/soybeans
    - create pivot table using FIPS code as rows  
3. Boundary files simplified with [mapshaper](https://mapshaper.org/)
    * County boundary simplified 15.0% and export as GeoJSON file
#### Example of Data

### Medium_for_Delivery
The delivery method will be webpage that is accessible across multiple platforms (ex. desktop and mobile devices).

### Application_Layout
The general layout will be four maps separated into quadrants on the page. The quadrant layout will be suite for computer displays. The mobile layout will cascade down the page with four individual maps. The first map will have choropleth of the median value of the nutrient. The second map will have mask of agricultural land with classified colors representing total agricultural land by county. The third and fourth map will be repeat of the first two but represent different year to allow for comparison.

### Thematic_Representation
The data is representing County level soil testing so polygons will be classified by median value. Also land mask of the agricultural will be display so total landuse in agriculture is represented so visual comparisons can be made for how much ag is in each county.  

### User_Interaction
The user interaction will be with dropdown menus with selection for Year, Crop type, and Nutrient (P or K). The third map will also allow for the selection of a different year to compare data. The second map will allow the user to hover or click county to display the number of test for that county for the year. Also there will be a popup bargraph showing percentages of each categories in the county along with the median value for each category. Here is mock layout of the webpage design.
![Mock up of webpage](data\mapLayout.jpg)


### Aesthetics_and_Design_Considerations


### Conclusion

### Thanks
I would like to thanks several people for helping with this project: Dr. Rich Donohue, Dr. Edwin Ritchey, Dr. Frank Sikora, Dr. Joshua McGrath, and Mark Cruse


### Literature_Review
1. Nutrient Use Geographic Information System [NuGIS](http://nugis.ipni.net/About%20NuGIS/)
    - interactive map to select nutrient inputs displayed as point data
    - can select watershed nutrient balance
2. [Bay out of Balance](https://www.ewg.org/sites/default/files/report/bay_out_of_balance_full_report.pdf)
    -  examples of mapping phosphorus in soils see Appendix C
3.    [County-Level Estimates of Nutrient Inputs to the Land](https://pubs.usgs.gov/sir/2006/5012/pdf/sir2006_5012.pdf)
    - Nitrogen inputs from manure and fertilizer  temporal patterns
4. [Potential for Livestock and Poultry Manure to Provide the Nutrients Removed by Crops and Forages in Kentucky](http://www2.ca.uky.edu/agcomm/pubs/ip/ip57/ip57.pdf)
    - Counties are represented by percentage of Nitrogen coming from manure
