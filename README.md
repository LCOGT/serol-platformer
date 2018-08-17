# serol-platformer
This game only works if a web server is running.

## To set up a server (using anaconda):
* set up anaconda
* `conda create -n [environment name] python=3` (if you are using python 3)
* go to directory where website file is
* `activate [environment name]` (activates the virtual environment)
* `python -m http.server`

## To run the game locally:
* type `http://localhost:8000/` into the browser URL bar

## Production Deployment

The LCO Jenkins build server will automatically synchronize the contents of
this repository with the AWS S3 bucket that hosts https://serolgame.lco.global/.
This only happens for tagged releases on the "master" branch.
