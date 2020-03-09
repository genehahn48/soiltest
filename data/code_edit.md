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
