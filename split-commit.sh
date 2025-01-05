#!/bin/bash

# 現在のコミットの変更を取得
git reset HEAD~1

# 変更されたファイルのリストを取得
files=$(git status --porcelain | awk '{print $2}')

# ファイルの総数を取得
total_files=$(echo "$files" | wc -l)

# 1コミットあたりのファイル数を計算（切り上げ）
files_per_commit=$(( (total_files + 19) / 20 ))

# カウンター初期化
count=0
commit_count=1

# 各ファイルに対して処理
for file in $files; do
    git add "$file"
    count=$((count + 1))

    # 指定数のファイルが追加されたらコミット
    if [ $count -eq $files_per_commit ] || [ $commit_count -eq 20 -a $count -gt 0 ]; then
        git commit -m "Split commit $commit_count of 20"
        git push origin main
        count=0
        commit_count=$((commit_count + 1))
    fi
done

# 残りのファイルがあればコミット
if [ $count -gt 0 ]; then
    git commit -m "Split commit $commit_count of 20"
    git push origin main
fi

echo "All changes have been split into 20 commits and pushed."