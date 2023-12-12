'use client';

import GaugeComponent from 'react-gauge-component/dist/lib'

interface Props {
    minValue: number;
    maxValue: number;
    value: number;
    formatText?: (value: number) => string;
}

export default function BlockGaugeChart({ minValue, maxValue, value , formatText}:Props) {
    return (
        <div className='-mt-6'>
            <GaugeComponent
                pointer={{
                    elastic: true,
                    animationDelay: 0,
                }}
                arc={{
                    width: 0.3,
                    subArcs: [
                        { limit: (maxValue - minValue) / 100 * 60, color: '#31C48D' },
                        { limit: (maxValue - minValue) / 100 * 80 , color: '#FACA15' },
                        { limit: maxValue, color: '#F05252' },
                    ]
                }}
                minValue={minValue}
                maxValue={maxValue}
                value={value}
                labels={{
                    valueLabel: { formatTextValue: formatText, style: { fontSize: 30 } },
                    tickLabels: {
                        // defaultTickValueConfig: { 
                        //     formatTextValue: formatTextEdge,
                        // },
                        hideMinMax: true,
                    }
                }}
            />
        </div>
    )
}
