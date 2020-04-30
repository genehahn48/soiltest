# Wrangling Soil Test data from University of Kentucky's Soil Lab

Use Microsoft Access to export data into CSV text file with FIPS code add and quary to select just County by County name. Export as soildata_fips.txt.

#### import python libraries


```python
import pandas as pd
import numpy as np
from pathlib import Path
import warnings
```
import profiling to get quick analysis of data

```python
from ipywidgets import widgets
from pandas_profiling import ProfileReport
# from pandas_profiling.utils.cache import cache_file
```


```python

```

#### set file path to get data to work on


```python
filePath = Path('data')
fileOut = Path('project-data')
file_soil = filePath.joinpath('soildata_fips.txt')
```

#### Read data into pandas


```python
soil = pd.read_csv(file_soil, dtype='str')
```

#### Check that file is read into memory


```python
soil.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1190126 entries, 0 to 1190125
    Data columns (total 14 columns):
    FIPS_NO    1190126 non-null object
    YEAR       1190126 non-null object
    FM         1190052 non-null object
    COUNTY     1190126 non-null object
    AREA       1190126 non-null object
    PH         1187607 non-null object
    BUPH       1056246 non-null object
    P          1187473 non-null object
    K          1187494 non-null object
    CA         969266 non-null object
    MG         969725 non-null object
    ZN         967041 non-null object
    ACRES      525128 non-null object
    CROP       1183431 non-null object
    dtypes: object(14)
    memory usage: 127.1+ MB
    


```python
year_dup = soil.YEAR.unique()
year_dup
```




    array(['1990.00', '1991.00', '1992.00', '1993.00', '1994.00', '1995.00',
           '1996.00', '1997.00', '1998.00', '1999.00', '2000.00', '2001.00',
           '2002.00', '2003.00', '2004.00', '2005.00', '2006.00', '2007.00',
           '2008.00', '2009.00', '2010.00', '2011.00', '2012.00', '2013.00',
           '2014.00', '2015.00', '2016.00', '2017.00', '2018.00', '2019.00'],
          dtype=object)



#### Remove decimal from FIPS_NO and Year, can't convert to an integer because of pivot table columns later in processing. Convert PH, BUPH, P, K, and Acres into Float type.


```python
df = soil.copy()
```


```python
df.FIPS_NO = df.FIPS_NO.astype('str').replace('\.00','',regex=True)
df.YEAR = df.YEAR.astype('str').replace('\.00','',regex=True)
df.PH = df.PH.astype('float')
df.BUPH = df.BUPH.astype('float')
df.P = df.P.astype('float')
df.K = df.K.astype('float')
df.ACRES = df.ACRES.astype('float')
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1190126 entries, 0 to 1190125
    Data columns (total 14 columns):
    FIPS_NO    1190126 non-null object
    YEAR       1190126 non-null object
    FM         1190052 non-null object
    COUNTY     1190126 non-null object
    AREA       1190126 non-null object
    PH         1187607 non-null float64
    BUPH       1056246 non-null float64
    P          1187473 non-null float64
    K          1187494 non-null float64
    CA         969266 non-null object
    MG         969725 non-null object
    ZN         967041 non-null object
    ACRES      525128 non-null float64
    CROP       1183431 non-null object
    dtypes: float64(5), object(9)
    memory usage: 127.1+ MB
    


```python

```


```python

```


```python
df.info()
print(df.head())
df.tail()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1190126 entries, 0 to 1190125
    Data columns (total 14 columns):
    FIPS_NO    1190126 non-null object
    YEAR       1190126 non-null object
    FM         1190052 non-null object
    COUNTY     1190126 non-null object
    AREA       1190126 non-null object
    PH         1187607 non-null float64
    BUPH       1056246 non-null float64
    P          1187473 non-null float64
    K          1187494 non-null float64
    CA         969266 non-null object
    MG         969725 non-null object
    ZN         967041 non-null object
    ACRES      525128 non-null float64
    CROP       1183431 non-null object
    dtypes: float64(5), object(9)
    memory usage: 127.1+ MB
      FIPS_NO  YEAR FM COUNTY                AREA    PH  BUPH      P      K  \
    0       1  1990  A  ADAIR  Eastern Pennyroyal  7.15  7.23   28.0  158.0   
    1       1  1990  A  ADAIR  Eastern Pennyroyal  6.95  7.22   88.0  134.0   
    2       1  1990  A  ADAIR  Eastern Pennyroyal  6.26  6.94   70.0  256.0   
    3       1  1990  A  ADAIR  Eastern Pennyroyal  5.67  6.69  161.0  611.0   
    4       1  1990  A  ADAIR  Eastern Pennyroyal  7.26  7.47  105.0  315.0   
    
            CA      MG   ZN  ACRES     CROP  
    0      NaN     NaN  NaN   18.0  Alfalfa  
    1  2890.00  159.00  NaN   15.0  Alfalfa  
    2      NaN     NaN  NaN   16.0  Alfalfa  
    3      NaN     NaN  NaN    6.0  Alfalfa  
    4  2940.00  137.00  NaN   25.0  Alfalfa  
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS_NO</th>
      <th>YEAR</th>
      <th>FM</th>
      <th>COUNTY</th>
      <th>AREA</th>
      <th>PH</th>
      <th>BUPH</th>
      <th>P</th>
      <th>K</th>
      <th>CA</th>
      <th>MG</th>
      <th>ZN</th>
      <th>ACRES</th>
      <th>CROP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1190121</th>
      <td>239</td>
      <td>2019</td>
      <td>A</td>
      <td>WOODFORD</td>
      <td>Bluegrass</td>
      <td>5.0</td>
      <td>6.3</td>
      <td>62.0</td>
      <td>319.0</td>
      <td>1489.00</td>
      <td>223.00</td>
      <td>3.50</td>
      <td>1.0</td>
      <td>Wildlife Food Plot</td>
    </tr>
    <tr>
      <th>1190122</th>
      <td>239</td>
      <td>2019</td>
      <td>A</td>
      <td>WOODFORD</td>
      <td>Bluegrass</td>
      <td>5.9</td>
      <td>6.7</td>
      <td>46.0</td>
      <td>257.0</td>
      <td>5247.00</td>
      <td>268.00</td>
      <td>2.10</td>
      <td>2.0</td>
      <td>Wildlife Food Plot</td>
    </tr>
    <tr>
      <th>1190123</th>
      <td>239</td>
      <td>2019</td>
      <td>A</td>
      <td>WOODFORD</td>
      <td>Bluegrass</td>
      <td>6.8</td>
      <td>7.0</td>
      <td>75.0</td>
      <td>243.0</td>
      <td>12047.00</td>
      <td>281.00</td>
      <td>1.20</td>
      <td>2.0</td>
      <td>Wildlife Food Plot</td>
    </tr>
    <tr>
      <th>1190124</th>
      <td>239</td>
      <td>2019</td>
      <td>A</td>
      <td>WOODFORD</td>
      <td>Bluegrass</td>
      <td>5.3</td>
      <td>6.6</td>
      <td>60.0</td>
      <td>407.0</td>
      <td>3304.00</td>
      <td>396.00</td>
      <td>2.80</td>
      <td>NaN</td>
      <td>Wildlife Food Plot</td>
    </tr>
    <tr>
      <th>1190125</th>
      <td>239</td>
      <td>2019</td>
      <td>A</td>
      <td>WOODFORD</td>
      <td>Bluegrass</td>
      <td>5.0</td>
      <td>6.3</td>
      <td>59.0</td>
      <td>377.0</td>
      <td>4341.00</td>
      <td>349.00</td>
      <td>2.00</td>
      <td>1.5</td>
      <td>Wildlife Food Plot</td>
    </tr>
  </tbody>
</table>
</div>



#### Create profile report 

#### Drop CA, MG, ZN


```python
df = df.drop(['CA','MG','ZN'], axis=1)
```


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1190126 entries, 0 to 1190125
    Data columns (total 11 columns):
    FIPS_NO    1190126 non-null object
    YEAR       1190126 non-null object
    FM         1190052 non-null object
    COUNTY     1190126 non-null object
    AREA       1190126 non-null object
    PH         1187607 non-null float64
    BUPH       1056246 non-null float64
    P          1187473 non-null float64
    K          1187494 non-null float64
    ACRES      525128 non-null float64
    CROP       1183431 non-null object
    dtypes: float64(5), object(6)
    memory usage: 99.9+ MB
    

#### Check the maximum and minimum values for P and K 


```python
print("max P =", df.P.max(), "min P =",df.P.min())
print("max K" , df.K.max(), "min K =", df.K.min())
```

    max P = 21658.0 min P = -9.0
    max K 60452.0 min K = -26.0
    

#### Remove values less than zero and above 9999


```python
df = df[~(df['P'] < 0)]
df = df[~(df['K'] < 0)]
df = df[~(df['P'] >= 9999)]
df = df[~(df['K'] >= 9999)]

```


```python
print("max P =", df.P.max(), "min P =",df.P.min())
print("max K" , df.K.max(), "min K =", df.K.min())
```

    max P = 9778.0 min P = 0.0
    max K 9964.0 min K = 1.0
    

#### Select agricultural "A" and commercial "C" types from FM column. Append df together.


```python
df1 = df.loc[(df['FM'] == 'A')]
df2 = df.loc[(df['FM'] == 'C')]
df3 = df1.append(df2, ignore_index=True)
```


```python
print(df1.info())
print(df2.info())
print(df3.info())

```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 941637 entries, 0 to 1190125
    Data columns (total 11 columns):
    FIPS_NO    941637 non-null object
    YEAR       941637 non-null object
    FM         941637 non-null object
    COUNTY     941637 non-null object
    AREA       941637 non-null object
    PH         940288 non-null float64
    BUPH       836405 non-null float64
    P          940284 non-null float64
    K          940295 non-null float64
    ACRES      511570 non-null float64
    CROP       938347 non-null object
    dtypes: float64(5), object(6)
    memory usage: 86.2+ MB
    None
    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 21910 entries, 153 to 1190012
    Data columns (total 11 columns):
    FIPS_NO    21910 non-null object
    YEAR       21910 non-null object
    FM         21910 non-null object
    COUNTY     21910 non-null object
    AREA       21910 non-null object
    PH         21882 non-null float64
    BUPH       20540 non-null float64
    P          21881 non-null float64
    K          21883 non-null float64
    ACRES      7362 non-null float64
    CROP       21858 non-null object
    dtypes: float64(5), object(6)
    memory usage: 2.0+ MB
    None
    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 963547 entries, 0 to 963546
    Data columns (total 11 columns):
    FIPS_NO    963547 non-null object
    YEAR       963547 non-null object
    FM         963547 non-null object
    COUNTY     963547 non-null object
    AREA       963547 non-null object
    PH         962170 non-null float64
    BUPH       856945 non-null float64
    P          962165 non-null float64
    K          962178 non-null float64
    ACRES      518932 non-null float64
    CROP       960205 non-null object
    dtypes: float64(5), object(6)
    memory usage: 80.9+ MB
    None
    

#### Drop null values from CROP, P, K.


```python
df3.drop(df3[df3['CROP'].isnull()].index, inplace=True)
df3.drop(df3[df3['P'].isnull()].index, inplace=True)
df3.drop(df3[df3['K'].isnull()].index, inplace=True)
df3.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 958826 entries, 0 to 963546
    Data columns (total 11 columns):
    FIPS_NO    958826 non-null object
    YEAR       958826 non-null object
    FM         958826 non-null object
    COUNTY     958826 non-null object
    AREA       958826 non-null object
    PH         958813 non-null float64
    BUPH       854104 non-null float64
    P          958826 non-null float64
    K          958826 non-null float64
    ACRES      517097 non-null float64
    CROP       958826 non-null object
    dtypes: float64(5), object(6)
    memory usage: 87.8+ MB
    

#### Resort and index dataframe.


