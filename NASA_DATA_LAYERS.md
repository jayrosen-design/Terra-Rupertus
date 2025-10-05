# 🛰️ NASA Data Layers Reference

Complete guide to the NASA Terra satellite data layers used in Astraeus Rupertus 2.0.

## Overview

All data layers are sourced from **NASA's Global Imagery Browse Services (GIBS)**, which provides pre-rendered, visualization-ready satellite imagery from the Terra mission.

---

## 🔥 Layer 1: Active Fires (MODIS Thermal Anomalies)

### Source
- **Instrument**: MODIS (Moderate Resolution Imaging Spectroradiometer)
- **Satellite**: Terra
- **Product**: MOD14 (Thermal Anomalies/Fire)

### What It Shows
Thermal anomalies detected from space, including:
- Active wildfires
- Agricultural burns
- Volcanic activity
- Industrial heat sources

### Technical Details
- **Resolution**: 1 km at nadir
- **Temporal Coverage**: 2000 - Present
- **Update Frequency**: Daily
- **Detection Method**: Thermal infrared channels (brightness temperature)

### Interpretation
- **Bright red/yellow spots**: Active fire detections
- **Clustered patterns**: Large wildfire events
- **Scattered points**: Agricultural burning
- **Persistent hotspots**: Volcanic activity or industrial sources

### Historical Insights
- 2003: European heatwave fires
- 2010: Record Russian wildfires
- 2019-2020: Australian bushfires
- 2020-2021: Western US megafires

### GIBS Layer ID
`MODIS_Terra_Thermal_Anomalies_All`

