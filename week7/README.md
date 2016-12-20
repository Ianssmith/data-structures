ScreenShots of what the shape the visualization of the sensor data would take:


It probably could have been predicted, the form the plot might take, given the data, however I still was rather surprised and pleased by the simple and clean looking result.

![alt text](screenshots/crane.png "X and Y")
![alt text](screenshots/spider.png "X and Y")

This was just plotting the X and Y acceleration as a continuous line with d3 Path.

After fiddling around with various ways to try and depict the 3 dimensions in 2D

![alt text](screenshots/crane+z.png "X+Y=black, x+z=blue, z+y=red")

I finally threw in the towl and just used matplotlib to give a full 3d rendering.

![alt text](screenshots/3d1.png "X, Y, and Z")
![alt text](screenshots/3d2.png "X, Y, and Z")
