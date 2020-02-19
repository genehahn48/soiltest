# University of Kentucky's soil test data analysis of phosphorus and potassium against AGR-1 recommendations
Masters project for New Maps Plus program at the University of Kentucky.

## TOC
- [Topic](#topic)
- [Questions](#questions)
- [Significance](#significance)
- [Literature Review](#literature_review)
- [Methods](#methods)
- [Packages](#packages)
- [Data References](#data_references)

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
3. pyodbc

## Data_References
1. University of Kentucky [AGR-1 Lime and Nutrient Recommendations](http://www2.ca.uky.edu/agcomm/pubs/agr/agr1/agr1.pdf)

2. [University of Kentucky Soil Testing Lab](http://www.rs.uky.edu/soil/) private data

3. Kentucky's State, Counties, and Regions download from [Kentucky Geological Survey](https://www.uky.edu/KGS/gis/bounds.htm)<br />
    Metadata:
    *  [State KY](https://www.uky.edu/KGS/gis/ky.htm)
    *  [Regions of Kentucky](https://www.uky.edu/KGS/gis/regions.htm)

4. [United States Department of Agriculture National Agricultural Statistics Service](https://www.nass.usda.gov/Data_and_Statistics/index.php)
