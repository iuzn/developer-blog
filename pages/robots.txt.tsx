import React, { Component } from "react";

export default class Robots extends Component {
    static getInitialProps({ res }) {
        res.setHeader("Content-Type", "text/plain");
        res.write(`Sitemap: https://dev.ibrahimuzun.com/api/sitemap.xml
User-agent: *
Allow: /*
Allow: /blog/*
Allow: /projeler/*

Disallow: /_next/*
Disallow: /api/*
Disallow: /_next/*`);
        res.end();
    }
}