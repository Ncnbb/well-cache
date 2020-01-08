git config --global user.email "ci.circleci.com"
git config --global user.name "circleci_ci"
git add .

GIT_STATUS=`git diff --cached --name-only`

if [$GIT_STATUS != '']
then
git commit -m 'circleci auto build commit'
git push git@github.com:Ncnbb/well-cache.git master
else
echo '无需提交';
fi