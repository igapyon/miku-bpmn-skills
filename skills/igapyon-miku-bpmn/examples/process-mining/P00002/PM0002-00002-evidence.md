# PM0002-00002 — 記録から出来事を拾う

[対象範囲](PM0002-00001-scope.md) に沿って、A01 の出来事と該当する見出しを対応させました。

[対応する P00001 のプロンプト](../P00001/PM0001-00002-evidence.md)

## 根拠表

A01 は 2026-11-28 の miku-daybook activity「miku-bpmn の GitHub Release 手順を記録」です。「原記録の見出し」は A01 の該当箇所を示します。

| ID | 原記録の見出し | 記録された出来事 | 種別と利用方法 |
| --- | --- | --- | --- |
| E01 | 開始時点の状態確認 | 開始時の work branch は `devel-tiga1128baf`、HEAD は PR #7 の merge commit `4ce58db`。文書変更が未 commit で、`package.json` は `0.4.1`。 | 実績。候補の開始状態と入力を示す。 |
| E02 | バージョンを 0.4.2 へ更新 | 利用者が `a.b.c++` を指定。`package.json` を正本とする規約を確認し、SemVer patch の `0.4.2` を読み取り専用で検証。 | 実績。更新値は規約と validator の結果から決定。 |
| E03 | バージョンを 0.4.2 へ更新 | `package.json`、README、TODO の版数参照を更新し、README 記載の bundle コマンドで ZIP を生成。ZIP の内容と SHA-256 を確認。 | 実績。配布物を commit 前に確認した。 |
| E04 | miku-scm git add commit | README、TODO、package.json、SKILL の4ファイルを `miku-scm git add commit` で commit。commit は `4d9dbda`。作業ツリーは clean。 | 実績。次工程に渡す committed change set。 |
| E05 | miku-scm sync push と Draft PR 作成 | `miku-scm sync push` の prepare は通常 commit を skip し、base からの差分 evidence を固定。PR draft を evidence から作成し、read-only draft validation が `draft-ready` を返した。 | 実績。PR 文面を元の commit message から作らず、net diff を根拠にした。 |
| E06 | miku-scm sync push と Draft PR 作成 | sync push が commit を一つにまとめて branch `devel-tiga1128baf` を push。local branch を `-done` にし、backup を作成。Draft PR #8 が open で作成された。 | 実績。push 比較は `0 0`。次は人の review。 |
| E07 | 完了後に再度受け取った sync push 依頼 | 完了後に同じ `sync push` 依頼を受けたが、local branch は凍結された `-done`。clean 状態を確認し、再度の runner / push は開始しなかった。 | 実績。通常経路には入らない guard の事例。 |
| E08 | 利用者による PR merge と v0.4.2 Release 公開 | 利用者は Ready for Review、Merge pull request、Confirm merge、Delete branch、Draft a new release、tag `v0.4.2`、Publish release を順に操作したと報告。 | 利用者報告。sync pull が後から PR merge を検証した。branch 削除と Release UI 操作はその報告として扱う。 |
| E09 | miku-scm sync pull | `miku-scm sync pull` が PR #8 の exact head と merge commit を確認。`devel` から次の branch `devel-tiga1128hed` を作成し、stash なしで clean に完了。 | 実績。merge と次 branch の結果を示す。 |
| E10 | miku-scm sync pull | miku-scm の version/tag 表示は `pom.xml` を参照して unresolved。local tag はなかったが、read-only `git ls-remote` で remote `v0.4.2` が merge commit を指すことを確認。 | 実績。remote tag ref の確認。GitHub Release 自体は利用者報告として区別する。 |

[P00002 の案内に戻る](README.md) · [次へ — Process 候補の発見](PM0002-00003-discover.md)
