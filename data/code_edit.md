<!-- P Nutrient canolabeans -->
df_canola_nu['CAT_P'] = ''
df_canola_nu['CAT_P'] = np.where(df_canola_nu.P <= 5, 'VL', df_canola_nu.CAT_P)
df_canola_nu['CAT_P'] = np.where(((df_canola_nu.P > 5) & (df_canola_nu.P <= 27)), 'L', df_canola_nu.CAT_P)
df_canola_nu['CAT_P'] = np.where(((df_canola_nu.P > 27) & (df_canola_nu.P <= 60)), 'M', df_canola_nu.CAT_P)
df_canola_nu['CAT_P'] = np.where((df_canola_nu.P > 60), 'H', df_canola_nu.CAT_P)
df_canola_nu.head()

<!-- K Nutrient canolabean  -->
df_canola_nu['CAT_K'] = ''
df_canola_nu['CAT_K'] = np.where(df_canola_nu.K <= 99, 'VL', df_canola_nu.CAT_K)
df_canola_nu['CAT_K'] = np.where(((df_canola_nu.K > 99) & (df_canola_nu.K <= 190)), 'L', df_canola_nu.CAT_K)
df_canola_nu['CAT_K'] = np.where(((df_canola_nu.K > 190) & (df_canola_nu.K <= 300)), 'M', df_canola_nu.CAT_K)
df_canola_nu['CAT_K'] = np.where(((df_canola_nu.K > 300) , 'H', df_canola_nu.CAT_K)
df_canola_nu.head()

warnings.filterwarnings("ignore")
df_canola_p = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.average,len),fill_value=0),2)
df_canola_k = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.average,len),fill_value=0),2)

df_canola_p.columns
df_canola_k.columns
df_canola_p.columns = list(map("_".join,df_canola_p.columns))
df_canola_k.columns = list(map("_".join,df_canola_k.columns))
df_canola_p.columns = df_canola_p.columns.str.replace("P_average_", "")
df_canola_p.columns = df_canola_p.columns.str.replace("P_len", "count")
df_canola_k.columns = df_canola_k.columns.str.replace("K_average_","")
df_canola_k.columns = df_canola_k.columns.str.replace("K_len","count")
df_canola_p = df_canola_p.reset_index()
df_canola_k = df_canola_k.reset_index()
file_out_p = fileOut.joinpath('canola_p_levels.csv')  # path and filename
df_canola_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('canola_k_levels.csv')  # path and filename
df_canola_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_k)),'\n')


<!-- Canola Nutrients  -->
canola_sel = ['Canola', 'Canola/canolabeans']
canola_sel.sort()
print(canola_sel)

df_canola = df[df.CROP.isin(canola_sel)]
df_canola_nu = df_canola[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_canola_nu.head())

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

warnings.filterwarnings("ignore")
df_canola_p = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.average,len),fill_value=0),2)
df_canola_k = np.round( df_canola_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.average,len),fill_value=0),2)

df_canola_p.columns
df_canola_k.columns
df_canola_p.columns = list(map("_".join,df_canola_p.columns))
df_canola_k.columns = list(map("_".join,df_canola_k.columns))
df_canola_p.columns = df_canola_p.columns.str.replace("P_average_", "")
df_canola_p.columns = df_canola_p.columns.str.replace("P_len", "count")
df_canola_k.columns = df_canola_k.columns.str.replace("K_average_","")
df_canola_k.columns = df_canola_k.columns.str.replace("K_len","count")
df_canola_p = df_canola_p.reset_index()
df_canola_k = df_canola_k.reset_index()
file_out_p = fileOut.joinpath('canola_p_levels.csv')  # path and filename
df_canola_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('canola_k_levels.csv')  # path and filename
df_canola_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_canola_k)),'\n')

<!-- Sorghum Grain-->
sorghum_sel = ['Grain Sorghum']
sorghum_sel.sort()
print(sorghum_sel)

df_sorghum = df[df.CROP.isin(sorghum_sel)]
df_sorghum_nu = df_sorghum[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_sorghum_nu.head())

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

warnings.filterwarnings("ignore")
df_sorghum_p = np.round( df_sorghum_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.average,len),fill_value=0),2)
df_sorghum_k = np.round( df_sorghum_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.average,len),fill_value=0),2)

