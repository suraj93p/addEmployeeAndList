constants= {
    "regex":{
        "validJson":/^[\],:{}\s]*$/,
        "json1":/\\["\\\/bfnrtu]/g,
        "json2":/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "json3":/(?:^|:|,)(?:\s*\[)+/g,
        "facebook":/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        "linkedin":/((http(s?):\/\/)*([a-zA-Z0-9\-])*\.|[linkedin])[linkedin/~\-]+\.[a-zA-Z0-9/~\-_,&=\?\.;]+[^\.,\s<]/,
        "twitter":/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
    }
};