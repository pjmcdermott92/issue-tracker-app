import Cookies from 'universal-cookie';

type CookieName = string;
type CookieValue = string | number

const cookies = new Cookies();

export const useCookies = () => {
    const getCookie = (cookieName: CookieName) => {
        return cookies.get(cookieName);
    }

    const setCookie = (cookieName: CookieName, cookieValue: CookieValue) => {
        return cookies.set(cookieName, cookieValue);
    }

    const removeCookie = (cookieName: CookieName) => {
        return cookies.remove(cookieName);
    }

    return { getCookie, setCookie, removeCookie };
}
