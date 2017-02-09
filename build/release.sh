set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  npm run analyze
  npm run test:unit

  npm run docs

  # build
  VERSION=$VERSION npm run build

  # commit
  git add -A
  git commit -m "[release] $VERSION :rocket::sushi:"
  npm version $VERSION --message "[release] $VERSION :rocket::sushi:"

  # publish
  git push
  npm publish
fi
