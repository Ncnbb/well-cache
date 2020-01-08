# git config --global user.email "ci.circleci.com"
# git config --global user.name "circleci_ci"
# git add .
# git commit -m 'circleci auto build commit'
# git push git@github.com:Ncnbb/well-cache.git master

GIT_STATUS=`git diff --cached --name-only`
echo ${GIT_STATUS}
if GIT_STATUS != ''
then
echo '123';
else
echo '321';
fi