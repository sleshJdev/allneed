import React from 'react';
import $ from 'jquery';

class HttpService {

    static get(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: url,
                data: data,
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'POST',
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    }

}

export default HttpService