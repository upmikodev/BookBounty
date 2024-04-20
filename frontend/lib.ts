export function getCSRFToken() {
    let csrfToken = null;
    if (document.cookie) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === 'csrftoken') {
                csrfToken = value;
                break;
            }
        }
    }
    return csrfToken;
}
