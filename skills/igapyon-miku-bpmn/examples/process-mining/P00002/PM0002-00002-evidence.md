# PM0002-00002 — 記録から出来事を拾う

[対象範囲](PM0002-00001-scope.md) に沿って、A01 の出来事と該当する見出しを対応させました。

[対応する P00001 のプロンプト](../P00001/PM0001-00002-evidence.md)

## 根拠表

A01 は 2026-11-28 の miku-daybook activity「miku-bpmn の GitHub Release 手順を記録」です。「原記録の見出し」は A01 の該当箇所を示します。

| ID | 原記録の見出し | 記録された出来事 | 種別と利用方法 |
| --- | --- | --- | --- |
| E01 | 開始時点の状態確認 | 開始時の work branch は `devel-tiga1128baf`、HEAD は PR #7 の merge commit `4ce58db`。文書変更が未 commit で、`package.json` は `0.4.1`。 | 実績。候補の開始状態と入力を示す。 |
| E02 | バージョンを 0.4.2 へ更新 | 利用者が `a.b.c++` を指定。`package.json` を正本とする規約を確認し、`igapyon-miku-scm` の `version.increment.validate` で SemVer patch の候補 `0.4.2` を読み取り専用で検証。 | 実績。更新値は規約と validator の結果から決定。 |
| E03 | バージョンを 0.4.2 へ更新 | `package.json`、README、TODO の版数参照を更新し、README 記載の bundle コマンドで ZIP を生成。ZIP の内容と SHA-256 を確認。 | 実績。配布物を commit 前に確認した。 |
| E04 | miku-scm git add commit | 利用者の `miku-scm git add commit` の依頼で、`igapyon-miku-scm` の `work.commit` が README、TODO、package.json、SKILL の4ファイルをコミット。commit は `4d9dbda`。作業ツリーは clean。 | 実績。次工程に渡す committed change set。 |
| E05 | miku-scm sync push と Draft PR 作成 | `igapyon-miku-scm` の `repository.sync.push.prepare` が通常 commit を省き、base からの差分を根拠として固定。PR draft をその根拠から作成し、読み取り専用の `repository.sync.push.draft.prepare` が `draft-ready` を返した。 | 実績。PR 文面を元の commit message から作らず、net diff を根拠にした。 |
| E06 | miku-scm sync push と Draft PR 作成 | `igapyon-miku-scm` の `repository.sync.push.apply` が commit を一つにまとめて branch `devel-tiga1128baf` を push。local branch を `-done` にし、backup を作成。Draft PR #8 が open で作成された。 | 実績。push 比較は `0 0`。次は人の review。 |
| E07 | 完了後に再度受け取った sync push 依頼 | 先行して公開した後で利用者から `sync push` の依頼が届いたが、local branch は凍結された `-done`。clean 状態を確認し、再度の runner / push は開始しなかった。 | 実績。通常経路には入らない guard の事例。 |
| E08 | 利用者による PR merge と v0.4.2 Release 公開 | 利用者は Ready for Review、Merge pull request、Confirm merge、Delete branch、Draft a new release、tag `v0.4.2`、Publish release を順に操作したと報告。 | 利用者報告。sync pull が後から PR merge を検証した。branch 削除と Release UI 操作はその報告として扱う。 |
| E09 | miku-scm sync pull | `igapyon-miku-scm` の `repository.sync.pull` が PR #8 の head とマージコミットを照合。`devel` から次の branch `devel-tiga1128hed` を作成し、stash なしで clean に完了。 | 実績。merge と次 branch の結果を示す。 |
| E10 | miku-scm sync pull | `igapyon-miku-scm` の version/tag 表示は `pom.xml` を参照して unresolved。local tag はなかったが、read-only `git ls-remote` で remote `v0.4.2` が merge commit を指すことを確認。 | 実績。remote tag ref の確認。GitHub Release 自体は利用者報告として区別する。 |

## v0.4.4 の実行と見直しの根拠

A02 の「P00002 の実行実験（v0.4.4）」から、初回の候補を見直すために使った出来事を示します。記録した SCM ワークフローの対象リポジトリは、いずれも `miku-bpmn-skills` です。

| ID | 原記録の見出し | 記録された出来事 | 種別と利用方法 |
| --- | --- | --- | --- |
| E11 | P0002-00001-task-02 — version 候補を検証 | 利用者は P00002 の実行を依頼。実行側は前回の `a.b.c++` から patch を選び、`igapyon-miku-scm` の `version.increment.validate` に `package.json`、`semver`、`patch` を渡し、0.4.3 → 0.4.4 を検証した。 | 実績。更新の種類は実行側の推定。 |
| E12 | サブエージェントから親エージェントへの引き継ぎ | `igapyon-miku-scm` の `work.commit` で9ファイルをコミットしたとサブエージェントが報告。引き継ぎ時、親エージェントが `devel-tiga1128iff` の HEAD `38498d2` と作業ツリーが clean であることを確認した。 | エージェントの報告と Git での確認。完了結果を引き継ぐための根拠。 |
| E13 | P0002-00002-task-02 / task-03 — PR draft と読み取り専用照合 | `igapyon-miku-scm` の `repository.sync.push.prepare` で公開範囲を固定。`repository.sync.push.draft.prepare` の初回は公開用の引数を渡して失敗し、operation ID と plan SHA-256 を渡して `draft-ready` になった。返された引数で `repository.sync.push.apply` を一度実行し、Draft PR #11 を作成した。 | 実績。草案の照合と公開に渡す引数を区別する根拠。 |
| E14 | P0002-00003-task-01 — Ready for Review の報告 ／ P0002-00004 — Release 公開報告と確認 | 利用者は案内を受けるたびに Ready for Review、マージ、ブランチ削除、Release 公開を報告。照会で PR #11 がマージ済みで、`v0.4.4` のタグが `26cc7d8` を指し、公開済み Release に ZIP が添付されていることを確認した。 | 操作は利用者報告。マージ、タグ、公開、添付は照会結果。 |
| E15 | P0002-00005 — sync pull | Release の完了報告後、`igapyon-miku-scm` の `repository.sync.pull` を `--repo` と `--apply` で実行。PR #11 のマージを検証し、`devel-tiga1128uag` を作成した。 | 実績。完了報告を受けて pull した順序を示す。 |
| E16 | 人による GitHub 操作の一括案内を採用 | 利用者は人が操作する部分を一度に案内するよう提案し、その運用を採用した。 | 実行後の決定。v0.4.4 の実行時は個別に案内した（E14）。 |
| E17 | GitHub 操作の案内方法を習熟度に合わせる | 利用者は、慣れていない操作では一行ずつ指示を受け、慣れた操作では手順一式を受け取りたいと述べた。 | 実行後の要望。案内方法を利用者の希望に合わせる根拠。 |

[P00002 の案内に戻る](README.md) · [次へ — Process 候補の発見](PM0002-00003-discover.md)
