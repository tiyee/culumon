/** @format */

import {stringify} from 'qs'
export interface IJsonResult {
    error: number
    message: string
}

export interface Fn<T extends IJsonResult> {
    (arg: T): void
}
export interface IErrorChecker<T extends IJsonResult> {
    (arg: T): boolean
}
export interface IErrorHandle {
    (arg: Error): void
}
export interface IMyLessonListResult extends IJsonResult {
    data: []
}

export function checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = new Error(response.statusText)
        throw error
    }
}

export function checkErrorCode(data: IJsonResult): boolean {
    if (data.error === 403) {
        if (true === confirm('请先登录')) {
            location.href = '/2/login'
        }
        return false
    }
    return true
}
export function netErrorHandle(e: Error) {
    alert('网络连接失败，请检查你的网络是否联通')
}

export function contentType(key: 'json' | 'normal' | 'multipart'): Record<string, string> {
    switch (key) {
        case 'json':
            return {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            }
        case 'normal':
            return {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            }
        case 'multipart':
            return {'Content-Type': 'multipart/form-data'}

        default:
            return {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            }
    }
}

export function qs(dic: Record<string, string>): string {
    return stringify(dic)
}

export function httpClient<T extends IJsonResult>(
    url: string,
    method: 'GET' | 'POST',
    headers: Record<string, string>,
    body: string | FormData | null,
    fn: Fn<T>,
    errorChecker: IErrorChecker<T> = checkErrorCode,
    errorHandle: IErrorHandle = netErrorHandle,
): void {
    switch (method) {
        case 'GET':
            body = null
            break
        case 'POST':
            /** some process **/
            break
        default:
            throw new Error('undefined method')
    }
    if (!('Content-Type' in headers)) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    fetch(url, {
        mode: 'same-origin',
        credentials: 'include',
        method: method,
        headers,
        body,
    })
        .then(checkStatus)
        .then((response: Response) => {
            return response.json()
        })
        .then((data: T) => {
            if (true === errorChecker(data)) {
                fn(data)
            }
        })
        .catch(e => {
            errorHandle(e)
        })
}
export function queryURLParams(param: string): Record<string, string> {
    if (param.length < 4) {
        return {}
    }
    const urlSearchParams = new URLSearchParams(param.slice(1))
    return Object.fromEntries(urlSearchParams.entries())
}
