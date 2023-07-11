# Some notes for backend course using Node.JS (day 1)

## NPM
NPM (Node Package Manager) is a tool/software helps us to manage our Node.JS project.

Initialize a Node.JS project
```sh
npm init -y
```
where `-y` flag means say yes to all the options. To install a package for project, using following command

```sh
npm install <package_name> --save
```
where `--save` flag means to save it to `package.json`. `package.json` also a file where all the information of your project stored.

## Git and Github
### Git
Git is a tool/software helps us manage the changes of our project. More formally, Git is a version control system.

Using git for current project
```sh
git init
```
When we want to make changes to our project
```sh
git commit -m "some description about this changes"
```
But before we do that, we have to declare what files need to be committed
```sh
git add file1 file2 folder1 folder2...
```
in many case, we want to add all the file in the current folder
```sh
git add .
```
To check commit history
```sh
git log
```
you can also try out `--stat` or `--graph` flags for `git log` command.

### Github
- Github is a platform where we can store our git project online.
- Github provides some extended tools and UI for collaboration.
- A git project is called a repository (or repo for short).
- Github != Git.

**Step 1:** Create a Github repo on official website.

**Step 2:** Fill in all the information for a repo.

**Step 3:** Connect Github repo with local git repo.

```sh
git remote origin <repo_url>
```

**Step 4:** Push all the commits to Github (at branch master)
```sh
git push origin master
```

**Step 5:** If there is any changes on Github, pull it back to local machine
```sh
git pull
```