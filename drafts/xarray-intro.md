---
title: "xarray Introduction"
categories:
  - Notes
tags:
  - Pangeo
  - Python
---

# My notes from exploring xarray

Xarray was designed for working seamlessly with multidimensional data in Python.

Xarray works on top of raw NumPy-like multidimensional arrays, and introduces _labels_ in the form of 
_dimensions_, _coordinates_, and _attributes_.

Xarray builds upon and integrates with NumPy and pandas.

The main aim of the project is to keep focus on functionality and better interfaces related to the labeled data,
 and leverage other Python libraries for what they do properly already. I.e., _NumPy/pandas_ for arrays and indexing,
_Dask_ for parallel computing, _matplotlib_ for plotting, etc.

The data model is borrowed from _netCDF_ file format.

# Dependencies

Link: https://docs.xarray.dev/en/stable/getting-started-guide/installing.html

The required dependencies to install xarray are:
- Python (3.10+)
- numpy (1.23+)
- packaging (23.1+)
- pandas (2.0+)

There are several different optional dependencies. However, several might be useful to improve the performance
of the xarray:
- scipy - to enable interpolation features on xarray objects
- bottleneck - speeds up NaN-skipping and hugely improves rolling window aggregations
- numbagg - for exponential rolling window operations

The set of recommended dependencies is: `xarray dask netCDF4 bottleneck`.

Xarray offers multiple dependency sets:
- `xarray[io]` - I/O operations
- `xarray[accel]` - accelerating xarray
- `xarray[parallel]` - dask arrays
- `xarray[viz]` - visualizations
- `xarray[complete]` - everything above

??? Difference xarray DataArray vs. Dask array
??? Difference between how different formats are stored on disk (netcdf, zarr, grib, hdf5, geotiff)

Best practices for Dask on xarray
- do the spatial and temporal indexing early, especially before calling resample() or groupby()
- groupby() performs better if the flox package is installed
- save intermediate results to disk as netcdf files (also with using persist()?)
- use the dask dashboard to identify performance bottlenecks

# News in the latest releases

# Planned features