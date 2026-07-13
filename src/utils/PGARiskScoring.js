function scorePGA(pga) {
    if (pga == null || Number.isNaN(pga)) {
        return null;
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
    ];

    // Exact match on the last point (pga === 1.00) has no entry "strictly greater,"
    // so findIndex would return -1 here without this check.
    if (pga === lookup[lookup.length - 1][0]) {
        return lookup[lookup.length - 1][1];
    }

    const index = lookup.findIndex(y => y[0] > pga);

    // pga below the first point, or findIndex found nothing usable
    if (index <= 0) {
        return null;
    }

    const interpolatedRisk =
        lookup[index - 1][1] +
        (pga - lookup[index - 1][0]) *
            (lookup[index][1] - lookup[index - 1][1]) /
            (lookup[index][0] - lookup[index - 1][0]);
    // interpolating the risk score for the given PGA value using linear interpolation
    // between the two closest points in the lookup table

    return interpolatedRisk;
}

export function calcPGARisk(xvalues, yvalues) {
    const thresh = 0.000404; // 2% in 50 years, 2475-year return period — the standard
    // threshold basis used in building codes (ASCE 7 / NEHRP) for seismic design

    const index = yvalues.findIndex(y => y < thresh);

    // Curve never drops below threshold (very low seismic area, or bad data),
    // or the very first point is already below it — can't interpolate a bracket.
    if (index <= 0) {
        return { score: null, status: index === 0 ? 'below_range' : 'undetermined' };
    }

    const selectedXValue = xvalues.slice(index - 1, index + 1);
    const selectedYValue = yvalues.slice(index - 1, index + 1);

    const interpolatedX =
        selectedXValue[0] +
        (thresh - selectedYValue[0]) *
            (selectedXValue[1] - selectedXValue[0]) /
            (selectedYValue[1] - selectedYValue[0]);
    // finding the in-between x value for the threshold frequency using linear interpolation

    const score = scorePGA(interpolatedX);

    return {
        score,
        status: score == null ? 'undetermined' : 'ok',
    };
}