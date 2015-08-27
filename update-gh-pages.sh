echo "gh-pages is updating..."

NODE_ENV=production webpack --optimize-minimize
git clone -b gh-pages git@github.com:dfilatov/vidom-todomvc.git gh-pages
cd gh-pages
cp ../index.html .
mv ../js/app.bundle.js .
git add -A
git commit -m "gh-pages updated"
git push origin gh-pages
cd ..
rm -rf gh-pages

echo "gh-pages has been updated successfully"
