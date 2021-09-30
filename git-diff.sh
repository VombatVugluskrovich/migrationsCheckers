

cd /migrations
if [[ `git status --porcelain` ]]; then
  # Changes
else
  # No changes
fi