# PM0002-00003 — 再利用できる候補を見つける

[根拠表](PM0002-00002-evidence.md) の E01〜E10 を使って、入出力と完了条件を持つ作業のまとまりを整理しました。

[対応する P00001 のプロンプト](../P00001/PM0001-00003-discover.md)

## 見つかった Process 候補

| 候補 | 目的・入力 | 作業と根拠 | 出力・完了条件 |
| --- | --- | --- | --- |
| C01 版数付き変更を準備して commit する | 既存の変更、作業ブランチ、更新指定、版数とタグの規約 | 候補版検証、版数参照の更新、bundle 生成と確認、差分確認、commit（E01–E04） | 確認済みの版、タグの規約、commit SHA、ローカル ZIP の確認結果。commit 成功で完了。 |
| C02 Draft PR を公開する | commit 済みの変更、目的、base、リモート、利用者の push 依頼 | 固定 evidence を準備し、diff から一度だけ draft を作り、draft を検証して sync push（E05–E06） | push 済み branch、backup、open Draft PR。PR の URL を review 担当者へ渡す。成功後の local `-done` branch は凍結。 |
| C03 Draft PR を review して merge する | Draft PR の URL、head / base、review 権限 | 人が Ready for Review、マージ、公開ブランチの扱いを決める（E08）。対象 PR のマージ結果と SHA を確認する工程を加える（E09 をもとにした追加案）。 | 対象 PR と確認済みの merge commit SHA。 |
| C04 GitHub Release を作成して公開する | 確認済みの版、タグの規約、対象 PR、merge commit SHA | 人が Draft a new release を選び、tag を作成して Release を publish（E08）。 | Release と `v<version>` tag。今回、tag ref は remote 確認済みだが Release page / asset は独立照合していない。 |
| C05 merge を検証して次の work branch を作る | 凍結した `-done` ブランチ、対象 PR、base、利用者の pull 依頼 | miku-scm sync pull が exact PR merge を検証し、shared base 上の次 branch を作る（E09）。今回は pull 後に remote tag ref を補足確認した（E10）。 | `origin/devel` を追跡する clean な次 work branch。merge の証拠と backup を保持。 |

[P00002 の案内に戻る](README.md) · [次へ — 候補と原記録の照合](PM0002-00004-review.md)