### More Information
[NASA Fire Information for Resource Management System (FIRMS)](https://firms.modaps.eosdis.nasa.gov/)

---

## 💨 Layer 2: Carbon Monoxide (MOPITT)

### Source
- **Instrument**: MOPITT (Measurements of Pollution in the Troposphere)
- **Satellite**: Terra
- **Product**: MOPITT CO Total Column

### What It Shows
Atmospheric carbon monoxide (CO) concentrations, a key air pollution indicator:
- Industrial emissions
- Vehicle exhaust
- Biomass burning
- Incomplete combustion products

### Technical Details
- **Resolution**: 22 km at nadir
- **Temporal Coverage**: 2000 - Present
- **Update Frequency**: Daily (day/night separate products)
- **Measurement**: Total column CO (molecules/cm²)

### Interpretation
- **Red/Orange areas**: High CO concentrations (>2.5 × 10^18 molecules/cm²)
- **Yellow areas**: Moderate pollution levels
- **Green/Blue areas**: Lower concentrations
- **Plume patterns**: CO transport by wind

### Why It Matters
Carbon monoxide:
- Toxic to humans at high concentrations
- Indicates incomplete combustion efficiency
- Precursor to ground-level ozone
- Climate-relevant greenhouse gas
- Excellent tracer for pollution transport

### Seasonal Patterns
- **Spring**: Agricultural burning in Southeast Asia
- **Summer**: Forest fires in boreal regions
- **Dry season**: Amazon burning
- **Year-round**: Urban industrial centers

### GIBS Layer ID
`MOPITT_CO_Total_Column_Day`

### More Information
[MOPITT Website](https://www2.acom.ucar.edu/mopitt)

---

## 💡 Layer 3: Light Pollution (VIIRS Nighttime Lights)

### Source
- **Instrument**: VIIRS (Visible Infrared Imaging Radiometer Suite)
- **Satellite**: Suomi NPP (complementary to Terra)
- **Product**: Day/Night Band Earth at Night

### What It Shows
Artificial lighting at night, revealing:
- Urban development patterns
- Population density
- Economic activity
- Energy consumption
- Light pollution levels

### Technical Details
- **Resolution**: 500 m - 750 m
- **Temporal Coverage**: 2012 - Present
- **Update Frequency**: Monthly composites
- **Detection**: Low-light imaging capability

### Interpretation
- **Bright white areas**: Dense urban centers
- **Expanding halos**: Urban sprawl
- **Linear patterns**: Highway corridors
- **Offshore lights**: Fishing fleets, oil platforms
- **Dark regions**: Undeveloped or protected areas

### Environmental Impact
Artificial light at night affects:
- **Wildlife**: Disrupts migration, breeding, feeding
- **Astronomy**: Limits dark sky visibility
- **Human health**: Circadian rhythm disruption
- **Energy**: Represents wasted electricity

### 25-Year Trends
- Rapid urbanization in Asia (China, India)
- Growth of megacities worldwide
- Suburban expansion in developed nations
- Increased oil and gas development
- Infrastructure development in Africa

### GIBS Layer ID
`VIIRS_SNPP_DayNightBand_ENCC`

### More Information
[NASA Black Marble](https://blackmarble.gsfc.nasa.gov/)

---

## 🌫️ Layer 4: Aerosol Optical Depth (Air Quality Proxy)

### Source
- **Instrument**: MODIS
- **Satellite**: Terra
- **Product**: AOD (Aerosol Optical Depth)

### What It Shows
Atmospheric aerosol particles, indicating:
- Air pollution levels
- Dust storms
- Smoke from fires
- Industrial emissions
- Volcanic ash

### Technical Details
- **Resolution**: 3 km - 10 km (varies by product)
- **Temporal Coverage**: 2000 - Present
- **Update Frequency**: Daily
- **Measurement**: Optical thickness at 550 nm wavelength

### Interpretation
- **Dark red/purple**: Very high aerosol loading (AOD > 1.0)
- **Orange/Yellow**: Moderate pollution (AOD 0.3-1.0)
- **Green/Blue**: Clean air (AOD < 0.3)
- **AOD > 0.5**: Noticeably hazy conditions

### What Aerosols Mean
Aerosols include:
- **Pollution**: Sulfates, nitrates from fossil fuels
- **Dust**: Desert sand, soil particles
- **Smoke**: Wildfire and agricultural burning
- **Sea salt**: Ocean spray
- **Volcanic**: Ash and gases

### Methane Proxy
While not direct methane measurement, aerosols serve as a proxy for:
- Industrial activity (often co-emitted with methane)
- Agricultural burning (methane source)
- Overall air quality degradation

### Health Implications
High aerosol levels correlate with:
- Respiratory problems
- Cardiovascular issues
- Reduced visibility
- Climate effects (cooling/warming)

### Regional Patterns
- **Saharan dust**: Transatlantic transport to Americas
- **Asian pollution**: Industrial emissions
- **Fire smoke**: Seasonal burning events
- **Urban hazes**: Persistent pollution

### GIBS Layer ID
`MODIS_Terra_Aerosol_Optical_Depth`

### More Information
[NASA Earthdata Aerosol Products](https://earthdata.nasa.gov/learn/backgrounders/aerosols)

---

## 📊 Data Layer Comparison

| Layer | Resolution | Latency | Best Used For |
|-------|-----------|---------|---------------|
| Fires | 1 km | ~3 hours | Wildfire tracking |
| CO | 22 km | 1-2 days | Pollution transport |
| Lights | 500 m | 1 month | Urban development |
| Aerosol | 3-10 km | ~1 day | Air quality |

---

## 🔍 How to Use These Layers

### For Environmental Monitoring
1. **Start with Fires**: See immediate thermal events
2. **Add CO**: Observe pollution from those fires
3. **Check Aerosol**: Measure air quality impact
4. **Compare Lights**: See if fires near urban areas

### For Urban Studies
1. **Enable Lights**: Map city growth over 25 years
2. **Add Aerosol**: Correlate development with pollution
3. **Use Timeline**: Animate urban expansion

### For Climate Research
1. **Fires over time**: Increasing frequency?
2. **CO trends**: Improving or worsening?
3. **Aerosol patterns**: Regional changes
4. **Cross-reference**: Multiple indicators

---

## 🌐 GIBS Technical Details

### Tile Service Standard
- **Protocol**: WMTS (Web Map Tile Service)
- **Projection**: EPSG:4326 (Geographic/WGS84)
- **Format**: PNG with transparency
- **Tile Size**: 256×256 pixels

### Time Dimension
```
URL Pattern:
https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/{LAYER}/default/{YYYY-MM-DD}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
```

### Tile Matrix Sets
- `EPSG4326_250m` - High resolution
- `EPSG4326_500m` - Medium resolution
- `EPSG4326_2km` - Lower resolution (faster)

---

## 🔬 Scientific Validation

All NASA Terra data products undergo:
- **Calibration**: Regular instrument adjustments
- **Validation**: Ground truth comparisons
- **Quality Control**: Algorithm refinement
- **Peer Review**: Scientific community oversight

### Data Quality
- Level 1: Raw instrument data
- Level 2: Geophysical parameters
- Level 3: Gridded, time-averaged products (used here)
- Level 4: Modeled or derived products

---

## 📚 Additional Resources

### NASA Earthdata
- [Earthdata Search](https://search.earthdata.nasa.gov/)
- [Worldview](https://worldview.earthdata.nasa.gov/) - Official NASA imagery viewer
- [GIBS Documentation](https://nasa-gibs.github.io/gibs-api-docs/)

### Terra Mission
- [Terra Website](https://terra.nasa.gov/)
- [Terra Instruments](https://terra.nasa.gov/about/terra-instruments)
- [25 Years of Terra](https://earthobservatory.nasa.gov/features/Terra)

### API Access
- [CMR API](https://cmr.earthdata.nasa.gov/search/) - Common Metadata Repository
- [earthaccess Python Library](https://earthaccess.readthedocs.io/)

---

## 🦔 Rupert's Take

*"Each of these data layers tells part of Earth's story. Fires show immediate events, CO reveals how pollution travels, lights show where humans have built, and aerosols indicate overall air health. Together, they help us understand the complex changes happening to our planet—and why finding a safe home has been such a challenge for creatures like me!"*

---

**Data Credits**: NASA EOSDIS GIBS & Terra Mission  
**Last Updated**: October 2025