df_sorghum_p.columns
df_sorghum_k.columns
df_sorghum_p.columns = list(map("_".join,df_sorghum_p.columns))
df_sorghum_k.columns = list(map("_".join,df_sorghum_k.columns))
df_sorghum_p.columns = df_sorghum_p.columns.str.replace("P_average_", "")
df_sorghum_p.columns = df_sorghum_p.columns.str.replace("P_len", "count")
df_sorghum_k.columns = df_sorghum_k.columns.str.replace("K_average_","")
df_sorghum_k.columns = df_sorghum_k.columns.str.replace("K_len","count")
df_sorghum_p = df_sorghum_p.reset_index()
df_sorghum_k = df_sorghum_k.reset_index()
file_out_p = fileOut.joinpath('sorghum_p_levels.csv')  # path and filename
df_sorghum_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('sorghum_k_levels.csv')  # path and filename
df_sorghum_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_sorghum_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_sorghum_k)),'\n')



<!-- small grain -->
<!-- 'Barley' , 'Barley/Soybeans', 'Grain Crops (multiple)','Oats','Oats/Soybeans', 'Rye/Soybeans', 'Small Grains', 'Small Grains/Corn', 'Small Grains/Soybeans', 'Triticale', 'Triticale/Soybeans', 'Wheat', 'Wheat/Corn', 'Wheat/Soybeans'
 -->
smallgrains_sel = ['Barley' , 'Barley/Soybeans', 'Grain Crops (multiple)','Oats','Oats/Soybeans', 'Rye/Soybeans', 'Small Grains', 'Small Grains/Corn', 'Small Grains/Soybeans', 'Triticale', 'Triticale/Soybeans', 'Wheat', 'Wheat/Corn', 'Wheat/Soybeans']
smallgrains_sel.sort()
print(smallgrains_sel)

df_smallgrains = df[df.CROP.isin(smallgrains_sel)]
df_smallgrains_nu = df_smallgrains[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_smallgrains_nu.head())

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

warnings.filterwarnings("ignore")
df_smallgrains_p = np.round( df_smallgrains_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.average,len),fill_value=0),2)
df_smallgrains_k = np.round( df_smallgrains_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.average,len),fill_value=0),2)

df_smallgrains_p.columns
df_smallgrains_k.columns
df_smallgrains_p.columns = list(map("_".join,df_smallgrains_p.columns))
df_smallgrains_k.columns = list(map("_".join,df_smallgrains_k.columns))
df_smallgrains_p.columns = df_smallgrains_p.columns.str.replace("P_average_", "")
df_smallgrains_p.columns = df_smallgrains_p.columns.str.replace("P_len", "count")
df_smallgrains_k.columns = df_smallgrains_k.columns.str.replace("K_average_","")
df_smallgrains_k.columns = df_smallgrains_k.columns.str.replace("K_len","count")
df_smallgrains_p = df_smallgrains_p.reset_index()
df_smallgrains_k = df_smallgrains_k.reset_index()
file_out_p = fileOut.joinpath('smallgrains_p_levels.csv')  # path and filename
df_smallgrains_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('smallgrains_k_levels.csv')  # path and filename
df_smallgrains_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_smallgrains_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_smallgrains_k)),'\n')




<!-- tobacco -->
<!-- 'Burley Tobacco', 'Dark Tobacco' -->
tobacco_sel = ['Burley Tobacco', 'Dark Tobacco']
tobacco_sel.sort()
print(tobacco_sel)

df_tobacco = df[df.CROP.isin(tobacco_sel)]
df_tobacco_nu = df_tobacco[['FIPS_NO','COUNTY','YEAR','P','K']].copy()
print(df_tobacco_nu.head())

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
warnings.filterwarnings("ignore")
df_tobacco_p = np.round( df_tobacco_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.average,len),fill_value=0),2)
df_tobacco_k = np.round( df_tobacco_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.average,len),fill_value=0),2)

df_tobacco_p.columns
df_tobacco_k.columns
df_tobacco_p.columns = list(map("_".join,df_tobacco_p.columns))
df_tobacco_k.columns = list(map("_".join,df_tobacco_k.columns))
df_tobacco_p.columns = df_tobacco_p.columns.str.replace("P_average_", "")
df_tobacco_p.columns = df_tobacco_p.columns.str.replace("P_len", "count")
df_tobacco_k.columns = df_tobacco_k.columns.str.replace("K_average_","")
df_tobacco_k.columns = df_tobacco_k.columns.str.replace("K_len","count")
df_tobacco_p = df_tobacco_p.reset_index()
df_tobacco_k = df_tobacco_k.reset_index()
file_out_p = fileOut.joinpath('tobacco_p_levels.csv')  # path and filename
df_tobacco_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('tobacco_k_levels.csv')  # path and filename
df_tobacco_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_tobacco_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_tobacco_k)),'\n')
