export default function splitNumberAndCharacter(str: string): { number: number, character: string } {
    const regex = /(\d+)([a-zA-Z]+)/gm;
    const m = regex.exec(str);
    if(m) {
        return {
            number: m[1] as unknown as number,
            character: m[2]
        }
    } else {
        return {
            number: 0,
            character: ''
        }
    }
}