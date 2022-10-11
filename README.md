# Timetable browser extension for the University of Applied Sciences Bremerhaven

## O++ S+ !I C E- M V D++
(more about maintenance and what you can expect from me or the project down below)


## How does it work?

The idea was to make the timetable fit a bit better on the screen and visualize the different types of events, so they can be distinguished easier.

As the timetables are not personalized it happens to be filled with a 
lot of events that you will never attend. 
So to tidy up your timetable you can create groups with keywords that identify a single or 
multiple events at once and give them an individual color or gray them out.

Graying out can be done by selecting the keywords followed by a 
right-click to open the context-menu. 
In the context-menu you can then click on "Add selection to removed blocks". 
After that the timetable will be updated and the blocks identified by the keywords will 
be grayed out and slightly vanish.

![img.png](context-menu-example.png)

Another way to add keywords is to open the extension-popup 
by clicking on the timetable-icon in the top-right corner of your browser. 
You can then insert the keywords into the input field. 
To enter multiple keywords you have to separate them by a delimiter 
that u can also input via an input field. After clicking outside the input fields 
the changes are saved and the timetable will be updated.

To create groups and highlight these with custom colors you have to open the extension-popup 
click the "➕"-button at the bottom of the popup. Next you have to insert a color-hexcode 
and add one or multiple keywords that identify the group. It is not required to set a name for the group, 
although it might help with organisation.

![img.png](popup-example.png)

The "matching-process" for highlighting blocks, does not end after one match.
This means that if you have for example multiple groups that "hit" the same
blocks then the one that was added last overwrites the first "hit".

## What can you expect from this project?

This project is my first browser extension so there could be fundamental mistakes in the code. 
So if you spot something that is usually not done that way feel free to open an issue.
The same obviously applies to bugs.
As this is more of a fun project it can take some time until bugs are fixed 
and a new version is released. 

Although this is a fun project, 
and I do not have a roadmap of features or something similar you can always open 
an issue with a feature suggestion.