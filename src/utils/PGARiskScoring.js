
function scorePGA(pga) {
    if (pga == null) {
        return null; // Low risk
    }
    if (pga > 1) {
        return 100; // Very high risk
    }

    const lookup = [
        [0.00, 0],
        [0.05, 10],
        [0.15, 30],
        [0.30, 55],
        [0.50, 75],
        [0.75, 90],
        [1.00, 100]
    ]

    const index = lookup.findIndex(y => y[0] > pga);

    const interpoLatedRisk = lookup[index - 1][1] + (pga - lookup[index - 1][0]) * (lookup[index][1] - lookup[index - 1][1]) / (lookup[index][0] - lookup[index - 1][0]);
    //interpolating the risk score for the given PGA value using linear interpolation between the two closest points in the lookup table


    return interpoLatedRisk;
}

export function calcPGARisk(xvalues, yvalues) {

    const thresh = 0.000404; // 2% in 50 years, 2475 year return period threshold frequency set by USGS for PGA risk level 4.0

    const index = yvalues.findIndex(y => y < thresh);
    const selectedXValue = xvalues.slice(index - 1, index + 1);
    const selectedYValue = yvalues.slice(index - 1, index + 1);
    console.log('Selected X values:', selectedXValue);
    console.log('Selected Y values:', selectedYValue);

    const interpoLatedx = selectedXValue[0] + (thresh - selectedYValue[0]) * (selectedXValue[1] - selectedXValue[0]) / (selectedYValue[1] - selectedYValue[0]);
    //finding the inbetween x value for the threshold frequency using linear interpolation
    console.log('Interpolated X value for threshold frequency:', interpoLatedx);
    console.log('PGA SCORE:', scorePGA(interpoLatedx));


    console.log(index, selectedXValue, interpoLatedx);

    return scorePGA(interpoLatedx);
}