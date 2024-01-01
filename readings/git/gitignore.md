# The .gitignore file

When you run git status, you might see something like this:
```
mycomputer 01-setup-test % git status
On branch setup-test
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   people.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	../.DS_Store
	node_modules/
	package-lock.json
```

## Why do you get these Untracked files?

These files were created after the repository was created, so git sees them as new.
The `node_modules/` and `package-lock.json` were created when you ran npm install.  That's fine, but you don't want to store these files as part of your commit (you never want to store `node_modules/`, and while you normally want to commit `package-lock.json`, for our assignments you don't want to)

Any `.DS_Store` file(s) were created when you viewed those directories in the Mac Finder application.  You never want to store those files in the repo, as they are metadata that isn't part of your assignment.

You might have other files or directories, such as `.idea`, which is created by IntelliJ, or `.vscode`, created by VSCode.  Different teams might want these files in the repo, if they are useful to the team, or may not.  For this course, we don't want them.

## How do you deal with these untracked files?

Well, you could simply leave them "untracked" - don't add them with git, and when you commit to git they will not be part of the changed files in your PR.  But that's tedious.  A better solution is to tell git to ignore these files.

You can do that with a `.gitignore` file (notice the "." at the start of that filename).

When you add a file named `.gitignore` to a directory in your repository, it lists files that git should ignore in the directory that has the `.gitignore` file or any directory INSIDE that directory.

## What directory (folder) should the `.gitignore` file be in?

If we add a `.gitignore` file to the `work/` directory (the folder that the `01-setup-test` folder is in), it will ignore the listed files for any folder inside the work folder, including `01-setup-test` as well as future assignments (but not projects, as they will be outside the `work/` directory).  If you add a `.gitignore` file to the root directory of your repo, the files listed inside the `.gitignore` file will be ignored by git anywhere in your repository.

I recommend creating a `.gitignore` file in your root folder so it will impact both assignments in the `work/` directory and projects in other directories.

## I can't see the `.gitignore` file!

Most computer operating systems (OSes) treat files with names that begin with `.` as "hidden".  If you haven't told your OS to show hidden files, you may not see `.gitignore` files in file listings even when they exist.  

At the command line, you can show them using special flags.  `ls` lists non-hidden files in OS X and other Unix-like systems, while `ls -a` will list all files, including hidden files.  On Windows, the `dir` and `dir /a` should do the same thing.

In Explorer (Windows) or Finder (OS X) you will have to change their settings to show hidden files. (The exact settings change depending on the version of Windows/OS X)

## The contents of the `.gitignore` file

Here's a simple sample:
```
node_modules/
.DS_Store
package-lock.json
```

You can add to this list as you desire.

Remember that on most projects you DO want to commit the package-lock.json file.  We aren't worried about that file because we aren't deploying your project anywhere and it's just an extra file to cause conflicts, but if you take a project out of this repo for actual demonstration, you will want to actually commit the package-lock.json file and not ignore it.

## More about `.gitignore`

You can read about `.gitignore`
- https://git-scm.com/docs/gitignore 
- https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

You should add this file to either the root directory of your repo or in the work directory.  You will need to git add .gitignore after you do so, and it will be listed as a tracked change in git status and when you commit and push it will be included in the changes in your Pull Request.  (You'll notice the README for the assignment says it is okay to include .gitignore file changes).