```python
df = df3[['FIPS_NO','COUNTY','AREA','YEAR','CROP','ACRES', 'PH', 'BUPH', 'P', 'K', ]]
order_by_cols = ['FIPS_NO','YEAR','CROP']
df = df.sort_values(by=order_by_cols, ascending=[True,True,True]).copy()
df.reset_index(drop=True,inplace=True)
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS_NO</th>
      <th>COUNTY</th>
      <th>AREA</th>
      <th>YEAR</th>
      <th>CROP</th>
      <th>ACRES</th>
      <th>PH</th>
      <th>BUPH</th>
      <th>P</th>
      <th>K</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>Eastern Pennyroyal</td>
      <td>1990</td>
      <td>Alfalfa</td>
      <td>18.0</td>
      <td>7.15</td>
      <td>7.23</td>
      <td>28.0</td>
      <td>158.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>Eastern Pennyroyal</td>
      <td>1990</td>
      <td>Alfalfa</td>
      <td>15.0</td>
      <td>6.95</td>
      <td>7.22</td>
      <td>88.0</td>
      <td>134.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>Eastern Pennyroyal</td>
      <td>1990</td>
      <td>Alfalfa</td>
      <td>16.0</td>
      <td>6.26</td>
      <td>6.94</td>
      <td>70.0</td>
      <td>256.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>Eastern Pennyroyal</td>
      <td>1990</td>
      <td>Alfalfa</td>
      <td>6.0</td>
      <td>5.67</td>
      <td>6.69</td>
      <td>161.0</td>
      <td>611.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>Eastern Pennyroyal</td>
      <td>1990</td>
      <td>Alfalfa</td>
      <td>25.0</td>
      <td>7.26</td>
      <td>7.47</td>
      <td>105.0</td>
      <td>315.0</td>
    </tr>
  </tbody>
</table>
</div>



#### Save clean CSV file 


```python
df.to_csv(r'data\clean_soil_data.csv', index = False)
```


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 958826 entries, 0 to 958825
    Data columns (total 10 columns):
    FIPS_NO    958826 non-null object
    COUNTY     958826 non-null object
    AREA       958826 non-null object
    YEAR       958826 non-null object
    CROP       958826 non-null object
    ACRES      517097 non-null float64
    PH         958813 non-null float64
    BUPH       854104 non-null float64
    P          958826 non-null float64
    K          958826 non-null float64
    dtypes: float64(5), object(5)
    memory usage: 73.2+ MB
    

#### Find unique CROP types. 


```python
croptypes = df.CROP.unique()
croptypes
```




    array(['Alfalfa', 'Alfalfa/Cool Season', 'Burley Tobacco', 'Clover/Grass',
           'Cole Crops (broccoli, etc.)', 'Corn', 'Corn, Sweet', 'Cucumbers',
           'Fescue', 'No Info Given', 'Orchardgrass', 'Other Vegetables',
           'Peppers (bell & pimento)', 'Red Clover', 'Timothy', 'Tomatoes',
           'White Clover', 'White Clover/Grass', 'Rye', 'Soybeans',
           'Tobacco Beds', 'Wheat', 'Oats', 'Red Clover/Grass',
           'Warm Season Grass', 'Blueberries', 'Fescue/Lespedeza (multiple)',
           'Forage Sorghum', 'Strawberries', 'Cool Season Grass',
           'Evergreen Shrubs, Broadleaved', 'Sudangrass',
           'Timothy/Red Clover', 'Lespedeza', 'Other Fruit & Nuts',
           'Small Grains/Corn', 'Small Grains/Soybeans', 'Squash & Pumpkins',
           'Birdsfoot Trefoil', 'Grain Sorghum', 'Lespedeza/Grass', 'Annuals',
           'Fescue/Lespedeza', 'Forage Crops', 'Millet',
           'Orchardgrass/Red Clover', 'Apples', 'Grapes', 'Peaches',
           'Small Grains', 'Bermudagrass, common', 'Sweet Potatoes', 'Other',
           'Azaleas', 'Brambles', 'Wheat/Soybeans', 'Potatoes',
           'Warm Season Annual Grass', 'Bermudagrass, improved', 'Sunflower',
           'Fescue/White Clover', 'Sorghum/Sudangras', 'Cherries, Tart',
           'Pears', 'Watermelons', 'Root Crops (beets, carrots,etc.)',
           'Switchgrass', 'Muskmelons (cantaloupes)',
           'Native Grassland Restoration', 'Wildlife Food Plot',
           'Beans (snap,dry,lima,etc.)', 'Greens (collards, kale, etc.)',
           'Okra', 'Asparagus', 'Eggplant', 'Hemp', 'Rhubarb',
           'Sorghum Sudangrass', 'Crownvetch', 'Canola/Soybeans',
           'Dark Tobacco', 'Grain Crops (multiple)', 'Bluestem', 'Walnuts',
           'Indiangrass', 'Warm Season Native Grass', 'Deciduous Trees',
           'Conifers (not pines or junipers)', 'Conifers, pines', 'Pecans',
           'Hollies', 'Orchardgrass/White Clover', 'Perrenials (not bulbs)',
           'Bluegrass', 'Onions (green & bulb)', 'Canola', 'Rye/Soybeans',
           'Buffer or Filter Strip', 'Triticale', 'Bulbs', 'Other Flowers',
           'Other Nursery plants', 'Deciduous Shrubs',
           'Evergreen Trees, Broadleaved', 'Oats/Soybeans',
           'Currants and Gooseberries', 'Barley', 'Bluegrass/White Clover',
           'Side-oats grama', 'Wheat/Corn', 'Rhododendrons', 'Plums',
           'Cool Peas', 'Southern Peas', 'Barley/Soybeans', 'Unknown',
           'Conifers, junipers', 'Triticale/Soybeans'], dtype=object)



## Select CROP based on AGR-1 crop types.

## Corn

#### Create list to select Corn from database.


```python
corn_sel = ['Corn','Small Grains/Corn','Wheat/Corn']
corn_sel.sort()
print(corn_sel)
```

    ['Corn', 'Small Grains/Corn', 'Wheat/Corn']
    

#### Create dataframe for nutrients phosphorus (P) and potassium (K).


```python
df_corn = df[df.CROP.isin(corn_sel)]
df_corn_nu = df_corn[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_corn_nu.head())
```

        FIPS_NO COUNTY  YEAR     P      K
    155       1  ADAIR  1990  37.0  146.0
    156       1  ADAIR  1990  93.0  105.0
    157       1  ADAIR  1990  25.0  252.0
    158       1  ADAIR  1990  24.0  121.0
    159       1  ADAIR  1990  92.0  283.0
    

### Calculate median for each County and year


```python
df_corn_median = np.round( df_corn_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_corn_median)
print(df_corn_median.columns)
df_corn_median.columns = list(map("_".join,df_corn_median.columns))
df_corn_median.columns = df_corn_median.columns.str.replace("P_median_", "P_med")
df_corn_median.columns = df_corn_median.columns.str.replace("P_len", "P_count")
df_corn_median.columns = df_corn_median.columns.str.replace("K_median_","K_med")
df_corn_median.columns = df_corn_median.columns.str.replace("K_len","K_count")
print(df_corn_median.columns)
df_corn_median = df_corn_median.reset_index()
print(df_corn_median)
file_out_median = fileOut.joinpath('corn_median.csv')  # path and filename
df_corn_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_corn_median)),'\n')

```

                K                                               ...      P         \
              len                                               ... median          
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   2011   
    COUNTY                                                      ...                 
    ADAIR      30   35   37   74   21   74   68   73   46   54  ...  108.0   62.0   
    ALLEN      23   41   26   49   12   20    6    7   13   24  ...   55.0   50.0   
    ANDERSON   15   30   10    6   10    8    8    5    1    8  ...  269.0  150.0   
    BALLARD    81   65   65   62   56   87   81   40  158  126  ...   56.0   54.0   
    BARREN    101  140  171  136  105  143   50   42   37   10  ...  104.0   62.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...    ...   
    WAYNE     110   62   85  114   95  141  114  171  191  149  ...   64.0   87.0   
    WEBSTER   164  191  168   55   70   89   43   47  110  125  ...   58.0   42.0   
    WHITLEY    15   15   11   25   16   10   38   14   21    3  ...   45.0   41.0   
    WOLFE      20   15   16   10   15    6   15   11   10   13  ...   70.0  148.0   
    WOODFORD   31   32   31   49   73   96  107   76   63   77  ...  180.0  197.0   
    
                                                                      
                                                                      
    YEAR       2012   2013   2014   2015   2016   2017   2018   2019  
    COUNTY                                                            
    ADAIR      80.0   71.0   73.0   46.0   78.0   69.0   57.0   76.0  
    ALLEN      52.0   62.0  310.0   63.0   93.0   64.0   35.0   25.0  
    ANDERSON  149.0  212.0  232.0  346.0  228.0  393.0   31.0  226.0  
    BALLARD    53.0   48.0   52.0   54.0   46.0   55.0   40.0   49.0  
    BARREN     62.0   59.0   80.0   63.0   80.0   67.0   53.0   45.0  
    ...         ...    ...    ...    ...    ...    ...    ...    ...  
    WAYNE      73.0  138.0   68.0   80.0   77.0   79.0   68.0   80.0  
    WEBSTER    39.0   48.0   41.0   48.0   89.0   61.0   26.0   46.0  
    WHITLEY    62.0   42.0   30.0   41.0   36.0   34.0   25.0   22.0  
    WOLFE      57.0   16.0    0.0  178.0    0.0   63.0   88.0   30.0  
    WOODFORD  280.0  219.0  151.0  280.0  248.0  385.0  217.0  260.0  
    
    [120 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR            30            35            37            74   
    1       ALLEN            23            41            26            49   
    2    ANDERSON            15            30            10             6   
    3     BALLARD            81            65            65            62   
    4      BARREN           101           140           171           136   
    ..        ...           ...           ...           ...           ...   
    115     WAYNE           110            62            85           114   
    116   WEBSTER           164           191           168            55   
    117   WHITLEY            15            15            11            25   
    118     WOLFE            20            15            16            10   
    119  WOODFORD            31            32            31            49   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0              21            74            68            73            46   
    1              12            20             6             7            13   
    2              10             8             8             5             1   
    3              56            87            81            40           158   
    4             105           143            50            42            37   
    ..            ...           ...           ...           ...           ...   
    115            95           141           114           171           191   
    116            70            89            43            47           110   
    117            16            10            38            14            21   
    118            15             6            15            11            10   
    119            73            96           107            76            63   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...      108.0       62.0       80.0       71.0       73.0       46.0   
    1    ...       55.0       50.0       52.0       62.0      310.0       63.0   
    2    ...      269.0      150.0      149.0      212.0      232.0      346.0   
    3    ...       56.0       54.0       53.0       48.0       52.0       54.0   
    4    ...      104.0       62.0       62.0       59.0       80.0       63.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    115  ...       64.0       87.0       73.0      138.0       68.0       80.0   
    116  ...       58.0       42.0       39.0       48.0       41.0       48.0   
    117  ...       45.0       41.0       62.0       42.0       30.0       41.0   
    118  ...       70.0      148.0       57.0       16.0        0.0      178.0   
    119  ...      180.0      197.0      280.0      219.0      151.0      280.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0         78.0       69.0       57.0       76.0  
    1         93.0       64.0       35.0       25.0  
    2        228.0      393.0       31.0      226.0  
    3         46.0       55.0       40.0       49.0  
    4         80.0       67.0       53.0       45.0  
    ..         ...        ...        ...        ...  
    115       77.0       79.0       68.0       80.0  
    116       89.0       61.0       26.0       46.0  
    117       36.0       34.0       25.0       22.0  
    118        0.0       63.0       88.0       30.0  
    119      248.0      385.0      217.0      260.0  
    
    [120 rows x 121 columns]
    total number of records written to CSV: 120 
    
    


```python

```


```python

```

#### Corn,  Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
        Cat      Title       Break
        -------------------------------------
        VL       very low    P<= 5
        L        low         P>5 & P<=27
        M        medium      P>27 & P<=60
        H        high        P>60

#### Categories for K
        Cat      Title      Break
       --------------------------------------
        VL       very low   K< 100
        L        low        K>=100 & K <=190
        M        medium     K>=191 & K <=300
        H        high       K>=301 & K <=420
        VH       very high  K>420


```python
df_corn_nu['CAT_P'] = ''
df_corn_nu['CAT_P'] = np.where(df_corn_nu.P <= 5, 'VL', df_corn_nu.CAT_P)
df_corn_nu['CAT_P'] = np.where(((df_corn_nu.P > 5) & (df_corn_nu.P <= 27)), 'L', df_corn_nu.CAT_P)
df_corn_nu['CAT_P'] = np.where(((df_corn_nu.P > 27) & (df_corn_nu.P <= 60)), 'M', df_corn_nu.CAT_P)
df_corn_nu['CAT_P'] = np.where((df_corn_nu.P > 60), 'H', df_corn_nu.CAT_P)
df_corn_nu.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS_NO</th>
      <th>COUNTY</th>
      <th>YEAR</th>
      <th>P</th>
      <th>K</th>
      <th>CAT_P</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>155</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>37.0</td>
      <td>146.0</td>
      <td>M</td>
    </tr>
    <tr>
      <th>156</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>93.0</td>
      <td>105.0</td>
      <td>H</td>
    </tr>
    <tr>
      <th>157</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>25.0</td>
      <td>252.0</td>
      <td>L</td>
    </tr>
    <tr>
      <th>158</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>24.0</td>
      <td>121.0</td>
      <td>L</td>
    </tr>
    <tr>
      <th>159</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>92.0</td>
      <td>283.0</td>
      <td>H</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_corn_nu['CAT_K'] = ''
df_corn_nu['CAT_K'] = np.where(df_corn_nu.K <= 100, 'VL', df_corn_nu.CAT_K)
df_corn_nu['CAT_K'] = np.where(((df_corn_nu.K > 100) & (df_corn_nu.K <= 190)), 'L', df_corn_nu.CAT_K)
df_corn_nu['CAT_K'] = np.where(((df_corn_nu.K > 190) & (df_corn_nu.K <= 300)), 'M', df_corn_nu.CAT_K)
df_corn_nu['CAT_K'] = np.where(((df_corn_nu.K > 300) & (df_corn_nu.K <= 420)), 'H', df_corn_nu.CAT_K)
df_corn_nu['CAT_K'] = np.where((df_corn_nu.K > 420), 'VH', df_corn_nu.CAT_K)
df_corn_nu.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS_NO</th>
      <th>COUNTY</th>
      <th>YEAR</th>
      <th>P</th>
      <th>K</th>
      <th>CAT_P</th>
      <th>CAT_K</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>155</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>37.0</td>
      <td>146.0</td>
      <td>M</td>
      <td>L</td>
    </tr>
    <tr>
      <th>156</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>93.0</td>
      <td>105.0</td>
      <td>H</td>
      <td>L</td>
    </tr>
    <tr>
      <th>157</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>25.0</td>
      <td>252.0</td>
      <td>L</td>
      <td>M</td>
    </tr>
    <tr>
      <th>158</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>24.0</td>
      <td>121.0</td>
      <td>L</td>
      <td>L</td>
    </tr>
    <tr>
      <th>159</th>
      <td>1</td>
      <td>ADAIR</td>
      <td>1990</td>
      <td>92.0</td>
      <td>283.0</td>
      <td>H</td>
      <td>M</td>
    </tr>
  </tbody>
</table>
</div>



#### Create pivot table to sort categories by year and County for each nutrient.

#### Get median value of P and K nutrient.


```python

```


```python
warnings.filterwarnings("ignore")
df_corn_p = np.round( df_corn_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),0)
df_corn_k = np.round( df_corn_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_corn_p.head())
print(df_corn_k.head())
```

                P                                     ...                         \
              len                                     ... median                   
    YEAR     1990            1991           1992      ...   2017      2018         
    CAT_P       H   L   M VL    H  L   M VL    H   L  ...      M VL      H     L   
    COUNTY                                            ...                          
    ADAIR      15   4  11  0   24  7   4  0   18   4  ...   44.0  0  140.0  20.0   
    ALLEN       7  10   6  0   19  4  18  0    9   5  ...   36.0  0  116.0   0.0   
    ANDERSON   10   3   1  1   18  3   9  0    9   1  ...    0.0  0  147.0   8.0   
    BALLARD    69   0  12  0   33  4  28  0   51   2  ...   42.0  0   74.0   0.0   
    BARREN     66   9  26  0   86  9  45  0  114  12  ...   58.0  0  108.0  24.0   
    
                                             
                                             
    YEAR                2019                 
    CAT_P        M VL      H     L     M VL  
    COUNTY                                   
    ADAIR     42.0  0  104.0  24.0  43.0  2  
    ALLEN     34.0  0  312.0  16.0  38.0  0  
    ANDERSON  30.0  0  248.0   0.0  51.0  0  
    BALLARD   37.0  0   74.0  24.0  46.0  0  
    BARREN    45.0  0  133.0  20.0  45.0  2  
    
    [5 rows x 240 columns]
                K                                     ...                       \
              len                                     ... median                 
    YEAR     1990                1991                 ...   2018                 
    CAT_K       H   L   M  VH VL    H   L   M  VH VL  ...      H      L      M   
    COUNTY                                            ...                        
    ADAIR       3  12  12   1  2    5  12  12   4  2  ...  346.0  156.0  237.0   
    ALLEN       2   6  13   1  1   11   7  18   5  0  ...    0.0    0.0  234.0   
    ANDERSON    4   5   3   2  1    9   6  11   4  0  ...    0.0  174.0  216.0   
    BALLARD    20  10  48   3  0   11  17  35   2  0  ...  309.0  168.0  222.0   
    BARREN     32  16  26  26  1   35  23  62  19  1  ...  339.0  184.0  243.0   
    
                                                             
                                                             
    YEAR                    2019                             
    CAT_K        VH    VL      H      L      M     VH    VL  
    COUNTY                                                   
    ADAIR     455.0  91.0  336.0  160.0  234.0    0.0  78.0  
    ALLEN       0.0  95.0    0.0  140.0  217.0    0.0  86.0  
    ANDERSON  502.0  96.0    0.0  181.0  209.0  543.0   0.0  
    BALLARD   509.0   0.0  387.0  164.0  211.0    0.0   0.0  
    BARREN    451.0   0.0  358.0  162.0  219.0  422.0  90.0  
    
    [5 rows x 300 columns]
    

