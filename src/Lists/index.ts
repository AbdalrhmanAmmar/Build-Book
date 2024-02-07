export function descrpSlicer(text: string, maxNumber: number = 125):string {
    if (text.length > maxNumber) {
        return `${text.slice(0 ,maxNumber)}...`
    }
    return text;
}