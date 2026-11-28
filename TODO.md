# TODO

[READMEの合意した出発点](README.md#合意した出発点) に基づく今回の公開対象は `0.4.5`（タグ `v0.4.5`）です。リポジトリのバージョンは `package.json` を正本とします。

## これから決めること

- [ ] **プロセス定義の保存形式。** 1プロセスを1つのMarkdownにまとめ、BPMN XMLをコードブロックに置き、AIへの指示をタスクIDで結び付ける案を検討する。`.bpmn` の書き出しや外部からの取り込みを初版でどこまで扱うか決める。
- [ ] **候補と根拠の出し方。** activityから、作業の順序や判断がどこまで分かれば候補にするか決める。記録された事実、提案、推定をどう示すか決める。
- [ ] **初版で扱うBPMN要素。** Process、Call Activity、User Taskと、必要な分岐などの範囲を決める。標準への適合をどこまでうたうかも確認する。
- [ ] **実行と再開。** プロセス間の入出力、人への質問、回答待ちからの再開で何を記録するか決める。生成AIが直接進める範囲と、補助スクリプトが必要な箇所を見極める。
- [ ] **公開 Release の配布 ZIP を確認する。** `v0.4.5` の公開後に確認します。GitHub Actions の実行結果と、Release への配布 ZIP の添付を確認します。

## 初版で確かめること

- [x] **例示の配置を検討する。** P00001 と P00002 のプロセスマイニング例を `process-mining/`、対応する定義を `bpmn/` に配置し、各例と親 Process から相互に参照する。
- [x] **別の題材でプロセス発見を試す。** Release 操作の activity に[同梱の5本のプロンプト](skills/igapyon-miku-bpmn/examples/process-mining/P00001/README.md) を適用した。工程の境界、証拠種別、人の判断、例外の扱いを比較し、`skills/igapyon-miku-bpmn/references/process-mining.md` の初稿にまとめた。
- [ ] activityから2つの再利用可能な Process を見つけて保存し、利用者が指定した順で呼び出す親の Process を組み立てる。生成AIがその順に実行し、人への質問を1回挟んで再開し、実施結果をactivityに戻せるか確認する。

## 開発メモ

2026-11-27 に `igapyon-miku-soft-developer` の Agent Skills 作成手順を確認しました。共有スキルのローカルソースで対象パスの最終コミットは `f1d798c` でした。Agent Skills 作成手順の内容は導入済みのスキルと一致しました。近い既存例として `miku-daybook-skills` の `skills/igapyon-…/SKILL.md` の配置と、Codexへのコピーによる導入方法を参照しました。
