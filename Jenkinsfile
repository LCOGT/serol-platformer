#!/usr/bin/env groovy

// AWS S3 Permissions required to synchronize a bucket:
// s3:PutObject
// s3:GetObject
// s3:ListBucket
// s3:DeleteObject
// s3:PutObjectAcl

pipeline {
	agent any
	environment {
		GIT_COMMIT_SHORT_ID = getCommit().take(12)
		GIT_TAG_NAME = gitTagName()
		AWS_CREDENTIALS = 'jenkins-publish-serolgame.lco.global'
		AWS_REGION = 'us-west-2'
		AWS_S3_BUCKET = 'serolgame.lco.global'
	}
	stages {
		stage('Publish to S3 Bucket') {
			steps {
				script {
					// The items to upload from this repository into the bucket.
					// NOTE: Directories MUST end with a trailing "/".
					// NOTE: Directories are synchronized recursively.
					String[] items = [
						'index.html',
						'style.css',
						'assets/',
						'js/',
					]

					// We only synchronize the "master" branch, and only when this is
					// an explicitly tagged release. Otherwise we take no action.
					if (env.BRANCH_NAME == 'master') {
						if (env.GIT_TAG_NAME != null && env.GIT_TAG_NAME != "null") {
							// Generate a version.txt file containing the current version information
							String content = '';
							content += "Git Commit ID: ${GIT_COMMIT}\n"
							content += "Git Tag Name: ${GIT_TAG_NAME}\n"
							content += "Date: " + new Date() + "\n"
							writeFile(file: 'version.txt', text: content)

							// Add version.txt to the list of expected items in the bucket
							items += 'version.txt'

							// Use the follow AWS credentials to synchronize this bucket
							withAWS(region: env.AWS_REGION, credentials: env.AWS_CREDENTIALS) {
								// Unfortunately, we cannot use a standard for-each loop because the
								// Jenkins version of Groovy has serious bugs and doesn't support it
								// when running in Pipeline mode. :-(
								for (int i = 0; i < items.size(); i++) {
									def item = "${items[i]}"
									s3Upload(file: item, bucket: env.AWS_S3_BUCKET, path: item, acl: 'PublicRead')
								}

								// Get a list of all files which are actually in the bucket.
								// Note that Jenkins returns any directories in these results with
								// a trailing "/" character, which is why we need it in the list
								// of items up above.
								String[] itemsInBucket = s3FindFiles(bucket: env.AWS_S3_BUCKET)

								// Calculate the difference between the two lists. The result is
								// the list of files which are present in the bucket but absent
								// from the source repository. These should be removed.
								String[] itemsToRemove = itemsInBucket - items;

								// Remove these items
								for (int i = 0; i < itemsToRemove.size(); i++) {
									def item = "${itemsToRemove[i]}"
									s3Delete(bucket: env.AWS_S3_BUCKET, path: item)
								}
							}
						}
					}
				}
			}
		}
	}
}

/** @return The tag name, or `null` if the current commit isn't a tag. */
String gitTagName() {
	commit = getCommit()
	if (commit) {
		git_command = "git describe --tags ${commit}"
		return_code = sh(script: git_command, returnStatus: true)
		if (return_code == 0) {
			desc = sh(script: git_command, returnStdout: true)?.trim()
			if (isTag(desc)) {
				return desc
			}
		}
	}
	return null
}
 
String getCommit() {
	return sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
}
 
@NonCPS
boolean isTag(String desc) {
	match = desc =~ /.+-[0-9]+-g[0-9A-Fa-f]{6,}$/
	result = !match
	match = null // prevent serialisation
	return result
}

// vim: set ts=4 sts=4 sw=4 noet:
