export default function calcPercent(value: number, min: number, max: number) {
    return Math.round(((value - min) / (max - min)) * 10000) / 100;
}