import React, { Component } from "react";

export default class Robots extends Component {
    static getInitialProps({ res }: { res: any}) {
        res.setHeader("Content-Type", "text/plain");
        res.write(`#Google Search Engine Robot
User-agent: Googlebot
Allow: /*
Allow: /blog/*
Allow: /projeler/*

Disallow: /_next/*
Disallow: /api/*
Disallow: /_next/*

#Yahoo! Search Engine Robot
User-agent: Slurp
Allow: /*
Allow: /blog/*
Allow: /projeler/*

Disallow: /_next/*
Disallow: /api/*
Disallow: /_next/*

#Yandex Search Engine Robot
User-agent: Yandex
Allow: /*
Allow: /blog/*
Allow: /projeler/*

Disallow: /_next/*
Disallow: /api/*
Disallow: /_next/*


#Bing Search Engine Robot
User-agent: bingbot
Allow: /*
Allow: /blog/*
Allow: /projeler/*

Disallow: /_next/*
Disallow: /api/*
Disallow: /_next/*

# Every bot that might possibly read and respect this file.
User-agent: *
Allow: /*
Allow: /blog/*
Allow: /projeler/*

Disallow: /_next/*
Disallow: /api/*
Disallow: /_next/*
Sitemap: https://dev.ibrahimuzun.com/api/sitemap.xml`);
        res.end();
    }
}