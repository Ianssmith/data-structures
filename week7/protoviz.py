
# coding: utf-8

# In[103]:

import numpy as np 
import pandas as pd 
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt

import seaborn as sns


# In[104]:

df = pd.read_json("data/crane.json")
df.head()


# In[107]:

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')


# In[108]:

ax.plot(df.x, df.y, df.z, color="r", linewidth=1, alpha=0.5)
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_zlabel("z")

plt.show()


# In[ ]:




# In[ ]:




# In[ ]:



