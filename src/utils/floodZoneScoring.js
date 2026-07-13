// Unlike PGARiskScoring.js, this is a direct lookup, not an interpolation —
// FEMA flood zones are discrete polygons, not a continuous hazard curve.
const ZONE_RISK_SCORES = {
    VE: 95,
    V: 95,
    AE: 80,
    A: 80,
    AH: 75,
    AO: 75,
    A99: 70,
};

export function calcFloodRisk(feature) {
    if (!feature) {
        // No NFHL coverage at this point — not the same as "safe"
        return { score: -1, status: 'no_data' };
    }

    const { FLD_ZONE, ZONE_SUBTY } = feature.properties;

    if (FLD_ZONE === 'X') {
        const isShaded = ZONE_SUBTY?.includes('0.2 PCT');
        return { score: isShaded ? 25 : 5, status: 'ok' };
    }

    const score = ZONE_RISK_SCORES[FLD_ZONE];
    return {
        score: score ?? null,
        status: score == null ? 'undetermined' : 'ok',
    };
}