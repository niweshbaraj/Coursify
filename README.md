# Recommendation-System

# Git commands

## For cloning repository
git clone "git@github.com:niweshbaraj/RecommenderSystem.git"

## For adding files, commiting and then pushing it to remote branch
git add .
git commit -m "message like updating Readme.md file"
git push -u origin main

# For creating new branch
git -b <branch-name>
## For changing branch dir
git checkout -b <branch-name>

## For pushing to new branch 
git push --set-upstream origin frontend

Do the following in the root directory (not inside 'backend')

## Create virtual environment :
python -m venv .venv 
  
## Activate virtulal environment:
  for mac/linux os:
    source .venv/bin/activate
  in windows :
    if in gitbash terminal:
      cd .venv/Scripts
      then . activate    (dot space activate)
      cd ../..
    if powershell:
      .\.venv\Scripts\Activate.ps1

## Install dependicies:
pip3 install -r requirements.txt

## Need Postgresql installed

## Create a .env file in the root directory by following command :
touch .env

IN .env file write following lines :

DB_PASSWORD = <POSTGRESQL DATABASE PASSWORD>
HOST = <POSTGRES DATABASE HOST>
PORT = <POSTGRES DATABASE PORT>

## To start the backend server :
python main.py (from root directory -- not inside 'backend')

## To set up the frontend server :
cd frontend
npm install or npm i

## To start the frontend server :
cd frontend 
npm run dev