## Unpivot table and save to CSV file

#### Create column names from pivot table data


```python
print(df_corn_p.columns)
df_corn_k.columns
```

    MultiIndex([('P',    'len', '1990',  'H'),
                ('P',    'len', '1990',  'L'),
                ('P',    'len', '1990',  'M'),
                ('P',    'len', '1990', 'VL'),
                ('P',    'len', '1991',  'H'),
                ('P',    'len', '1991',  'L'),
                ('P',    'len', '1991',  'M'),
                ('P',    'len', '1991', 'VL'),
                ('P',    'len', '1992',  'H'),
                ('P',    'len', '1992',  'L'),
                ...
                ('P', 'median', '2017',  'M'),
                ('P', 'median', '2017', 'VL'),
                ('P', 'median', '2018',  'H'),
                ('P', 'median', '2018',  'L'),
                ('P', 'median', '2018',  'M'),
                ('P', 'median', '2018', 'VL'),
                ('P', 'median', '2019',  'H'),
                ('P', 'median', '2019',  'L'),
                ('P', 'median', '2019',  'M'),
                ('P', 'median', '2019', 'VL')],
               names=[None, None, 'YEAR', 'CAT_P'], length=240)
    




    MultiIndex([('K',    'len', '1990',  'H'),
                ('K',    'len', '1990',  'L'),
                ('K',    'len', '1990',  'M'),
                ('K',    'len', '1990', 'VH'),
                ('K',    'len', '1990', 'VL'),
                ('K',    'len', '1991',  'H'),
                ('K',    'len', '1991',  'L'),
                ('K',    'len', '1991',  'M'),
                ('K',    'len', '1991', 'VH'),
                ('K',    'len', '1991', 'VL'),
                ...
                ('K', 'median', '2018',  'H'),
                ('K', 'median', '2018',  'L'),
                ('K', 'median', '2018',  'M'),
                ('K', 'median', '2018', 'VH'),
                ('K', 'median', '2018', 'VL'),
                ('K', 'median', '2019',  'H'),
                ('K', 'median', '2019',  'L'),
                ('K', 'median', '2019',  'M'),
                ('K', 'median', '2019', 'VH'),
                ('K', 'median', '2019', 'VL')],
               names=[None, None, 'YEAR', 'CAT_K'], length=300)




```python
df_corn_p.columns = list(map("_".join,df_corn_p.columns))
df_corn_k.columns = list(map("_".join,df_corn_k.columns))
```


```python
print(df_corn_p.columns)
print(df_corn_k.columns)
```

    Index(['P_len_1990_H', 'P_len_1990_L', 'P_len_1990_M', 'P_len_1990_VL',
           'P_len_1991_H', 'P_len_1991_L', 'P_len_1991_M', 'P_len_1991_VL',
           'P_len_1992_H', 'P_len_1992_L',
           ...
           'P_median_2017_M', 'P_median_2017_VL', 'P_median_2018_H',
           'P_median_2018_L', 'P_median_2018_M', 'P_median_2018_VL',
           'P_median_2019_H', 'P_median_2019_L', 'P_median_2019_M',
           'P_median_2019_VL'],
          dtype='object', length=240)
    Index(['K_len_1990_H', 'K_len_1990_L', 'K_len_1990_M', 'K_len_1990_VH',
           'K_len_1990_VL', 'K_len_1991_H', 'K_len_1991_L', 'K_len_1991_M',
           'K_len_1991_VH', 'K_len_1991_VL',
           ...
           'K_median_2018_H', 'K_median_2018_L', 'K_median_2018_M',
           'K_median_2018_VH', 'K_median_2018_VL', 'K_median_2019_H',
           'K_median_2019_L', 'K_median_2019_M', 'K_median_2019_VH',
           'K_median_2019_VL'],
          dtype='object', length=300)
    


```python
df_corn_p.columns = df_corn_p.columns.str.replace("P_median_", "")
df_corn_p.columns = df_corn_p.columns.str.replace("P_len", "count")
df_corn_k.columns = df_corn_k.columns.str.replace("K_median_","")
df_corn_k.columns = df_corn_k.columns.str.replace("K_len","count")
print(df_corn_p.columns)
print(df_corn_k.columns)
```

    Index(['count_1990_H', 'count_1990_L', 'count_1990_M', 'count_1990_VL',
           'count_1991_H', 'count_1991_L', 'count_1991_M', 'count_1991_VL',
           'count_1992_H', 'count_1992_L',
           ...
           '2017_M', '2017_VL', '2018_H', '2018_L', '2018_M', '2018_VL', '2019_H',
           '2019_L', '2019_M', '2019_VL'],
          dtype='object', length=240)
    Index(['count_1990_H', 'count_1990_L', 'count_1990_M', 'count_1990_VH',
           'count_1990_VL', 'count_1991_H', 'count_1991_L', 'count_1991_M',
           'count_1991_VH', 'count_1991_VL',
           ...
           '2018_H', '2018_L', '2018_M', '2018_VH', '2018_VL', '2019_H', '2019_L',
           '2019_M', '2019_VH', '2019_VL'],
          dtype='object', length=300)
    

#### Reindex unpivot table 


```python
df_corn_p = df_corn_p.reset_index()
df_corn_k = df_corn_k.reset_index()
print(df_corn_p.head())
print(df_corn_k.head())
```

         COUNTY  count_1990_H  count_1990_L  count_1990_M  count_1990_VL  \
    0     ADAIR            15             4            11              0   
    1     ALLEN             7            10             6              0   
    2  ANDERSON            10             3             1              1   
    3   BALLARD            69             0            12              0   
    4    BARREN            66             9            26              0   
    
       count_1991_H  count_1991_L  count_1991_M  count_1991_VL  count_1992_H  ...  \
    0            24             7             4              0            18  ...   
    1            19             4            18              0             9  ...   
    2            18             3             9              0             9  ...   
    3            33             4            28              0            51  ...   
    4            86             9            45              0           114  ...   
    
       2017_M  2017_VL  2018_H  2018_L  2018_M  2018_VL  2019_H  2019_L  2019_M  \
    0    44.0        0   140.0    20.0    42.0        0   104.0    24.0    43.0   
    1    36.0        0   116.0     0.0    34.0        0   312.0    16.0    38.0   
    2     0.0        0   147.0     8.0    30.0        0   248.0     0.0    51.0   
    3    42.0        0    74.0     0.0    37.0        0    74.0    24.0    46.0   
    4    58.0        0   108.0    24.0    45.0        0   133.0    20.0    45.0   
    
       2019_VL  
    0        2  
    1        0  
    2        0  
    3        0  
    4        2  
    
    [5 rows x 241 columns]
         COUNTY  count_1990_H  count_1990_L  count_1990_M  count_1990_VH  \
    0     ADAIR             3            12            12              1   
    1     ALLEN             2             6            13              1   
    2  ANDERSON             4             5             3              2   
    3   BALLARD            20            10            48              3   
    4    BARREN            32            16            26             26   
    
       count_1990_VL  count_1991_H  count_1991_L  count_1991_M  count_1991_VH  \
    0              2             5            12            12              4   
    1              1            11             7            18              5   
    2              1             9             6            11              4   
    3              0            11            17            35              2   
    4              1            35            23            62             19   
    
       ...  2018_H  2018_L  2018_M  2018_VH  2018_VL  2019_H  2019_L  2019_M  \
    0  ...   346.0   156.0   237.0    455.0     91.0   336.0   160.0   234.0   
    1  ...     0.0     0.0   234.0      0.0     95.0     0.0   140.0   217.0   
    2  ...     0.0   174.0   216.0    502.0     96.0     0.0   181.0   209.0   
    3  ...   309.0   168.0   222.0    509.0      0.0   387.0   164.0   211.0   
    4  ...   339.0   184.0   243.0    451.0      0.0   358.0   162.0   219.0   
    
       2019_VH  2019_VL  
    0      0.0     78.0  
    1      0.0     86.0  
    2    543.0      0.0  
    3      0.0      0.0  
    4    422.0     90.0  
    
    [5 rows x 301 columns]
    


```python

```

#### Save categorized data to file. Separate by crop and nutrient type (P and K) with count by category.


```python
file_out_p = fileOut.joinpath('corn_p_levels.csv')  # path and filename
df_corn_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('corn_k_levels.csv')  # path and filename
df_corn_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_corn_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_corn_k)),'\n')
```

    total number of records written to CSV: 120 
    
    total number of records written to CSV: 120 
    
    


```python
# profile = ProfileReport((df_corn_p)
```


```python
# profile
```

## Soybeans

#### Create list to select Soybeans from database.


```python
soy_sel = ['Soybeans', 'Small Grains/Soybeans', 'Wheat/Soybeans', 'Canola/Soybeans', 'Rye/Soybeans', 'Oats/Soybeans', 'Barley/Soybeans', 'Triticale/Soybeans']
soy_sel.sort()
print(soy_sel)
```

    ['Barley/Soybeans', 'Canola/Soybeans', 'Oats/Soybeans', 'Rye/Soybeans', 'Small Grains/Soybeans', 'Soybeans', 'Triticale/Soybeans', 'Wheat/Soybeans']
    

#### Select soybeans from dataset.


```python
df_soy = df[df.CROP.isin(soy_sel)]
df_soy_nu = df_soy[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_soy_nu.head())
```

         FIPS_NO COUNTY  YEAR      P      K
    628        1  ADAIR  1991  238.0  318.0
    1879       1  ADAIR  1995   83.0  173.0
    1880       1  ADAIR  1995   59.0  150.0
    1881       1  ADAIR  1995   65.0  152.0
    1882       1  ADAIR  1995  148.0  317.0
    

### Calculate median for each year by County


