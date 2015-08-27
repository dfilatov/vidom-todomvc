export default function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
        const rnd = Math.random() * 16 | 0;
        return (ch === 'x'? rnd : (rnd & 0x3 | 0x8)).toString(16);
    })
}
