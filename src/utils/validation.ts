export function isValidWhatsapp(value: string): boolean {
    const digits = value.replace(/\D/g, '');
    return digits.length === 11;
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isSequential(str: string): boolean {
    if (str.length < 2) return false;
    let isAsc = true, isDesc = true;
    for (let i = 1; i < str.length; i++) {
        const prev = str.charCodeAt(i - 1);
        const curr = str.charCodeAt(i);
        if (curr !== prev + 1) isAsc = false;
        if (curr !== prev - 1) isDesc = false;
    }
    return isAsc || isDesc;
}

export function isValidPassword(password: string): boolean {
    if (password.length < 4) return false;
    if (isSequential(password)) return false;
    return true;
} 