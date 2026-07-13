import { useState, useEffect } from 'react';
import { calcFloodRisk } from '../utils/floodZoneScoring.js';

const NFHL_QUERY_URL =
    'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28/query';

export function useFloodRisk(lat, long) {
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null); // 'ok' | 'no_data' | 'undetermined'

    useEffect(() => {
        if (lat == null || long == null) return;

        const controller = new AbortController();

        async function fetchFloodRisk() {
            try {
                setScore(null); // Reset score when lat/long changes so loading state shows
                setLoading(true);

                const params = new URLSearchParams({
                    geometry: `${long},${lat}`,
                    geometryType: 'esriGeometryPoint',
                    inSR: '4326',
                    spatialRel: 'esriSpatialRelIntersects',
                    outFields: 'FLD_ZONE,ZONE_SUBTY,STATIC_BFE',
                    returnGeometry: 'false',
                    f: 'geojson',
                });

                const response = await fetch(
                    `${NFHL_QUERY_URL}?${params.toString()}`,
                    { signal: controller.signal }
                );
                if (!response.ok) throw new Error('Network response was not ok');

                const json = await response.json();
                const { score: riskScore, status: riskStatus } = calcFloodRisk(json.features[0]);
                setScore(riskScore);
                setStatus(riskStatus);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFloodRisk();
        return () => controller.abort();
    }, [lat, long]);

    return { score, status, loading, error };
}