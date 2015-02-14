import pandas as pd
# import matplotlib.pyplot as plt
import numpy as np
'''
# Arrays to store attributes and types (numbers is trash)
attributes = []

# Open zoo.names and store attributes and types into respective arrays
with open ("data/Tanzania_School_Location___Performance.csv", "r") as names:
    for line in names:
        if "Attribute Information" in line:
            break
    for line in names:
        if line.isspace():
            break
        else:
            info = line.split( )
            temp = ""
            count = 1;
            # An upper case letter is the sign that we made it to the type
            while (info[count][0].isupper() == False):
                temp += info[count]
                count += 1
            attributes.append(temp)
            types.append(info[count])
'''

df = pd.DataFrame.from_csv("data/Tanzania_School_Location___Performance.csv", header=0, sep=',', index_col=0)
df['currentRatio'] = df['number_enrolled'] / df['number_teaching_staff']
# future ratio is 2023
x = df['currentRatio'] / 51712510
#print(x)
#exit(1)
numfuture = x * 64739170
maintain = numfuture / df['currentRatio']
df['futureRatio'] = numfuture
df['maintain'] = maintain

#print(sum((df['maintain'])))

numfarfar = x * 103000000
maintainfarfar = numfarfar / df['currentRatio']
df['farAwayRatio'] = numfarfar
df['maintainfarfar'] = maintainfarfar





counter = 0
summer = 0
for i in df['currentRatio']:
    if np.isfinite(i):
        summer = summer + i
        counter += 1
averagecurrentratio = summer / counter
print("The average current ratio is: ")
print(averagecurrentratio)

counter = 0
summer = 0
for i in df['futureRatio']:
    if np.isfinite(i):
        summer += i
        counter += 1
averagefutureratio = summer / counter
print("The average future ratio (2023) is: ")
print(averagefutureratio)

counter = 0
summer = 0
for i in df['farAwayRatio']:
    if np.isfinite(i):
        summer += i
        counter += 1
ave = summer / counter
print("The average current ratio is: ")
print(ave)






#df.to_csv("projections.csv")
'''

# and 2040
df['farAwayRatio']
print(df)
'''
# Load zoo.data with attributes for column headers
#df = pandas.read_csv("zoo.data", names=attributes)