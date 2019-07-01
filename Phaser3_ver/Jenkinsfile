#!/usr/bin/env groovy
// vim: set ts=4 sts=4 sw=4 et:

// Items to synchronize into bucket
String[] items = [
    'index.html',
    'style.css',
    'assets/',
    'js/',
]

// Standard LCO AWS S3 Bucket synchronization pipeline
s3BucketPipeline([
    awsCredentials: 'jenkins-publish-serolgame.lco.global',
    s3Bucket: 'serolgame.lco.global',
    items: items,
])
