export function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch(_) {}
}
