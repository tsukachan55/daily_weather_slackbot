# Git操作マニュアル

## 初回設定手順

1. **Gitリポジトリの初期化**
```bash
# カレントディレクトリをGitリポジトリとして初期化
git init
```

2. **GitHubリポジトリとの連携**
```bash
# リモートリポジトリを'origin'という名前で追加
git remote add origin https://github.com/tsukachan55/daily_weather_slackbot.git
```

## 通常の作業手順

1. **変更状態の確認**
```bash
# 変更されたファイルの一覧を表示
git status
```

2. **変更をステージングエリアに追加**
```bash
# 全ての変更をステージングエリアに追加
git add .

# または特定のファイルのみを追加
git add ファイル名
```

3. **変更をコミット**
```bash
# 変更を記録（コミット）
git commit -m "コミットメッセージ"

# コミットメッセージの例:
# - feat: 新機能追加の場合
#   git commit -m "feat: 天気通知機能の追加"
# - fix: バグ修正の場合
#   git commit -m "fix: 通知時刻のバグを修正"
# - docs: ドキュメント更新の場合
#   git commit -m "docs: READMEの更新"
```

4. **変更をGitHubにプッシュ**
```bash
# ローカルの変更をリモートリポジトリに反映
git push origin main
```

## エラー発生時の対処

1. **プッシュが拒否された場合**
```bash
# リモートの変更を取得
git fetch origin main

# リモートの変更を統合
git pull origin main --allow-unrelated-histories

# 再度プッシュ
git push origin main
```

2. **コンフリクトが発生した場合**
```bash
# 変更状態を確認
git status

# コンフリクトを解消後、変更を追加
git add .

# コンフリクト解消をコミット
git commit -m "fix: コンフリクトの解消"

# プッシュ
git push origin main
```

## その他の便利なコマンド

1. **変更履歴の確認**
```bash
# コミット履歴を表示
git log

# 簡潔なコミット履歴を表示
git log --oneline
```

2. **ブランチの操作**
```bash
# 現在のブランチを確認
git branch

# ブランチの作成と切り替え
git checkout -b ブランチ名

# ブランチの切り替え
git checkout ブランチ名
```

3. **変更の取り消し**
```bash
# 直前のコミットを取り消し（変更は保持）
git reset --soft HEAD^

# ステージングエリアの変更を取り消し
git reset HEAD ファイル名

# 作業ディレクトリの変更を取り消し（注意: 変更が完全に削除されます）
git checkout -- ファイル名
```

## 注意事項

1. コミットメッセージは具体的で分かりやすい内容にする
2. 大きな変更は小さな単位に分けてコミットする
3. プッシュする前に`git status`で変更内容を確認する
4. 重要なファイルを誤って削除しないよう注意する
5. `.gitignore`に記載されたファイルは管理対象外となる 