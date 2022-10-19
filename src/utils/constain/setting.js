export const DOMAIN = 'https://casestudy.cyberlearn.vn/api';

export const TOKEN = 'ACCESSTOKEN';
export const USER_LOGIN = 'USER_LOGIN';

export const REGEX_PHONE = /(84[0-9]{8}$)|(0[0-9]{9}$)/g;
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+(com)))$/;

export const STATUS_CODE = {
    SUCCESS : 200,
    NOT_FOUND: 404,
    SERVER_ERROR:500
}
