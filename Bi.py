dataset = []
import matplotlib.pyplot as plt 
revenue = dataset.loc[0:4, 'Sale Amount']             
month = dataset.loc[0:4, 'Month']   
plt.figure(figsize = (6,7))
p = plt.bar(month,revenue, color = 'purple')
plt.bar_label(p,fmt = '${:,.0f}')       
plt.xlabel('Month')
plt.ylabel('Total Revenue')
plt.ylim([0,180000])
plt.show()

#pie chart
import matplotlib.pyplot as plt 
plt.pie(dataset['Commission'], labels = dataset['Client'], autopct ="%.2f%%")
plt.show() 

#horizontal bar chart
import matplotlib.pyplot as plt
revenue = dataset.loc[0:4,'Sale Amount']
month = dataset.loc[0:4,'Month']
plt.figure(figsize=(8,7))
p = plt.barh(month, width=revenue, color='orange')
plt.bar_label(p,fmt='${:,.0f}')
plt.ylabel('Month')
plt.xlabel('Total Revenue')
plt.xlim(0,200000)
plt.show()

import matplotlib.pyplot as plt 
revenue = dataset.loc[:, 'Total Revenue']             
items = dataset.loc[0:4, 'Month']   
plt.figure(figsize = (6,7))
p = plt.bar(items,revenue, color = 'purple')
plt.bar_label(p,fmt = '${:,.2f}')       
plt.xlabel('Items Type')
plt.ylabel('Total Revenue')
plt.show()