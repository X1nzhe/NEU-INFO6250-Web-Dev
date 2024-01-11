# Git Commit Messages

As described in [basic-git.md](basic-git.md), each time you commit a set of changes to your git repo, you include a **commit message**.  When in a workplace or otherwise working with a team on software development, these commit messages serve a crucial role and it is important that you learn and practice how to create useful commit messages.

The course requires that you include useful and accurate commit messages to help prepare you for working on a team.

## What a commit message is used for

Before we discuss the commit messages themselves, think about why someone would look at a repository.  If they want to see the current files only, that's easily done.  But the team will often be asking the question "What changed?". This is what the commit messages tell us.  In both a web-based view like Github as well as a command-line view, we can see the list of commits, listed with their commit message.

In Github, you can see this on your own repo by going to the repo page (the "Code" view in main menu).  On the right-hand side there is column of data about the repo, such as how many stars/watching, the list of contributors, etc.  Just to the left of the top of this column is the green clone/download button.  Just below that button is a message saying some number of "commits" (example: "23 commits").  Clicking on that link of the number of commits will show the list of commits.  (You can also go there straight by the url by adding "/commits/main" to the end of the repo url)

This will show a list of commits in the order they happened, a history of the repository code.  You can click on any of these commits to see the specific set of changes they contain, but just by looking at this list, the commit messages (should) summarize the work done, and the system automatically tracks who has done this work.

## Examples of useful commit messages

The course repository is fairly boring (it is just a collection of assignments, class notes, and readings, and any updates should be to those items), so a "good" list of commits might look like:

- "Updates syllabus project1 due date"
- "Adds Week 3 notes + assignment"
- "Completes basic-layout assignment"
- "Adds Week 2 notes + assignment"

For a more "exciting" list of commit message, take a look at the commit messages of any larger software project on Github.  You should see the messages and even if you don't know enough about the system to know what the messages really mean, you should understand how they are useful to the members of the team:

- https://github.com/facebook/react/commits/main
- https://github.com/vitejs/vite/commits/main
- https://github.com/expressjs/express/commits/master



## Creating a good commit message

There are different styles of commit messages, so your eventual team may have some standards to follow, and we can't predict what those specific standards will be, so this advice is all general.

First, think about WHAT we want to convey.  The message is read in the context of the entire codebase, so saying "fixed css" is much too vague for a commit message - it is true if you know the context of the problem it was solving, but when looking at the entire codebase, it doesn't actually mean anything.  A better version might be "fixes site main menu css".  

Second, recognize that it's not being TOO specific. The commit message isn't saying EXACTLY what was done, it is simply saying enough for someone to know two things:

- What was this commit about?
- Is this a commit I'm interested in getting more detail about?

My advice for commit messages was to complete this sentence "this commit...".  So "fixes site main menu css" is the end of that sentence (without including that start).  So you wouldn't say "this commit fixes site main menu css", because we don't need the "this commit" part.  The message would just be "fixes site main menu css".

Some resources about commit messages:
- https://cbea.ms/git-commit/

A slightly different approach that is also common is to be a bit more terse: You have a "type" to your commit, saying what area you are changing, such as "docs", "test", "build", etc, followed by a colon (":") then a normal brief commit message.  Some of the larger software repos I linked to in examples do exactly that.  You can read more about this sort of style at https://www.conventionalcommits.org/en/v1.0.0/

Regardless of the prefix or not, all of these commit messages are following the same general approach to solving the same problems: Summarizing what changes the commit made so that a team member can decide if they want to know more about that commit, as well as being able to know what changes a collection of commits does and does not contain.

- https://advancedweb.hu/how-to-create-a-good-pull-request/

## Cleaning up your commit messages

As you get more comfortable with using git, you will find that you tend to commit the changes you are working on more frequently - after all, committing means you can go back to that point in the code.  A commit is like a "save" in a video game - if you make choices after that you don't like, you can go back to that save and try again.

However, if you made 10 commits in the process of writing a feature for the software before you push it to the repo your team is likely not interested in all 10 of those commits.  Instead, they would prefer to see a single commit that pulls together the final version of your changes with a single commit message that focuses on the summary of those changes.

Performing a "clean" merge is a more advanced topic that is beyond the scope of this course, but it is a topic that programmers will get quite passionate about (because the value of your commit messages often means efficient or wasted time for them!). These means that for this course we will only care about the final (most recent) commit message of any push, but that as you get more comfortable with using git you should absolutely explore the methods used to clean up your commits.  Here are some articles to read on that topic:

- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges
- https://about.gitlab.com/blog/2018/06/07/keeping-git-commit-history-clean/
- https://about.gitlab.com/blog/2020/11/23/keep-git-history-clean-with-interactive-rebase/
