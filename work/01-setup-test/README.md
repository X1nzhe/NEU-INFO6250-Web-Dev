# Assignment - Testing node and git

**Due: Wed Jan 17, 11:59pm PT** 

## Instructions

NOTE: This assumes you have followed all of the instructions from the "setup-for-this-class" document.  Do that first.

From this directory, at the command line:

1.  Run `npm install`
  - Make sure you run this command while "in" the same directory as this file
    - MAKE SURE YOU UNDERSTAND THIS.  If the `pwd` command doesn't end in `/01-setup-test/` you are not "in" the correct directory
  - You should see some text while it downloads a library or two
  - If you see a permission error (EACCES) you probably installed something as root/administrator, and now your normal user account can't override it. That's a bit messy to clean up, but it's doable and you want to clean that up NOW rather than later in the semester.
    - Lots of ways of addressing this exist, with varying levels of success and computer security.  Speak up on Slack if this is an issue for you.
  - You only need to run `npm install` successfully once for this assignment.  Once the dependencies are installed, you can run the program (see below) as much as needed without reinstalling.  Reinstalling is only necessary if the dependencies are changed.
2.  Run `node list.js` (also "in" this directory)
  - You should see some names printed to the console
3. You are going to make changes, so you should first create a "feature branch" to create those changes in
  - run `git checkout -b setup-test`
  - This branch name, "setup-test", is specific to this assignment.  Each assignment will be done in its own branch with a unique name.
  - Notice that branch name is NOT based on directory/folder names.  The branch name is just a "label" for a collection of changed files.
4. Edit list.js and add your Name (as it appears in Canvas), NEU ID, email, Slack handle (with an `@`), and github username to the list
  - Make sure you match the upper/lower case for these fields, some (like github username) are case-sensitive
  - The Slack handle is your "Display Name" in Slack and will start with an `@` - you can type `@` in Slack and start typing the rest of your name and you should see it
  - We (Instructor and TAs) will use this information to connect your accounts and to contact you in case of problems, so it is important that your information be accurate. For example, use the "name" that we see in Canvas.  Your Slack and GitHub usernames can be whatever you prefer for this course, they do not need to contain your NEUID or your name, though you are responsible for using this assignment to make sure we know how to connect them.
5. Run `node list.js` again now that you've saved your changes
  - You should see your name added to the list that outputs
  - Everything should run smoothly
  - Fix any errors that do turn up and repeat this step until everything runs smoothly
6. Add the file to the list of files to commit: `git add list.js`
  - The path to `list.js` in that command will depend on where you run the command. 
    - For example, running the command at the root of the repository would be `git add work/01-setup-test/list.js`.
7. Run `git status` and make sure nothing is listed as an 'Untracked file' and only `list.js` is listed to be added. (a `.gitignore` file is also allowed to be added, see below)
  - I have never heard *anyone* say "I run git status too much".  It is much easier to clean up a commit BEFORE you make it, so always run git status before doing a commit.  Always pay attention to the output of git status.  Multiple students forget this step each semester.
  - If you DO have other files listed (such as `.DS_Store` or `.idea`) listed as Untracked files, you may want to edit a `.gitignore` file AT THE ROOT OF THE REPOSITORY, since you will want to skip those same files in other assignments.  You will have to `git add` the `.gitignore` file as well (with the appropriate path to that file in the `git add` command)
    - More info about the syntax of the .gitignore file: https://www.atlassian.com/git/tutorials/saving-changes/gitignore
    - You can examine the `work/.gitignore` file or the `work/01-setup-test/.gitignore` files to see examples
  - If you have git troubles, I recommend consulting the list of common solutions at https://ohshitgit.com
8. Commit the file: `git commit -m "Adds MYNAME"` (Example: `git commit -m"Adds Lex"`
  - This commit message reflects your changes.  If you make other changes and have to commit those, and also when you commit other assignments, the commit messages should reflect THOSE changes, they should NOT say "Adds MYNAME".
  - Repeat: This assignment should have a commit message that has your name, not the literal text "MYNAME"
  - Repeat: Future assignments should NOT have commit messages that say "Adds MYNAME" (the literal text OR your name), that is specific to this assignment
9. Send your changes to github: `git push origin setup-test` 
10. Go to the github page for this repository and create a Pull Request(PR), with 'main' on the left dropdown and your setup-info6250 branch on the right dropdown.
  - Do NOT merge, you MUST create a Pull Request(PR).  Your repositories should be set so that you cannot merge to main without a Pull Request, but they are created without that requirement so there is a period of time where you can merge, but you shouldn't do it.  Learn how to create the PR, because that's how all assignments for the class will be turned in, and if you do it wrong, your grade could suffer.
  - When you go to create the PR, review the files listed as changed to make sure they contain only the changes you expect and unexpected files are not listed. This is a great skill to practice for the job!
  - Add myself and the TA to review the PR.  If you don't do this, we may not know your work is ready and you won't get credit for it.
11. If the changes look correct, Create the Pull Request.
  - If you created and added `.gitignore` (Which I recommend), that change should be listed as well as your changes to list.js
  - There should NOT be changes to other files.
  - Be sure to **add me (and any TAs) as reviewer** on the PR.
12. Remember to return the main branch!  `git checkout main`.  In this branch, your changes do not exist (not until they are approved, merged in, and you pull the updated main branch)

Then you're done! At some point your code will be reviewed merged into main. This is where our work is different than a "real" job: For most employers you are usually responsible for merging your code after it is approved, but for this class the TA/instructor will merge it after approval.

