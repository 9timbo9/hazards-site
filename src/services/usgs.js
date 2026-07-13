import { useState, useEffect } from 'react';
import { calcPGARisk } from '../utils/PGARiskScoring.js';

export function useSeismicRisk(lat, long) {
    const [score, setScore] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (lat == null || long == null) return;

        const controller = new AbortController();

        async function fetchSeismicRisk() {
            try {
                setScore(null);
                setStatus(null);
                setLoading(true);
                const response = await fetch(
                    `https://earthquake.usgs.gov/nshmp-haz-ws/hazard/E2014/COUS/${long}/${lat}/PGA/760`,
                    { signal: controller.signal }
                );
                if (!response.ok) throw new Error('Network response was not ok');

                const json = await response.json();
                const x = json.response[0].metadata.xvalues;
                const y = json.response[0].data[0].yvalues;
                console.log('xvalues:', x);
                console.log('yvalues:', y);
                console.log('calcPGARisk result:', calcPGARisk(x, y));
                const { score: riskScore, status: riskStatus } = calcPGARisk(x, y);
                setScore(riskScore);
                setStatus(riskStatus);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSeismicRisk();
        return () => controller.abort();
    }, [lat, long]);

    return { score, status, loading, error };
}   