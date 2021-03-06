import React from 'react';

// This is the descriptions service. The descriptions.service exists to standardize text data input, temp image input and hyperlinking within
// the website so that many text fields can be easily accessed from all parts of the application, when applicable IFF it helps
// make the application more dynamic and modular.
// 
// The DESCRIPTIONS object will serve as a index for all the non-code text in the application
// 
// Some objects and attributes within the DESCRIPTIONS object may be:
//  title: Title text
//  body: Body Text
//  link: Hyperlink to be inserted into an anchor
//  image: path to an image file

export const TEXT = {
    teams : {
        heading : {
           body: "View or modify your current teams. Create or join a new team. Need more info? Read the docs.",
           hyperlink: "/docs",
        }
    }
}