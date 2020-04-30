# Code for python median by year
## Corn
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

## soy
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
# Canola
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

# sorghum
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


# Samll grain
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

# tobacco
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

# warmseason
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

# coolseason

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

# alfalfa

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
