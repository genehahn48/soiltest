<!-- P Nutrient Soybeans -->
df_soy_nu['CAT_P'] = ''
df_soy_nu['CAT_P'] = np.where(df_soy_nu.P <= 5, 'VL', df_soy_nu.CAT_P)
df_soy_nu['CAT_P'] = np.where(((df_soy_nu.P > 5) & (df_soy_nu.P <= 27)), 'L', df_soy_nu.CAT_P)
df_soy_nu['CAT_P'] = np.where(((df_soy_nu.P > 27) & (df_soy_nu.P <= 60)), 'M', df_soy_nu.CAT_P)
df_soy_nu['CAT_P'] = np.where((df_soy_nu.P > 60), 'H', df_soy_nu.CAT_P)
df_soy_nu.head()

<!-- K Nutrient Soybean  -->
df_soy_nu['CAT_K'] = ''
df_soy_nu['CAT_K'] = np.where(df_soy_nu.K <= 99, 'VL', df_soy_nu.CAT_K)
df_soy_nu['CAT_K'] = np.where(((df_soy_nu.K > 99) & (df_soy_nu.K <= 190)), 'L', df_soy_nu.CAT_K)
df_soy_nu['CAT_K'] = np.where(((df_soy_nu.K > 190) & (df_soy_nu.K <= 300)), 'M', df_soy_nu.CAT_K)
df_soy_nu['CAT_K'] = np.where(((df_soy_nu.K > 300) , 'H', df_soy_nu.CAT_K)
df_soy_nu.head()

warnings.filterwarnings("ignore")
df_soy_p = np.round( df_soy_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_P'], values=['P'],aggfunc=(np.average,len),fill_value=0),2)
df_soy_k = np.round( df_soy_nu.pivot_table(index='COUNTY', columns=['YEAR', 'CAT_K'], values=['K'],aggfunc=(np.average,len),fill_value=0),2)

df_soy_p.columns
df_soy_k.columns
df_soy_p.columns = list(map("_".join,df_soy_p.columns))
df_soy_k.columns = list(map("_".join,df_soy_k.columns))
df_soy_p.columns = df_soy_p.columns.str.replace("P_average_", "")
df_soy_p.columns = df_soy_p.columns.str.replace("P_len", "count")
df_soy_k.columns = df_soy_k.columns.str.replace("K_average_","")
df_soy_k.columns = df_soy_k.columns.str.replace("K_len","count")
df_soy_p = df_soy_p.reset_index()
df_soy_k = df_soy_k.reset_index()
file_out_p = fileOut.joinpath('soy_p_levels.csv')  # path and filename
df_soy_p.to_csv(file_out_p, index=False)  # output to csv
file_out_k = fileOut.joinpath('soy_k_levels.csv')  # path and filename
df_soy_k.to_csv(file_out_k, index=False)  # output to csv
print ('total number of records written to CSV:','{:,}'.format(len(df_soy_p)),'\n')
print ('total number of records written to CSV:','{:,}'.format(len(df_soy_k)),'\n')