```python
df_soy_median = np.round( df_soy_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_soy_median)
print(df_soy_median.columns)
df_soy_median.columns = list(map("_".join,df_soy_median.columns))
df_soy_median.columns = df_soy_median.columns.str.replace("P_median_", "P_med")
df_soy_median.columns = df_soy_median.columns.str.replace("P_len", "P_count")
df_soy_median.columns = df_soy_median.columns.str.replace("K_median_","K_med")
df_soy_median.columns = df_soy_median.columns.str.replace("K_len","K_count")
print(df_soy_median.columns)
df_soy_median = df_soy_median.reset_index()
print(df_soy_median)
file_out_median = fileOut.joinpath('soy_median.csv')  # path and filename
df_soy_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_soy_median)),'\n')
```

                K                                               ...      P         \
              len                                               ... median          
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   2011   
    COUNTY                                                      ...                 
    ADAIR       0    1    0    0    0    4    0    2    5    0  ...   86.0   88.0   
    ALLEN       5    3    3   15    0   21   11    2    5    2  ...  127.0   43.0   
    ANDERSON    0   12    1    1    1    0    0    0    0    2  ...  290.0  367.0   
    BALLARD    58   36   11   58   30   54   59   89  111  124  ...   50.0   62.0   
    BARREN     16   26   30   14   22   19   15   13    5    0  ...  234.0   85.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...    ...   
    WAYNE      69   39   50   60   44  105   35   62   77   59  ...   80.0   95.0   
    WEBSTER    40  102   58   41   63  106   30   44   64  102  ...   69.0   36.0   
    WHITLEY     1    2    4    1    1    1    1    0    0    0  ...   95.0    0.0   
    WOLFE       1    0    0    0    0    0    0    0    0    0  ...    0.0    0.0   
    WOODFORD    5   12    2    4   24   32   53   36   29   37  ...  334.0  188.0   
    
                                                                      
                                                                      
    YEAR       2012   2013   2014   2015   2016   2017   2018   2019  
    COUNTY                                                            
    ADAIR      72.0   88.0   66.0   78.0   60.0   73.0   65.0   69.0  
    ALLEN       0.0    0.0    0.0   62.0   57.0   46.0   40.0  652.0  
    ANDERSON  360.0  242.0  274.0  198.0  361.0  297.0   53.0  162.0  
    BALLARD    54.0   62.0   52.0   54.0   62.0   42.0   45.0   44.0  
    BARREN     62.0   72.0   58.0   66.0   60.0   47.0   47.0  236.0  
    ...         ...    ...    ...    ...    ...    ...    ...    ...  
    WAYNE      69.0   81.0   74.0   72.0   72.0   56.0   56.0   72.0  
    WEBSTER    62.0   41.0   67.0   48.0   55.0   72.0   62.0   60.0  
    WHITLEY    56.0   42.0   18.0   38.0   46.0   10.0    0.0    0.0  
    WOLFE       0.0    0.0    0.0    0.0    0.0    0.0    0.0    0.0  
    WOODFORD  273.0  346.0  250.0  236.0  301.0  239.0  324.0  261.0  
    
    [117 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR             0             1             0             0   
    1       ALLEN             5             3             3            15   
    2    ANDERSON             0            12             1             1   
    3     BALLARD            58            36            11            58   
    4      BARREN            16            26            30            14   
    ..        ...           ...           ...           ...           ...   
    112     WAYNE            69            39            50            60   
    113   WEBSTER            40           102            58            41   
    114   WHITLEY             1             2             4             1   
    115     WOLFE             1             0             0             0   
    116  WOODFORD             5            12             2             4   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0               0             4             0             2             5   
    1               0            21            11             2             5   
    2               1             0             0             0             0   
    3              30            54            59            89           111   
    4              22            19            15            13             5   
    ..            ...           ...           ...           ...           ...   
    112            44           105            35            62            77   
    113            63           106            30            44            64   
    114             1             1             1             0             0   
    115             0             0             0             0             0   
    116            24            32            53            36            29   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...       86.0       88.0       72.0       88.0       66.0       78.0   
    1    ...      127.0       43.0        0.0        0.0        0.0       62.0   
    2    ...      290.0      367.0      360.0      242.0      274.0      198.0   
    3    ...       50.0       62.0       54.0       62.0       52.0       54.0   
    4    ...      234.0       85.0       62.0       72.0       58.0       66.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    112  ...       80.0       95.0       69.0       81.0       74.0       72.0   
    113  ...       69.0       36.0       62.0       41.0       67.0       48.0   
    114  ...       95.0        0.0       56.0       42.0       18.0       38.0   
    115  ...        0.0        0.0        0.0        0.0        0.0        0.0   
    116  ...      334.0      188.0      273.0      346.0      250.0      236.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0         60.0       73.0       65.0       69.0  
    1         57.0       46.0       40.0      652.0  
    2        361.0      297.0       53.0      162.0  
    3         62.0       42.0       45.0       44.0  
    4         60.0       47.0       47.0      236.0  
    ..         ...        ...        ...        ...  
    112       72.0       56.0       56.0       72.0  
    113       55.0       72.0       62.0       60.0  
    114       46.0       10.0        0.0        0.0  
    115        0.0        0.0        0.0        0.0  
    116      301.0      239.0      324.0      261.0  
    
    [117 rows x 121 columns]
    total number of records written to CSV: 117 
    
    

#### Soybeans, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
        Cat      Title       Break
        -------------------------------------
        VL       very low    P<= 5
        L        low         P>5 & P<=27
        M        medium      P>27 & P<=60
        H        high        P>60

#### Categories for K
        Cat      Title      Break
       --------------------------------------
        VL       very low   K< 100
        L        low        K>=100 & K <=190
        M        medium     K>=191 & K <=300
        H        high       K>300


```python
df_soy_nu['CAT_P'] = ''
df_soy_nu['CAT_P'] = np.where(df_soy_nu.P <= 5, 'VL', df_soy_nu.CAT_P)
df_soy_nu['CAT_P'] = np.where(((df_soy_nu.P > 5) & (df_soy_nu.P <= 27)), 'L', df_soy_nu.CAT_P)
df_soy_nu['CAT_P'] = np.where(((df_soy_nu.P > 27) & (df_soy_nu.P <= 60)), 'M', df_soy_nu.CAT_P)
df_soy_nu['CAT_P'] = np.where((df_soy_nu.P > 60), 'H', df_soy_nu.CAT_P)

df_soy_nu['CAT_K'] = ''
df_soy_nu['CAT_K'] = np.where(df_soy_nu.K <= 99, 'VL', df_soy_nu.CAT_K)
df_soy_nu['CAT_K'] = np.where(((df_soy_nu.K > 99) & (df_soy_nu.K <= 190)), 'L', df_soy_nu.CAT_K)
df_soy_nu['CAT_K'] = np.where(((df_soy_nu.K > 190) & (df_soy_nu.K <= 300)), 'M', df_soy_nu.CAT_K)
df_soy_nu['CAT_K'] = np.where((df_soy_nu.K > 300), 'H', df_soy_nu.CAT_K)

```


```python
warnings.filterwarnings("ignore")
df_soy_p = np.round( df_soy_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_soy_k = np.round( df_soy_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)
```


```python
df_soy_p.columns
df_soy_k.columns
df_soy_p.columns = list(map("_".join,df_soy_p.columns))
df_soy_k.columns = list(map("_".join,df_soy_k.columns))
df_soy_p.columns = df_soy_p.columns.str.replace("P_median_", "")
df_soy_p.columns = df_soy_p.columns.str.replace("P_len", "count")
df_soy_k.columns = df_soy_k.columns.str.replace("K_median_","")
df_soy_k.columns = df_soy_k.columns.str.replace("K_len","count")
df_soy_p = df_soy_p.reset_index()
df_soy_k = df_soy_k.reset_index()
file_out_p = fileOut.joinpath('soy_p_levels.csv')  # path and filename
df_soy_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('soy_k_levels.csv')  # path and filename
df_soy_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_soy_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_soy_k)),'\n')
```

    total number of records written to CSV: 117 
    
    total number of records written to CSV: 117 
    
    

## Canola

#### Create list to select Canola from database.


```python
canola_sel = ['Canola', 'Canola/Soybeans']
canola_sel.sort()
print(canola_sel)
```

    ['Canola', 'Canola/Soybeans']
    

#### Select Canola from dataset.


```python
df_canola = df[df.CROP.isin(canola_sel)]
df_canola_nu = df_canola[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_canola_nu.head())
```

          FIPS_NO     COUNTY  YEAR     P      K
    14175     101  HENDERSON  1991  29.0  200.0
    14176     101  HENDERSON  1991  36.0  163.0
    14177     101  HENDERSON  1991  43.0  250.0
    14178     101  HENDERSON  1991  25.0  163.0
    14179     101  HENDERSON  1991  36.0  158.0
    

### Calculate median for each year by County


```python
df_canola_median = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_canola_median)
print(df_canola_median.columns)
df_canola_median.columns = list(map("_".join,df_canola_median.columns))
df_canola_median.columns = df_canola_median.columns.str.replace("P_median_", "P_med")
df_canola_median.columns = df_canola_median.columns.str.replace("P_len", "P_count")
df_canola_median.columns = df_canola_median.columns.str.replace("K_median_","K_med")
df_canola_median.columns = df_canola_median.columns.str.replace("K_len","K_count")
print(df_canola_median.columns)
df_canola_median = df_canola_median.reset_index()
print(df_canola_median)
file_out_median = fileOut.joinpath('canola_median.csv')  # path and filename
df_canola_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_median)),'\n')
```

                  K                                               ...      P       \
                len                                               ... median        
    YEAR       1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010 2011   
    COUNTY                                                        ...               
    ALLEN         0    0    0    0    0    0    0    0    0    0  ...      0  0.0   
    BARREN        0    2    0    0    0    0    0    0    0    0  ...      0  0.0   
    BOONE         0    0    0    0    2    0    0    0    0    0  ...      0  0.0   
    BOURBON       1    0    0    0    0    0    0    0    0    0  ...      0  0.0   
    BOYLE         0    0    0    0    0    0    0    0    1    0  ...      0  0.0   
    ...         ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...  ...   
    WARREN        0    1    0    0    1    0    0    0    0    0  ...      0  0.0   
    WASHINGTON    0    0    0    0    0    0    0    0    1    0  ...      0  0.0   
    WAYNE         0    0    0    0    0    0    0    0    0    0  ...      0  0.0   
    WEBSTER       0    0    0    0    0    0    0    3    2    0  ...      0  0.0   
    WOODFORD      0    0    2    0    1    0    2    0    0    0  ...      0  0.0   
    
                                                        
                                                        
    YEAR       2012 2013 2014 2015 2016 2017 2018 2019  
    COUNTY                                              
    ALLEN         0  0.0  0.0   28  0.0    0    0    0  
    BARREN        0  0.0  0.0    0  0.0    0    0    0  
    BOONE         0  0.0  0.0    0  0.0    0   24    0  
    BOURBON       0  0.0  0.0    0  0.0    0    0    0  
    BOYLE         0  0.0  0.0    0  0.0    0    0    0  
    ...         ...  ...  ...  ...  ...  ...  ...  ...  
    WARREN        0  0.0  0.0    0  0.0   48    0    0  
    WASHINGTON    0  0.0  0.0    0  0.0    0    0    0  
    WAYNE         0  0.0  0.0    0  0.0    0    0    0  
    WEBSTER       0  0.0  0.0    0  0.0    0    0    0  
    WOODFORD      0  0.0  0.0    0  0.0    0    0    0  
    
    [65 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
            COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0        ALLEN             0             0             0             0   
    1       BARREN             0             2             0             0   
    2        BOONE             0             0             0             0   
    3      BOURBON             1             0             0             0   
    4        BOYLE             0             0             0             0   
    ..         ...           ...           ...           ...           ...   
    60      WARREN             0             1             0             0   
    61  WASHINGTON             0             0             0             0   
    62       WAYNE             0             0             0             0   
    63     WEBSTER             0             0             0             0   
    64    WOODFORD             0             0             2             0   
    
        K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  ...  \
    0              0             0             0             0             0  ...   
    1              0             0             0             0             0  ...   
    2              2             0             0             0             0  ...   
    3              0             0             0             0             0  ...   
    4              0             0             0             0             1  ...   
    ..           ...           ...           ...           ...           ...  ...   
    60             1             0             0             0             0  ...   
    61             0             0             0             0             1  ...   
    62             0             0             0             0             0  ...   
    63             0             0             0             3             2  ...   
    64             1             0             2             0             0  ...   
    
        P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0           0        0.0          0        0.0        0.0         28   
    1           0        0.0          0        0.0        0.0          0   
    2           0        0.0          0        0.0        0.0          0   
    3           0        0.0          0        0.0        0.0          0   
    4           0        0.0          0        0.0        0.0          0   
    ..        ...        ...        ...        ...        ...        ...   
    60          0        0.0          0        0.0        0.0          0   
    61          0        0.0          0        0.0        0.0          0   
    62          0        0.0          0        0.0        0.0          0   
    63          0        0.0          0        0.0        0.0          0   
    64          0        0.0          0        0.0        0.0          0   
    
        P_med2016  P_med2017  P_med2018  P_med2019  
    0         0.0          0          0          0  
    1         0.0          0          0          0  
    2         0.0          0         24          0  
    3         0.0          0          0          0  
    4         0.0          0          0          0  
    ..        ...        ...        ...        ...  
    60        0.0         48          0          0  
    61        0.0          0          0          0  
    62        0.0          0          0          0  
    63        0.0          0          0          0  
    64        0.0          0          0          0  
    
    [65 rows x 121 columns]
    total number of records written to CSV: 65 
    
    

#### Canola, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 10
    L        low         P>= 10 & P<=30
    M        medium      P>30 & P<=60
    H        high        P>60
    
#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 104
    L        low        K>=104 & K <=186
    M        medium     K>=187 & K <=300
    H        high       K>300


```python
df_canola_nu['CAT_P'] = ''
df_canola_nu['CAT_P'] = np.where(df_canola_nu.P < 10, 'VL', df_canola_nu.CAT_P)
df_canola_nu['CAT_P'] = np.where(((df_canola_nu.P > 10) & (df_canola_nu.P <= 30)), 'L', df_canola_nu.CAT_P)
df_canola_nu['CAT_P'] = np.where(((df_canola_nu.P > 30) & (df_canola_nu.P <= 60)), 'M', df_canola_nu.CAT_P)
df_canola_nu['CAT_P'] = np.where((df_canola_nu.P > 60), 'H', df_canola_nu.CAT_P)

df_canola_nu['CAT_K'] = ''
df_canola_nu['CAT_K'] = np.where(df_canola_nu.K < 104, 'VL', df_canola_nu.CAT_K)
df_canola_nu['CAT_K'] = np.where(((df_canola_nu.K > 104) & (df_canola_nu.K <= 186)), 'L', df_canola_nu.CAT_K)
df_canola_nu['CAT_K'] = np.where(((df_canola_nu.K > 186) & (df_canola_nu.K <= 300)), 'M', df_canola_nu.CAT_K)
df_canola_nu['CAT_K'] = np.where((df_canola_nu.K > 300), 'H', df_canola_nu.CAT_K)
```


```python
warnings.filterwarnings("ignore")
df_canola_p = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_canola_k = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)
```


```python
df_canola_p.columns
df_canola_k.columns
df_canola_p.columns = list(map("_".join,df_canola_p.columns))
df_canola_k.columns = list(map("_".join,df_canola_k.columns))
df_canola_p.columns = df_canola_p.columns.str.replace("P_median_", "")
df_canola_p.columns = df_canola_p.columns.str.replace("P_len", "count")
df_canola_k.columns = df_canola_k.columns.str.replace("K_median_","")
df_canola_k.columns = df_canola_k.columns.str.replace("K_len","count")
df_canola_p = df_canola_p.reset_index()
df_canola_k = df_canola_k.reset_index()
file_out_p = fileOut.joinpath('canola_p_levels.csv')  # path and filename
df_canola_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('canola_k_levels.csv')  # path and filename
df_canola_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_k)),'\n')
```

    total number of records written to CSV: 65 
    
    total number of records written to CSV: 65 
    
    

## Sorghum


```python

```

#### Create list to select Sorghum from database.


```python
sorghum_sel = ['Grain Sorghum']
sorghum_sel.sort()
print(sorghum_sel)
```

    ['Grain Sorghum']
    

#### Select Sorghum from dataset.


```python
df_sorghum = df[df.CROP.isin(sorghum_sel)]
df_sorghum_nu = df_sorghum[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_sorghum_nu.head())
```

          FIPS_NO     COUNTY  YEAR      P       K
    2237        1      ADAIR  1996   67.0   284.0
    2532        1      ADAIR  1997  318.0   303.0
    18439     101  HENDERSON  2007   42.0  1281.0
    18440     101  HENDERSON  2007  120.0  1499.0
    19885     101  HENDERSON  2014   48.0   110.0
    

### Calculate median for each year by County


```python
df_sorghum_median = np.round( df_sorghum_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_sorghum_median)
print(df_sorghum_median.columns)
df_sorghum_median.columns = list(map("_".join,df_sorghum_median.columns))
df_sorghum_median.columns = df_sorghum_median.columns.str.replace("P_median_", "P_med")
df_sorghum_median.columns = df_sorghum_median.columns.str.replace("P_len", "P_count")
df_sorghum_median.columns = df_sorghum_median.columns.str.replace("K_median_","K_med")
df_sorghum_median.columns = df_sorghum_median.columns.str.replace("K_len","K_count")
print(df_sorghum_median.columns)
df_sorghum_median = df_sorghum_median.reset_index()
print(df_sorghum_median)
file_out_median = fileOut.joinpath('sorghum_median.csv')  # path and filename
df_sorghum_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_sorghum_median)),'\n')
```

                  K                                               ...      P  \
                len                                               ... median   
    YEAR       1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   
    COUNTY                                                        ...          
    ADAIR         0    0    0    0    0    0    1    1    0    0  ...    0.0   
    ALLEN         0    0    0    0    0    0    0    0    0    0  ...    0.0   
    BALLARD      11    0    5    3    6    7    1    5    8    0  ...    0.0   
    BATH          0    0    0    0    0    0    0    0    0    0  ...   15.0   
    BELL          0    0    0    0    0    0    1    0    0    0  ...    0.0   
    ...         ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...   
    TRIGG         0    0    1    0    0    0    0    0    0    2  ...  141.0   
    UNION         0    1    0    0    0    0    0    0    0    0  ...    0.0   
    WASHINGTON    0    0    5    0    1    2    0    0    0    0  ...    0.0   
    WEBSTER       2    0    0    0    0    0    0    0    0    3  ...    0.0   
    WHITLEY       0    0    0    0    0    0    0    0    0    0  ...   20.0   
    
                                                                 
                                                                 
    YEAR        2011 2012  2013  2014 2015  2016 2017 2018 2019  
    COUNTY                                                       
    ADAIR        0.0    0   0.0   0.0    0   0.0  0.0    0    0  
    ALLEN        0.0    0   0.0   0.0    0   0.0  0.0    0    0  
    BALLARD      0.0    0   0.0   0.0    0   0.0  0.0    0    0  
    BATH        48.0    0   0.0   0.0   19   0.0  0.0  160    0  
    BELL         0.0    0   0.0   0.0    0   0.0  0.0    0    0  
    ...          ...  ...   ...   ...  ...   ...  ...  ...  ...  
    TRIGG        0.0   15   0.0   0.0  114   0.0  0.0    0    0  
    UNION       20.0   16  45.0   0.0    0   0.0  0.0    0    0  
    WASHINGTON   0.0    0   0.0   0.0    0   0.0  0.0    0    0  
    WEBSTER      0.0    0  61.0  33.0   62  63.0  0.0    0    0  
    WHITLEY      0.0    0   0.0   0.0    0   0.0  0.0    0    0  
    
    [73 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
            COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0        ADAIR             0             0             0             0   
    1        ALLEN             0             0             0             0   
    2      BALLARD            11             0             5             3   
    3         BATH             0             0             0             0   
    4         BELL             0             0             0             0   
    ..         ...           ...           ...           ...           ...   
    68       TRIGG             0             0             1             0   
    69       UNION             0             1             0             0   
    70  WASHINGTON             0             0             5             0   
    71     WEBSTER             2             0             0             0   
    72     WHITLEY             0             0             0             0   
    
        K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  ...  \
    0              0             0             1             1             0  ...   
    1              0             0             0             0             0  ...   
    2              6             7             1             5             8  ...   
    3              0             0             0             0             0  ...   
    4              0             0             1             0             0  ...   
    ..           ...           ...           ...           ...           ...  ...   
    68             0             0             0             0             0  ...   
    69             0             0             0             0             0  ...   
    70             1             2             0             0             0  ...   
    71             0             0             0             0             0  ...   
    72             0             0             0             0             0  ...   
    
        P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0         0.0        0.0          0        0.0        0.0          0   
    1         0.0        0.0          0        0.0        0.0          0   
    2         0.0        0.0          0        0.0        0.0          0   
    3        15.0       48.0          0        0.0        0.0         19   
    4         0.0        0.0          0        0.0        0.0          0   
    ..        ...        ...        ...        ...        ...        ...   
    68      141.0        0.0         15        0.0        0.0        114   
    69        0.0       20.0         16       45.0        0.0          0   
    70        0.0        0.0          0        0.0        0.0          0   
    71        0.0        0.0          0       61.0       33.0         62   
    72       20.0        0.0          0        0.0        0.0          0   
    
        P_med2016  P_med2017  P_med2018  P_med2019  
    0         0.0        0.0          0          0  
    1         0.0        0.0          0          0  
    2         0.0        0.0          0          0  
    3         0.0        0.0        160          0  
    4         0.0        0.0          0          0  
    ..        ...        ...        ...        ...  
    68        0.0        0.0          0          0  
    69        0.0        0.0          0          0  
    70        0.0        0.0          0          0  
    71       63.0        0.0          0          0  
    72        0.0        0.0          0          0  
    
    [73 rows x 121 columns]
    total number of records written to CSV: 73 
    
    

#### Sorghum, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 6
    L        low         P>= 6 & P<=27
    M        medium      P>27 & P<=60
    H        high        P>60
    
#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 100
    L        low        K>=100 & K <=190
    M        medium     K>=191 & K <=300
    H        high       K>300


```python
df_sorghum_nu['CAT_P'] = ''
df_sorghum_nu['CAT_P'] = np.where(df_sorghum_nu.P < 6, 'VL', df_sorghum_nu.CAT_P)
df_sorghum_nu['CAT_P'] = np.where(((df_sorghum_nu.P >= 6) & (df_sorghum_nu.P <= 27)), 'L', df_sorghum_nu.CAT_P)
df_sorghum_nu['CAT_P'] = np.where(((df_sorghum_nu.P > 27) & (df_sorghum_nu.P <= 60)), 'M', df_sorghum_nu.CAT_P)
df_sorghum_nu['CAT_P'] = np.where((df_sorghum_nu.P > 60), 'H', df_sorghum_nu.CAT_P)

df_sorghum_nu['CAT_K'] = ''
df_sorghum_nu['CAT_K'] = np.where(df_sorghum_nu.K < 100, 'VL', df_sorghum_nu.CAT_K)
df_sorghum_nu['CAT_K'] = np.where(((df_sorghum_nu.K >= 100) & (df_sorghum_nu.K <= 190)), 'L', df_sorghum_nu.CAT_K)
df_sorghum_nu['CAT_K'] = np.where(((df_sorghum_nu.K > 190) & (df_sorghum_nu.K <= 300)), 'M', df_sorghum_nu.CAT_K)
df_sorghum_nu['CAT_K'] = np.where((df_sorghum_nu.K > 300), 'H', df_sorghum_nu.CAT_K)
```


```python
warnings.filterwarnings("ignore")
df_sorghum_p = np.round( df_sorghum_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_sorghum_k = np.round( df_sorghum_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)

df_sorghum_p.columns
df_sorghum_k.columns
df_sorghum_p.columns = list(map("_".join,df_sorghum_p.columns))
df_sorghum_k.columns = list(map("_".join,df_sorghum_k.columns))
df_sorghum_p.columns = df_sorghum_p.columns.str.replace("P_median_", "")
df_sorghum_p.columns = df_sorghum_p.columns.str.replace("P_len", "count")
df_sorghum_k.columns = df_sorghum_k.columns.str.replace("K_median_","")
df_sorghum_k.columns = df_sorghum_k.columns.str.replace("K_len","count")
df_sorghum_p = df_sorghum_p.reset_index()
df_sorghum_k = df_sorghum_k.reset_index()
file_out_p = fileOut.joinpath('sorghum_p_levels.csv')  # path and filename
df_sorghum_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('sorghum_k_levels.csv')  # path and filename
df_sorghum_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_sorghum_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_sorghum_k)),'\n')
```

    total number of records written to CSV: 73 
    
    total number of records written to CSV: 73 
    
    


```python

```

## Small Grains

#### Create list to select Small Grains from database.


```python
smallgrains_sel = ['Barley' , 'Barley/Soybeans', 'Grain Crops (multiple)','Oats','Oats/Soybeans', 'Rye/Soybeans', 'Small Grains', 'Small Grains/Corn', 'Small Grains/Soybeans', 'Triticale', 'Triticale/Soybeans', 'Wheat', 'Wheat/Corn', 'Wheat/Soybeans']
smallgrains_sel.sort()
print(smallgrains_sel)
```

    ['Barley', 'Barley/Soybeans', 'Grain Crops (multiple)', 'Oats', 'Oats/Soybeans', 'Rye/Soybeans', 'Small Grains', 'Small Grains/Corn', 'Small Grains/Soybeans', 'Triticale', 'Triticale/Soybeans', 'Wheat', 'Wheat/Corn', 'Wheat/Soybeans']
    

#### Select Small Grains from dataset.


```python
df_smallgrains = df[df.CROP.isin(smallgrains_sel)]
df_smallgrains_nu = df_smallgrains[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_smallgrains_nu.head())
```

         FIPS_NO COUNTY  YEAR     P      K
    635        1  ADAIR  1991  16.0  234.0
    901        1  ADAIR  1992  51.0  203.0
    969        1  ADAIR  1992  29.0  152.0
    970        1  ADAIR  1992  15.0  193.0
    1333       1  ADAIR  1993  16.0   94.0
    

### Calculate median for each year by County.


```python
df_smallgrains_median = np.round( df_smallgrains_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_smallgrains_median)
print(df_smallgrains_median.columns)
df_smallgrains_median.columns = list(map("_".join,df_smallgrains_median.columns))
df_smallgrains_median.columns = df_smallgrains_median.columns.str.replace("P_median_", "P_med")
df_smallgrains_median.columns = df_smallgrains_median.columns.str.replace("P_len", "P_count")
df_smallgrains_median.columns = df_smallgrains_median.columns.str.replace("K_median_","K_med")
df_smallgrains_median.columns = df_smallgrains_median.columns.str.replace("K_len","K_count")
print(df_smallgrains_median.columns)
df_smallgrains_median = df_smallgrains_median.reset_index()
print(df_smallgrains_median)
file_out_median = fileOut.joinpath('smallgrains_median.csv')  # path and filename
df_smallgrains_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_smallgrains_median)),'\n')

```

                K                                               ...      P         \
              len                                               ... median          
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   2011   
    COUNTY                                                      ...                 
    ADAIR       0    1    3    1    1   11   19   18    6    9  ...   92.0  202.0   
    ALLEN      15    5    0   10    6    7    3    4    0    2  ...   39.0   53.0   
    ANDERSON    0    1    1    0    0    0    1    0    0    0  ...   62.0    0.0   
    BALLARD    35   11    5   13   19   13   22   23   31   46  ...  186.0    0.0   
    BARREN     11    6   11    7   33   41    7    6    0    5  ...  246.0    0.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...    ...   
    WAYNE      24   17   10   31   29   21   30   30   54   30  ...  137.0  151.0   
    WEBSTER    79  195  117   50   50   66   13   11    2   34  ...    0.0    0.0   
    WHITLEY     0    2    0    0    2    0    1    0    1    1  ...    0.0    0.0   
    WOLFE       2    1    0    0    1    1    1    0    0    1  ...    0.0    0.0   
    WOODFORD   10    6    4    5   15   51   39    6    8   24  ...  362.0  138.0   
    
                                                                      
                                                                      
    YEAR       2012   2013   2014   2015   2016   2017   2018   2019  
    COUNTY                                                            
    ADAIR      47.0  116.0   38.0  115.0  264.0   33.0  539.0  215.0  
    ALLEN      66.0  138.0   94.0   77.0  119.0   43.0   93.0  192.0  
    ANDERSON  368.0    0.0  232.0   36.0  180.0  414.0   69.0  270.0  
    BALLARD    67.0   80.0   82.0   63.0   39.0   74.0    0.0   58.0  
    BARREN    339.0   34.0   64.0   94.0  128.0   50.0   63.0   23.0  
    ...         ...    ...    ...    ...    ...    ...    ...    ...  
    WAYNE     163.0  112.0  151.0  103.0  110.0   52.0   27.0   56.0  
    WEBSTER     0.0   42.0    0.0    0.0    0.0    0.0   56.0   53.0  
    WHITLEY     0.0  184.0    0.0   36.0    9.0    0.0    0.0   16.0  
    WOLFE       0.0    0.0    0.0    0.0    0.0    0.0    0.0    0.0  
    WOODFORD  202.0  241.0  283.0  207.0  430.0  100.0   42.0   56.0  
    
    [119 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR             0             1             3             1   
    1       ALLEN            15             5             0            10   
    2    ANDERSON             0             1             1             0   
    3     BALLARD            35            11             5            13   
    4      BARREN            11             6            11             7   
    ..        ...           ...           ...           ...           ...   
    114     WAYNE            24            17            10            31   
    115   WEBSTER            79           195           117            50   
    116   WHITLEY             0             2             0             0   
    117     WOLFE             2             1             0             0   
    118  WOODFORD            10             6             4             5   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0               1            11            19            18             6   
    1               6             7             3             4             0   
    2               0             0             1             0             0   
    3              19            13            22            23            31   
    4              33            41             7             6             0   
    ..            ...           ...           ...           ...           ...   
    114            29            21            30            30            54   
    115            50            66            13            11             2   
    116             2             0             1             0             1   
    117             1             1             1             0             0   
    118            15            51            39             6             8   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...       92.0      202.0       47.0      116.0       38.0      115.0   
    1    ...       39.0       53.0       66.0      138.0       94.0       77.0   
    2    ...       62.0        0.0      368.0        0.0      232.0       36.0   
    3    ...      186.0        0.0       67.0       80.0       82.0       63.0   
    4    ...      246.0        0.0      339.0       34.0       64.0       94.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    114  ...      137.0      151.0      163.0      112.0      151.0      103.0   
    115  ...        0.0        0.0        0.0       42.0        0.0        0.0   
    116  ...        0.0        0.0        0.0      184.0        0.0       36.0   
    117  ...        0.0        0.0        0.0        0.0        0.0        0.0   
    118  ...      362.0      138.0      202.0      241.0      283.0      207.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0        264.0       33.0      539.0      215.0  
    1        119.0       43.0       93.0      192.0  
    2        180.0      414.0       69.0      270.0  
    3         39.0       74.0        0.0       58.0  
    4        128.0       50.0       63.0       23.0  
    ..         ...        ...        ...        ...  
    114      110.0       52.0       27.0       56.0  
    115        0.0        0.0       56.0       53.0  
    116        9.0        0.0        0.0       16.0  
    117        0.0        0.0        0.0        0.0  
    118      430.0      100.0       42.0       56.0  
    
    [119 rows x 121 columns]
    total number of records written to CSV: 119 
    
    

#### Small Grains, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 10
    L        low         P>= 10 & P<=30
    M        medium      P>30 & P<=60
    H        high        P>60
    
#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 104
    L        low        K>=104 & K <=186
    M        medium     K>=187 & K <=300
    H        high       K>300


```python
df_smallgrains_nu['CAT_P'] = ''
df_smallgrains_nu['CAT_P'] = np.where(df_smallgrains_nu.P < 10, 'VL', df_smallgrains_nu.CAT_P)
df_smallgrains_nu['CAT_P'] = np.where(((df_smallgrains_nu.P > 10) & (df_smallgrains_nu.P <= 30)), 'L', df_smallgrains_nu.CAT_P)
df_smallgrains_nu['CAT_P'] = np.where(((df_smallgrains_nu.P > 30) & (df_smallgrains_nu.P <= 60)), 'M', df_smallgrains_nu.CAT_P)
df_smallgrains_nu['CAT_P'] = np.where((df_smallgrains_nu.P > 60), 'H', df_smallgrains_nu.CAT_P)

df_smallgrains_nu['CAT_K'] = ''
df_smallgrains_nu['CAT_K'] = np.where(df_smallgrains_nu.K < 104, 'VL', df_smallgrains_nu.CAT_K)
df_smallgrains_nu['CAT_K'] = np.where(((df_smallgrains_nu.K >= 104) & (df_smallgrains_nu.K <= 186)), 'L', df_smallgrains_nu.CAT_K)
df_smallgrains_nu['CAT_K'] = np.where(((df_smallgrains_nu.K > 186) & (df_smallgrains_nu.K <= 300)), 'M', df_smallgrains_nu.CAT_K)
df_smallgrains_nu['CAT_K'] = np.where((df_smallgrains_nu.K > 300), 'H', df_smallgrains_nu.CAT_K)
```


```python
warnings.filterwarnings("ignore")
df_smallgrains_p = np.round( df_smallgrains_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_smallgrains_k = np.round( df_smallgrains_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)

df_smallgrains_p.columns
df_smallgrains_k.columns
df_smallgrains_p.columns = list(map("_".join,df_smallgrains_p.columns))
df_smallgrains_k.columns = list(map("_".join,df_smallgrains_k.columns))
df_smallgrains_p.columns = df_smallgrains_p.columns.str.replace("P_median_", "")
df_smallgrains_p.columns = df_smallgrains_p.columns.str.replace("P_len", "count")
df_smallgrains_k.columns = df_smallgrains_k.columns.str.replace("K_median_","")
df_smallgrains_k.columns = df_smallgrains_k.columns.str.replace("K_len","count")
df_smallgrains_p = df_smallgrains_p.reset_index()
df_smallgrains_k = df_smallgrains_k.reset_index()
file_out_p = fileOut.joinpath('smallgrains_p_levels.csv')  # path and filename
df_smallgrains_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('smallgrains_k_levels.csv')  # path and filename
df_smallgrains_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_smallgrains_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_smallgrains_k)),'\n')


```

    total number of records written to CSV: 119 
    
    total number of records written to CSV: 119 
    
    

## Tobacco

#### Create list to select Tobacco from database.


```python
tobacco_sel = ['Burley Tobacco', 'Dark Tobacco']
tobacco_sel.sort()
print(tobacco_sel)
```

    ['Burley Tobacco', 'Dark Tobacco']
    

#### Select Tobacco from dataset.


```python
df_tobacco = df[df.CROP.isin(tobacco_sel)]
df_tobacco_nu = df_tobacco[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_tobacco_nu.head())
```

       FIPS_NO COUNTY  YEAR      P      K
    24       1  ADAIR  1990  282.0  298.0
    25       1  ADAIR  1990  206.0  611.0
    26       1  ADAIR  1990   71.0  120.0
    27       1  ADAIR  1990  124.0  320.0
    28       1  ADAIR  1990  300.0  283.0
    

### Calculate median for each year by County.


```python
df_tobacco_median = np.round( df_tobacco_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_tobacco_median)
print(df_tobacco_median.columns)
df_tobacco_median.columns = list(map("_".join,df_tobacco_median.columns))
df_tobacco_median.columns = df_tobacco_median.columns.str.replace("P_median_", "P_med")
df_tobacco_median.columns = df_tobacco_median.columns.str.replace("P_len", "P_count")
df_tobacco_median.columns = df_tobacco_median.columns.str.replace("K_median_","K_med")
df_tobacco_median.columns = df_tobacco_median.columns.str.replace("K_len","K_count")
print(df_tobacco_median.columns)
df_tobacco_median = df_tobacco_median.reset_index()
print(df_tobacco_median)
file_out_median = fileOut.joinpath('tobacco_median.csv')  # path and filename
df_tobacco_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_tobacco_median)),'\n')
```

                K                                               ...      P         \
              len                                               ... median          
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   2011   
    COUNTY                                                      ...                 
    ADAIR      69   86  100   89   53   80  111  116   79  103  ...  139.0  156.0   
    ALLEN      80   90   82   69   43   22   40   25   27   10  ...  151.0   72.0   
    ANDERSON  122  137  116   84   71   56   73   68   88   52  ...  355.0  284.0   
    BALLARD    43   51   80   58   36   49   60   69   84   97  ...  145.0    0.0   
    BARREN    167  176  291  291  187  147  111   92   45   37  ...  144.0   60.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...    ...   
    WAYNE     102   98  119   95   62   87   73  158  100   92  ...  126.0  135.0   
    WEBSTER     4   16   16    6   10   15   12   10   12   16  ...   82.0   85.0   
    WHITLEY    37   63   75   39   22   21   29   36   39   42  ...   74.0   46.0   
    WOLFE      99   92   90   59   35   32   43   61   71   54  ...  322.0  395.0   
    WOODFORD  320  375  194  162  129  176  160  187  199  151  ...  308.0  243.0   
    
                                                                      
                                                                      
    YEAR       2012   2013   2014   2015   2016   2017   2018   2019  
    COUNTY                                                            
    ADAIR     115.0  128.0  139.0  200.0  270.0  196.0  157.0  521.0  
    ALLEN      57.0   59.0   66.0    0.0  138.0    0.0   52.0    0.0  
    ANDERSON  292.0  344.0  369.0  244.0  146.0  233.0  455.0  450.0  
    BALLARD    42.0  222.0  332.0  152.0  121.0  137.0  204.0    0.0  
    BARREN    130.0   35.0   88.0   84.0  122.0   89.0  170.0  159.0  
    ...         ...    ...    ...    ...    ...    ...    ...    ...  
    WAYNE     111.0   86.0   98.0  149.0  140.0  145.0  108.0   86.0  
    WEBSTER    86.0  134.0  110.0   75.0  144.0   61.0   70.0  148.0  
    WHITLEY     0.0  367.0    0.0    0.0    0.0    0.0    0.0    0.0  
    WOLFE     496.0  446.0  361.0  592.0    0.0    0.0  471.0    0.0  
    WOODFORD  238.0  320.0  352.0  292.0  278.0  303.0  297.0  276.0  
    
    [120 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR            69            86           100            89   
    1       ALLEN            80            90            82            69   
    2    ANDERSON           122           137           116            84   
    3     BALLARD            43            51            80            58   
    4      BARREN           167           176           291           291   
    ..        ...           ...           ...           ...           ...   
    115     WAYNE           102            98           119            95   
    116   WEBSTER             4            16            16             6   
    117   WHITLEY            37            63            75            39   
    118     WOLFE            99            92            90            59   
    119  WOODFORD           320           375           194           162   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0              53            80           111           116            79   
    1              43            22            40            25            27   
    2              71            56            73            68            88   
    3              36            49            60            69            84   
    4             187           147           111            92            45   
    ..            ...           ...           ...           ...           ...   
    115            62            87            73           158           100   
    116            10            15            12            10            12   
    117            22            21            29            36            39   
    118            35            32            43            61            71   
    119           129           176           160           187           199   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...      139.0      156.0      115.0      128.0      139.0      200.0   
    1    ...      151.0       72.0       57.0       59.0       66.0        0.0   
    2    ...      355.0      284.0      292.0      344.0      369.0      244.0   
    3    ...      145.0        0.0       42.0      222.0      332.0      152.0   
    4    ...      144.0       60.0      130.0       35.0       88.0       84.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    115  ...      126.0      135.0      111.0       86.0       98.0      149.0   
    116  ...       82.0       85.0       86.0      134.0      110.0       75.0   
    117  ...       74.0       46.0        0.0      367.0        0.0        0.0   
    118  ...      322.0      395.0      496.0      446.0      361.0      592.0   
    119  ...      308.0      243.0      238.0      320.0      352.0      292.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0        270.0      196.0      157.0      521.0  
    1        138.0        0.0       52.0        0.0  
    2        146.0      233.0      455.0      450.0  
    3        121.0      137.0      204.0        0.0  
    4        122.0       89.0      170.0      159.0  
    ..         ...        ...        ...        ...  
    115      140.0      145.0      108.0       86.0  
    116      144.0       61.0       70.0      148.0  
    117        0.0        0.0        0.0        0.0  
    118        0.0        0.0      471.0        0.0  
    119      278.0      303.0      297.0      276.0  
    
    [120 rows x 121 columns]
    total number of records written to CSV: 120 
    
    

#### Tobacco, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.
Combined Burley and Dark Tobacco K into Burley recommendations for K categories.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 7
    L        low         P>= 7 & P<=28
    M        medium      P>28 & P<=57
    H        high        P>57 & P<=79
    VH       very high   P> 80
    

#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 96
    L        low        K>=96 & K <=205
    M        medium     K>205 & K <=303
    H        high       K>303 & K <=449
    VH       very high  K> 450


```python
df_tobacco_nu['CAT_P'] = ''
df_tobacco_nu['CAT_P'] = np.where(df_tobacco_nu.P < 7, 'VL', df_tobacco_nu.CAT_P)
df_tobacco_nu['CAT_P'] = np.where(((df_tobacco_nu.P >= 7) & (df_tobacco_nu.P <= 28)), 'L', df_tobacco_nu.CAT_P)
df_tobacco_nu['CAT_P'] = np.where(((df_tobacco_nu.P > 28) & (df_tobacco_nu.P <= 57)), 'M', df_tobacco_nu.CAT_P)
df_tobacco_nu['CAT_P'] = np.where(((df_tobacco_nu.P > 57) &  (df_tobacco_nu.P <= 79)), 'H', df_tobacco_nu.CAT_P)
df_tobacco_nu['CAT_P'] = np.where(df_tobacco_nu.P > 80, 'VH', df_tobacco_nu.CAT_P)
df_tobacco_nu['CAT_K'] = ''
df_tobacco_nu['CAT_K'] = np.where(df_tobacco_nu.K < 96, 'VL', df_tobacco_nu.CAT_K)
df_tobacco_nu['CAT_K'] = np.where(((df_tobacco_nu.K >= 96) & (df_tobacco_nu.K <= 205)), 'L', df_tobacco_nu.CAT_K)
df_tobacco_nu['CAT_K'] = np.where(((df_tobacco_nu.K > 205) & (df_tobacco_nu.K <= 303)), 'M', df_tobacco_nu.CAT_K)
df_tobacco_nu['CAT_K'] = np.where(((df_tobacco_nu.K > 303) & (df_tobacco_nu.K <= 449)), 'H', df_tobacco_nu.CAT_K)
df_tobacco_nu['CAT_K'] = np.where(df_tobacco_nu.K > 450, 'VH', df_tobacco_nu.CAT_K)

```


```python
warnings.filterwarnings("ignore")
df_tobacco_p = np.round( df_tobacco_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_tobacco_k = np.round( df_tobacco_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)

df_tobacco_p.columns
df_tobacco_k.columns
df_tobacco_p.columns = list(map("_".join,df_tobacco_p.columns))
df_tobacco_k.columns = list(map("_".join,df_tobacco_k.columns))
df_tobacco_p.columns = df_tobacco_p.columns.str.replace("P_median_", "")
df_tobacco_p.columns = df_tobacco_p.columns.str.replace("P_len", "count")
df_tobacco_k.columns = df_tobacco_k.columns.str.replace("K_median_","")
df_tobacco_k.columns = df_tobacco_k.columns.str.replace("K_len","count")
df_tobacco_p = df_tobacco_p.reset_index()
df_tobacco_k = df_tobacco_k.reset_index()
file_out_p = fileOut.joinpath('tobacco_p_levels.csv')  # path and filename
df_tobacco_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('tobacco_k_levels.csv')  # path and filename
df_tobacco_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_tobacco_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_tobacco_k)),'\n')
```

    total number of records written to CSV: 120 
    
    total number of records written to CSV: 120 
    
    

## Warm Season Grass

#### Create list to select Warm Season Grass from database.


```python
warmseason_sel = ['Bermudagrass', 'Bermudagrass, common', 'Bermudagrass, improved', 'Bluestem', 'Indiangrass', 'Millet', 'Sorghum Sudangrass', 'Sorghum/Sudangras', 'Sudangrass', 'Switchgrass', 'Warm Season Annual Grass', 'Warm Season Grass', 'Warm Season Native Grass', 'Zoyiagrass', 'Zoysiagrass']
warmseason_sel.sort()
print(warmseason_sel)
```

    ['Bermudagrass', 'Bermudagrass, common', 'Bermudagrass, improved', 'Bluestem', 'Indiangrass', 'Millet', 'Sorghum Sudangrass', 'Sorghum/Sudangras', 'Sudangrass', 'Switchgrass', 'Warm Season Annual Grass', 'Warm Season Grass', 'Warm Season Native Grass', 'Zoyiagrass', 'Zoysiagrass']
    

#### Select Warm Season Grass from dataset.


```python
 df_warmseason = df[df.CROP.isin(warmseason_sel)]
 df_warmseason_nu = df_warmseason[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
 print(df_warmseason_nu.head())
```

         FIPS_NO COUNTY  YEAR     P      K
    968        1  ADAIR  1992  89.0  194.0
    1564       1  ADAIR  1994  93.0  153.0
    1887       1  ADAIR  1995  26.0  178.0
    2266       1  ADAIR  1996  58.0  129.0
    2606       1  ADAIR  1997  94.0  214.0
    

### Calculate median by year for each County.


```python
df_warmseason_median = np.round( df_warmseason_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_warmseason_median)
print(df_warmseason_median.columns)
df_warmseason_median.columns = list(map("_".join,df_warmseason_median.columns))
df_warmseason_median.columns = df_warmseason_median.columns.str.replace("P_median_", "P_med")
df_warmseason_median.columns = df_warmseason_median.columns.str.replace("P_len", "P_count")
df_warmseason_median.columns = df_warmseason_median.columns.str.replace("K_median_","K_med")
df_warmseason_median.columns = df_warmseason_median.columns.str.replace("K_len","K_count")
print(df_warmseason_median.columns)
df_warmseason_median = df_warmseason_median.reset_index()
print(df_warmseason_median)
file_out_median = fileOut.joinpath('warmseason_median.csv')  # path and filename
df_warmseason_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_warmseason_median)),'\n')
```

                K                                               ...      P  \
              len                                               ... median   
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   
    COUNTY                                                      ...          
    ADAIR       0    0    1    0    1    1    1    1    2    4  ...    0.0   
    ALLEN       3    1    0    0    1    0    0    0    2    2  ...   89.0   
    ANDERSON    0    0    0    0    0    0    0    3    0    0  ...  128.0   
    BALLARD     1    0    0    1    2    1    0    0    1    2  ...   34.0   
    BARREN      3    2    3   12    2    5    4    0    1    0  ...   64.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...   
    WAYNE       0    0    0    1    0    0    0    0    1    0  ...  224.0   
    WEBSTER     0    1    0    0    0    0    0    0   20   19  ...   19.0   
    WHITLEY     0    0    0    0    0    0    0    0    1    1  ...    0.0   
    WOLFE       0    0    0    0    0    0    0    0    0    1  ...    0.0   
    WOODFORD    2    0   20    5    6    6    1    1    8    0  ...  309.0   
    
                                                                               
                                                                               
    YEAR        2011   2012   2013   2014    2015   2016   2017   2018   2019  
    COUNTY                                                                     
    ADAIR        0.0   22.0    0.0  148.0     0.0    0.0   52.0  152.0  206.0  
    ALLEN       66.0   76.0  108.0  108.0    58.0   47.0  205.0  137.0   51.0  
    ANDERSON    83.0   76.0   25.0   32.0     0.0  169.0   46.0  158.0  101.0  
    BALLARD     47.0   73.0   44.0    0.0   111.0    0.0    0.0    0.0    0.0  
    BARREN      33.0   36.0    0.0   54.0    56.0    0.0   55.0   47.0   12.0  
    ...          ...    ...    ...    ...     ...    ...    ...    ...    ...  
    WAYNE     1070.0  170.0  131.0  358.0   169.0    0.0   75.0    0.0  254.0  
    WEBSTER      0.0   67.0    0.0   60.0    61.0   35.0    0.0    0.0    0.0  
    WHITLEY      0.0    0.0   49.0    9.0  1126.0   15.0   38.0  246.0   75.0  
    WOLFE        0.0    0.0    0.0    0.0     0.0    0.0    0.0    0.0    0.0  
    WOODFORD   326.0   68.0  530.0   50.0   296.0  316.0  374.0  357.0  343.0  
    
    [116 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR             0             0             1             0   
    1       ALLEN             3             1             0             0   
    2    ANDERSON             0             0             0             0   
    3     BALLARD             1             0             0             1   
    4      BARREN             3             2             3            12   
    ..        ...           ...           ...           ...           ...   
    111     WAYNE             0             0             0             1   
    112   WEBSTER             0             1             0             0   
    113   WHITLEY             0             0             0             0   
    114     WOLFE             0             0             0             0   
    115  WOODFORD             2             0            20             5   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0               1             1             1             1             2   
    1               1             0             0             0             2   
    2               0             0             0             3             0   
    3               2             1             0             0             1   
    4               2             5             4             0             1   
    ..            ...           ...           ...           ...           ...   
    111             0             0             0             0             1   
    112             0             0             0             0            20   
    113             0             0             0             0             1   
    114             0             0             0             0             0   
    115             6             6             1             1             8   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...        0.0        0.0       22.0        0.0      148.0        0.0   
    1    ...       89.0       66.0       76.0      108.0      108.0       58.0   
    2    ...      128.0       83.0       76.0       25.0       32.0        0.0   
    3    ...       34.0       47.0       73.0       44.0        0.0      111.0   
    4    ...       64.0       33.0       36.0        0.0       54.0       56.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    111  ...      224.0     1070.0      170.0      131.0      358.0      169.0   
    112  ...       19.0        0.0       67.0        0.0       60.0       61.0   
    113  ...        0.0        0.0        0.0       49.0        9.0     1126.0   
    114  ...        0.0        0.0        0.0        0.0        0.0        0.0   
    115  ...      309.0      326.0       68.0      530.0       50.0      296.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0          0.0       52.0      152.0      206.0  
    1         47.0      205.0      137.0       51.0  
    2        169.0       46.0      158.0      101.0  
    3          0.0        0.0        0.0        0.0  
    4          0.0       55.0       47.0       12.0  
    ..         ...        ...        ...        ...  
    111        0.0       75.0        0.0      254.0  
    112       35.0        0.0        0.0        0.0  
    113       15.0       38.0      246.0       75.0  
    114        0.0        0.0        0.0        0.0  
    115      316.0      374.0      357.0      343.0  
    
    [116 rows x 121 columns]
    total number of records written to CSV: 116 
    
    

#### Warm Season Grass, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 10
    L        low         P>= 10 & P<=30
    M        medium      P>30 & P<=60
    H        high        P>60
    
#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 100
    L        low        K>=100 & K <=204
    M        medium     K>=205 & K <=300
    H        high       K>300


```python
df_warmseason_nu['CAT_P'] = ''
df_warmseason_nu['CAT_P'] = np.where(df_warmseason_nu.P < 10, 'VL', df_warmseason_nu.CAT_P)
df_warmseason_nu['CAT_P'] = np.where(((df_warmseason_nu.P > 10) & (df_warmseason_nu.P <= 30)), 'L', df_warmseason_nu.CAT_P)
df_warmseason_nu['CAT_P'] = np.where(((df_warmseason_nu.P > 30) & (df_warmseason_nu.P <= 60)), 'M', df_warmseason_nu.CAT_P)
df_warmseason_nu['CAT_P'] = np.where((df_warmseason_nu.P > 60), 'H', df_warmseason_nu.CAT_P)
 
df_warmseason_nu['CAT_K'] = ''
df_warmseason_nu['CAT_K'] = np.where(df_warmseason_nu.K < 100, 'VL', df_warmseason_nu.CAT_K)
df_warmseason_nu['CAT_K'] = np.where(((df_warmseason_nu.K >= 100) & (df_warmseason_nu.K <= 204)), 'L', df_warmseason_nu.CAT_K)
df_warmseason_nu['CAT_K'] = np.where(((df_warmseason_nu.K > 204) & (df_warmseason_nu.K <= 300)), 'M', df_warmseason_nu.CAT_K)
df_warmseason_nu['CAT_K'] = np.where((df_warmseason_nu.K > 300), 'H', df_warmseason_nu.CAT_K)
```


```python
warnings.filterwarnings("ignore")
df_warmseason_p = np.round( df_warmseason_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_warmseason_k = np.round( df_warmseason_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)
 
df_warmseason_p.columns
df_warmseason_k.columns
df_warmseason_p.columns = list(map("_".join,df_warmseason_p.columns))
df_warmseason_k.columns = list(map("_".join,df_warmseason_k.columns))
df_warmseason_p.columns = df_warmseason_p.columns.str.replace("P_median_", "")
df_warmseason_p.columns = df_warmseason_p.columns.str.replace("P_len", "count")
df_warmseason_k.columns = df_warmseason_k.columns.str.replace("K_median_","")
df_warmseason_k.columns = df_warmseason_k.columns.str.replace("K_len","count")
df_warmseason_p = df_warmseason_p.reset_index()
df_warmseason_k = df_warmseason_k.reset_index()
file_out_p = fileOut.joinpath('warmseason_p_levels.csv')  # path and filename
df_warmseason_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('warmseason_k_levels.csv')  # path and filename
df_warmseason_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_warmseason_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_warmseason_k)),'\n')

```

    total number of records written to CSV: 116 
    
    total number of records written to CSV: 116 
    
    

## Cool Season Grass

#### Create list to select Cool Season Grass from database.


```python
coolseason_sel = ['Bluegrass', 'Cool Season Grass', 'Fescue', 'Fescue/Lespedeza', 'Fescue/Lespedeza (multiple)', 'Fine Fescue', 'Lespedeza', 'Lespedeza/Grass', 'Millet', 'Orchardgrass', 'Perennial Ryegrass', 'Sorghum Sudangrass', 'Sorghum/Sudangras', 'Switchgrass', 'Tall Fescue', 'Timothy']
coolseason_sel.sort()
print(coolseason_sel)
```

    ['Bluegrass', 'Cool Season Grass', 'Fescue', 'Fescue/Lespedeza', 'Fescue/Lespedeza (multiple)', 'Fine Fescue', 'Lespedeza', 'Lespedeza/Grass', 'Millet', 'Orchardgrass', 'Perennial Ryegrass', 'Sorghum Sudangrass', 'Sorghum/Sudangras', 'Switchgrass', 'Tall Fescue', 'Timothy']
    

#### Select Cool Season Grass from dataset.


```python
df_coolseason = df[df.CROP.isin(coolseason_sel)]
df_coolseason_nu = df_coolseason[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_coolseason_nu.head())
```

        FIPS_NO COUNTY  YEAR      P      K
    187       1  ADAIR  1990   28.0  108.0
    188       1  ADAIR  1990   88.0  408.0
    189       1  ADAIR  1990   30.0  533.0
    190       1  ADAIR  1990   66.0  384.0
    191       1  ADAIR  1990  140.0  767.0
    

### Calculate median by the year for each County.


```python
df_coolseason_median = np.round( df_coolseason_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_coolseason_median)
print(df_coolseason_median.columns)
df_coolseason_median.columns = list(map("_".join,df_coolseason_median.columns))
df_coolseason_median.columns = df_coolseason_median.columns.str.replace("P_median_", "P_med")
df_coolseason_median.columns = df_coolseason_median.columns.str.replace("P_len", "P_count")
df_coolseason_median.columns = df_coolseason_median.columns.str.replace("K_median_","K_med")
df_coolseason_median.columns = df_coolseason_median.columns.str.replace("K_len","K_count")
print(df_coolseason_median.columns)
df_coolseason_median = df_coolseason_median.reset_index()
print(df_coolseason_median)
file_out_median = fileOut.joinpath('coolseason_median.csv')  # path and filename
df_coolseason_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_coolseason_median)),'\n')
```

                K                                               ...      P         \
              len                                               ... median          
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   2011   
    COUNTY                                                      ...                 
    ADAIR      37   57   43   43   51   49   96   57   75   52  ...   76.0   56.0   
    ALLEN     135  250  201  272  276  154  130  156  119  133  ...   49.0   44.0   
    ANDERSON   36    7   12   15   16   25   22   22    9   10  ...  130.0   27.0   
    BALLARD    10   10   38   12   11   17   17   10   12   12  ...   66.0   22.0   
    BARREN     82  106  149  201  242  200   90   56   31   39  ...   73.0   70.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...    ...   
    WAYNE      55   40   32   52   64   83   77   76   64   76  ...   68.0   69.0   
    WEBSTER     6   15    6    3    2   15    1   11    5   66  ...   32.0   34.0   
    WHITLEY     3    3    4    1    1   12   14    8    6   19  ...   36.0   28.0   
    WOLFE       7    8   12   12    6   15   11    6   14   28  ...   30.0   46.0   
    WOODFORD   35   42   50   30  102   26   43   61   43   60  ...  226.0  330.0   
    
                                                                      
                                                                      
    YEAR       2012   2013   2014   2015   2016   2017   2018   2019  
    COUNTY                                                            
    ADAIR      53.0   54.0   42.0   38.0   41.0   46.0   48.0   55.0  
    ALLEN      55.0   44.0   66.0   56.0   42.0   51.0   41.0   37.0  
    ANDERSON   39.0   39.0   40.0   29.0   33.0   48.0   75.0   43.0  
    BALLARD    82.0   88.0    0.0   46.0   53.0   48.0   52.0   55.0  
    BARREN     43.0   52.0   47.0   48.0   50.0   46.0   48.0   44.0  
    ...         ...    ...    ...    ...    ...    ...    ...    ...  
    WAYNE      86.0   65.0   73.0   63.0   50.0   46.0   51.0   60.0  
    WEBSTER    39.0   18.0   70.0   48.0   31.0   41.0   23.0   14.0  
    WHITLEY    31.0   47.0   29.0   42.0   28.0   32.0   34.0   28.0  
    WOLFE      52.0   30.0   41.0   36.0    7.0   17.0   15.0   21.0  
    WOODFORD  321.0  342.0  326.0  307.0  259.0  301.0  356.0  244.0  
    
    [120 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR            37            57            43            43   
    1       ALLEN           135           250           201           272   
    2    ANDERSON            36             7            12            15   
    3     BALLARD            10            10            38            12   
    4      BARREN            82           106           149           201   
    ..        ...           ...           ...           ...           ...   
    115     WAYNE            55            40            32            52   
    116   WEBSTER             6            15             6             3   
    117   WHITLEY             3             3             4             1   
    118     WOLFE             7             8            12            12   
    119  WOODFORD            35            42            50            30   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0              51            49            96            57            75   
    1             276           154           130           156           119   
    2              16            25            22            22             9   
    3              11            17            17            10            12   
    4             242           200            90            56            31   
    ..            ...           ...           ...           ...           ...   
    115            64            83            77            76            64   
    116             2            15             1            11             5   
    117             1            12            14             8             6   
    118             6            15            11             6            14   
    119           102            26            43            61            43   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...       76.0       56.0       53.0       54.0       42.0       38.0   
    1    ...       49.0       44.0       55.0       44.0       66.0       56.0   
    2    ...      130.0       27.0       39.0       39.0       40.0       29.0   
    3    ...       66.0       22.0       82.0       88.0        0.0       46.0   
    4    ...       73.0       70.0       43.0       52.0       47.0       48.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    115  ...       68.0       69.0       86.0       65.0       73.0       63.0   
    116  ...       32.0       34.0       39.0       18.0       70.0       48.0   
    117  ...       36.0       28.0       31.0       47.0       29.0       42.0   
    118  ...       30.0       46.0       52.0       30.0       41.0       36.0   
    119  ...      226.0      330.0      321.0      342.0      326.0      307.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0         41.0       46.0       48.0       55.0  
    1         42.0       51.0       41.0       37.0  
    2         33.0       48.0       75.0       43.0  
    3         53.0       48.0       52.0       55.0  
    4         50.0       46.0       48.0       44.0  
    ..         ...        ...        ...        ...  
    115       50.0       46.0       51.0       60.0  
    116       31.0       41.0       23.0       14.0  
    117       28.0       32.0       34.0       28.0  
    118        7.0       17.0       15.0       21.0  
    119      259.0      301.0      356.0      244.0  
    
    [120 rows x 121 columns]
    total number of records written to CSV: 120 
    
    

#### Cool Season Grass, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 10
    L        low         P>= 10 & P<=30
    M        medium      P>30 & P<=60
    H        high        P>60
    
#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 104
    L        low        K>=104 & K <=186
    M        medium     K>=187 & K <=300
    H        high       K>300


```python
df_coolseason_nu['CAT_P'] = ''
df_coolseason_nu['CAT_P'] = np.where(df_coolseason_nu.P < 10, 'VL', df_coolseason_nu.CAT_P)
df_coolseason_nu['CAT_P'] = np.where(((df_coolseason_nu.P > 10) & (df_coolseason_nu.P <= 30)), 'L', df_coolseason_nu.CAT_P)
df_coolseason_nu['CAT_P'] = np.where(((df_coolseason_nu.P > 30) & (df_coolseason_nu.P <= 60)), 'M', df_coolseason_nu.CAT_P)
df_coolseason_nu['CAT_P'] = np.where((df_coolseason_nu.P > 60), 'H', df_coolseason_nu.CAT_P)
 
df_coolseason_nu['CAT_K'] = ''
df_coolseason_nu['CAT_K'] = np.where(df_coolseason_nu.K < 104, 'VL', df_coolseason_nu.CAT_K)
df_coolseason_nu['CAT_K'] = np.where(((df_coolseason_nu.K >= 104) & (df_coolseason_nu.K <= 186)), 'L', df_coolseason_nu.CAT_K)
df_coolseason_nu['CAT_K'] = np.where(((df_coolseason_nu.K > 186) & (df_coolseason_nu.K <= 300)), 'M', df_coolseason_nu.CAT_K)
df_coolseason_nu['CAT_K'] = np.where((df_coolseason_nu.K > 300), 'H', df_coolseason_nu.CAT_K)
```


```python
warnings.filterwarnings("ignore")
df_coolseason_p = np.round( df_coolseason_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_coolseason_k = np.round( df_coolseason_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)

df_coolseason_p.columns
df_coolseason_k.columns
df_coolseason_p.columns = list(map("_".join,df_coolseason_p.columns))
df_coolseason_k.columns = list(map("_".join,df_coolseason_k.columns))
df_coolseason_p.columns = df_coolseason_p.columns.str.replace("P_median_", "")
df_coolseason_p.columns = df_coolseason_p.columns.str.replace("P_len", "count")
df_coolseason_k.columns = df_coolseason_k.columns.str.replace("K_median_","")
df_coolseason_k.columns = df_coolseason_k.columns.str.replace("K_len","count")
df_coolseason_p = df_coolseason_p.reset_index()
df_coolseason_k = df_coolseason_k.reset_index()
file_out_p = fileOut.joinpath('coolseason_p_levels.csv')  # path and filename
df_coolseason_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('coolseason_k_levels.csv')  # path and filename
df_coolseason_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_coolseason_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_coolseason_k)),'\n')
```

    total number of records written to CSV: 120 
    
    total number of records written to CSV: 120 
    
    

## Alfalfa Clover mix

#### Create list to select Alfalfa Clover mix from database.


```python
alfalfa_sel = ['Alfalfa', 'Alfalfa/Cool Season', 'Bluegrass/White Clover', 'Clover/Grass', 'Fescue/White Clover', 'Orchardgrass/Red Clover', 'Orchardgrass/White Clover', 'Red Clover', 'Red Clover/Grass', 'Timothy/Red Clover', 'White Clover', 'White Clover/Grass']
alfalfa_sel.sort()
print(alfalfa_sel)
```

    ['Alfalfa', 'Alfalfa/Cool Season', 'Bluegrass/White Clover', 'Clover/Grass', 'Fescue/White Clover', 'Orchardgrass/Red Clover', 'Orchardgrass/White Clover', 'Red Clover', 'Red Clover/Grass', 'Timothy/Red Clover', 'White Clover', 'White Clover/Grass']
    

#### Select Alfalfa Clover mixCanfrom dataset.


```python
df_alfalfa = df[df.CROP.isin(alfalfa_sel)]
df_alfalfa_nu = df_alfalfa[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_alfalfa_nu.head())
```

      FIPS_NO COUNTY  YEAR      P      K
    0       1  ADAIR  1990   28.0  158.0
    1       1  ADAIR  1990   88.0  134.0
    2       1  ADAIR  1990   70.0  256.0
    3       1  ADAIR  1990  161.0  611.0
    4       1  ADAIR  1990  105.0  315.0
    

### Calculate  median by year for each County.


```python
df_alfalfa_median = np.round( df_alfalfa_nu.pivot_table(index='COUNTY', columns=['YEAR'], values=['P','K'],aggfunc=(np.median,len),fill_value=0),0)
print(df_alfalfa_median)
print(df_alfalfa_median.columns)
df_alfalfa_median.columns = list(map("_".join,df_alfalfa_median.columns))
df_alfalfa_median.columns = df_alfalfa_median.columns.str.replace("P_median_", "P_med")
df_alfalfa_median.columns = df_alfalfa_median.columns.str.replace("P_len", "P_count")
df_alfalfa_median.columns = df_alfalfa_median.columns.str.replace("K_median_","K_med")
df_alfalfa_median.columns = df_alfalfa_median.columns.str.replace("K_len","K_count")
print(df_alfalfa_median.columns)
df_alfalfa_median = df_alfalfa_median.reset_index()
print(df_alfalfa_median)
file_out_median = fileOut.joinpath('alfalfa_median.csv')  # path and filename
df_alfalfa_median.to_csv(file_out_median, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_alfalfa_median)),'\n')
```

                K                                               ...      P         \
              len                                               ... median          
    YEAR     1990 1991 1992 1993 1994 1995 1996 1997 1998 1999  ...   2010   2011   
    COUNTY                                                      ...                 
    ADAIR     209  130  130  145   67  115   90   75   66   49  ...   56.0   70.0   
    ALLEN     115  112  119  116   72   57   23   54   20   34  ...  102.0   56.0   
    ANDERSON   31   20   22   35   27   22   31   17    6    8  ...   93.0  128.0   
    BALLARD    38   43   36   54   22   43   33   18   17   23  ...   54.0   28.0   
    BARREN    337  262  498  474  299  287  146   54   63   42  ...   46.0   56.0   
    ...       ...  ...  ...  ...  ...  ...  ...  ...  ...  ...  ...    ...    ...   
    WAYNE      75   79  101   85   68   60   51   34   39   30  ...   74.0   42.0   
    WEBSTER    46   76   74   45   18   10   21   24   11   16  ...   26.0   23.0   
    WHITLEY   145  114  154  164  133  113   38   25   27   37  ...   55.0   36.0   
    WOLFE      55   37   26   29   28   33   11   20    2    3  ...   44.0   31.0   
    WOODFORD   93   82   57   73   98  112  118   78   54   57  ...  313.0  237.0   
    
                                                                     
                                                                     
    YEAR       2012   2013   2014   2015   2016   2017   2018  2019  
    COUNTY                                                           
    ADAIR      67.0   36.0   63.0   45.0   50.0   49.0   45.0  50.0  
    ALLEN      70.0   50.0   58.0   54.0   52.0   52.0  179.0  58.0  
    ANDERSON   58.0   52.0   78.0   42.0  107.0   90.0   76.0  54.0  
    BALLARD    64.0   40.0   24.0   42.0   37.0   39.0   60.0  46.0  
    BARREN     67.0   55.0   52.0   49.0   41.0   31.0   49.0  44.0  
    ...         ...    ...    ...    ...    ...    ...    ...   ...  
    WAYNE      66.0   62.0   63.0   96.0   56.0   69.0   70.0  66.0  
    WEBSTER    48.0   27.0   23.0   28.0   13.0   28.0   44.0  50.0  
    WHITLEY    39.0   42.0   38.0   34.0   22.0   28.0   55.0  31.0  
    WOLFE      38.0  452.0    0.0    0.0   43.0   40.0  102.0  51.0  
    WOODFORD  336.0  296.0  211.0  253.0  288.0  234.0  182.0  97.0  
    
    [120 rows x 120 columns]
    MultiIndex([('K',    'len', '1990'),
                ('K',    'len', '1991'),
                ('K',    'len', '1992'),
                ('K',    'len', '1993'),
                ('K',    'len', '1994'),
                ('K',    'len', '1995'),
                ('K',    'len', '1996'),
                ('K',    'len', '1997'),
                ('K',    'len', '1998'),
                ('K',    'len', '1999'),
                ...
                ('P', 'median', '2010'),
                ('P', 'median', '2011'),
                ('P', 'median', '2012'),
                ('P', 'median', '2013'),
                ('P', 'median', '2014'),
                ('P', 'median', '2015'),
                ('P', 'median', '2016'),
                ('P', 'median', '2017'),
                ('P', 'median', '2018'),
                ('P', 'median', '2019')],
               names=[None, None, 'YEAR'], length=120)
    Index(['K_count_1990', 'K_count_1991', 'K_count_1992', 'K_count_1993',
           'K_count_1994', 'K_count_1995', 'K_count_1996', 'K_count_1997',
           'K_count_1998', 'K_count_1999',
           ...
           'P_med2010', 'P_med2011', 'P_med2012', 'P_med2013', 'P_med2014',
           'P_med2015', 'P_med2016', 'P_med2017', 'P_med2018', 'P_med2019'],
          dtype='object', length=120)
           COUNTY  K_count_1990  K_count_1991  K_count_1992  K_count_1993  \
    0       ADAIR           209           130           130           145   
    1       ALLEN           115           112           119           116   
    2    ANDERSON            31            20            22            35   
    3     BALLARD            38            43            36            54   
    4      BARREN           337           262           498           474   
    ..        ...           ...           ...           ...           ...   
    115     WAYNE            75            79           101            85   
    116   WEBSTER            46            76            74            45   
    117   WHITLEY           145           114           154           164   
    118     WOLFE            55            37            26            29   
    119  WOODFORD            93            82            57            73   
    
         K_count_1994  K_count_1995  K_count_1996  K_count_1997  K_count_1998  \
    0              67           115            90            75            66   
    1              72            57            23            54            20   
    2              27            22            31            17             6   
    3              22            43            33            18            17   
    4             299           287           146            54            63   
    ..            ...           ...           ...           ...           ...   
    115            68            60            51            34            39   
    116            18            10            21            24            11   
    117           133           113            38            25            27   
    118            28            33            11            20             2   
    119            98           112           118            78            54   
    
         ...  P_med2010  P_med2011  P_med2012  P_med2013  P_med2014  P_med2015  \
    0    ...       56.0       70.0       67.0       36.0       63.0       45.0   
    1    ...      102.0       56.0       70.0       50.0       58.0       54.0   
    2    ...       93.0      128.0       58.0       52.0       78.0       42.0   
    3    ...       54.0       28.0       64.0       40.0       24.0       42.0   
    4    ...       46.0       56.0       67.0       55.0       52.0       49.0   
    ..   ...        ...        ...        ...        ...        ...        ...   
    115  ...       74.0       42.0       66.0       62.0       63.0       96.0   
    116  ...       26.0       23.0       48.0       27.0       23.0       28.0   
    117  ...       55.0       36.0       39.0       42.0       38.0       34.0   
    118  ...       44.0       31.0       38.0      452.0        0.0        0.0   
    119  ...      313.0      237.0      336.0      296.0      211.0      253.0   
    
         P_med2016  P_med2017  P_med2018  P_med2019  
    0         50.0       49.0       45.0       50.0  
    1         52.0       52.0      179.0       58.0  
    2        107.0       90.0       76.0       54.0  
    3         37.0       39.0       60.0       46.0  
    4         41.0       31.0       49.0       44.0  
    ..         ...        ...        ...        ...  
    115       56.0       69.0       70.0       66.0  
    116       13.0       28.0       44.0       50.0  
    117       22.0       28.0       55.0       31.0  
    118       43.0       40.0      102.0       51.0  
    119      288.0      234.0      182.0       97.0  
    
    [120 rows x 121 columns]
    total number of records written to CSV: 120 
    
    

#### Alfalfa Clover mix, Set categories for P and K values to very low, low, medium, high, very high. Base values from AGR-1.

#### Categories for P
    Cat      Title       Break
    -------------------------------------
    VL       very low    P< 9
    L        low         P>= 9 & P<=27
    M        medium      P>28 & P<=60
    H        high        P>60
    
#### Categories for K
    Cat      Title      Break
   --------------------------------------
    VL       very low   K< 97
    L        low        K>=97 & K <=203
    M        medium     K>=204 & K <=296
    H        high       K>296


```python
df_alfalfa_nu['CAT_P'] = ''
df_alfalfa_nu['CAT_P'] = np.where(df_alfalfa_nu.P < 9, 'VL', df_alfalfa_nu.CAT_P)
df_alfalfa_nu['CAT_P'] = np.where(((df_alfalfa_nu.P >= 9) & (df_alfalfa_nu.P <= 27)), 'L', df_alfalfa_nu.CAT_P)
df_alfalfa_nu['CAT_P'] = np.where(((df_alfalfa_nu.P > 27) & (df_alfalfa_nu.P <= 60)), 'M', df_alfalfa_nu.CAT_P)
df_alfalfa_nu['CAT_P'] = np.where((df_alfalfa_nu.P > 60), 'H', df_alfalfa_nu.CAT_P)

df_alfalfa_nu['CAT_K'] = ''
df_alfalfa_nu['CAT_K'] = np.where(df_alfalfa_nu.K < 97, 'VL', df_alfalfa_nu.CAT_K)
df_alfalfa_nu['CAT_K'] = np.where(((df_alfalfa_nu.K >= 97) & (df_alfalfa_nu.K <= 203)), 'L', df_alfalfa_nu.CAT_K)
df_alfalfa_nu['CAT_K'] = np.where(((df_alfalfa_nu.K > 203) & (df_alfalfa_nu.K <= 296)), 'M', df_alfalfa_nu.CAT_K)
df_alfalfa_nu['CAT_K'] = np.where((df_alfalfa_nu.K > 296), 'H', df_alfalfa_nu.CAT_K)
```


```python
warnings.filterwarnings("ignore")
df_alfalfa_p = np.round( df_alfalfa_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.median,len),fill_value=0),2)
df_alfalfa_k = np.round( df_alfalfa_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.median,len),fill_value=0),2)

df_alfalfa_p.columns
df_alfalfa_k.columns
df_alfalfa_p.columns = list(map("_".join,df_alfalfa_p.columns))
df_alfalfa_k.columns = list(map("_".join,df_alfalfa_k.columns))
df_alfalfa_p.columns = df_alfalfa_p.columns.str.replace("P_median_", "")
df_alfalfa_p.columns = df_alfalfa_p.columns.str.replace("P_len", "count")
df_alfalfa_k.columns = df_alfalfa_k.columns.str.replace("K_median_","")
df_alfalfa_k.columns = df_alfalfa_k.columns.str.replace("K_len","count")
df_alfalfa_p = df_alfalfa_p.reset_index()
df_alfalfa_k = df_alfalfa_k.reset_index()
file_out_p = fileOut.joinpath('alfalfa_p_levels.csv')  # path and filename
df_alfalfa_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('alfalfa_k_levels.csv')  # path and filename
df_alfalfa_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_alfalfa_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_alfalfa_k)),'\n')
```

    total number of records written to CSV: 120 
    
    total number of records written to CSV: 120 
    
    


```python

```
