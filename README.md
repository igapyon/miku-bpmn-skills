# miku-bpmn-skills

**miku-bpmn** は、miku-daybook の activity と task を参照して再利用できるプロセスを見つけ、利用者が選んだ順番で生成AIに実行させる Agent Skill です。人の判断が必要な工程では、AIが判断材料を添えて質問し、回答を受けて同じ工程から再開します。

## 合意した出発点

- 最初の提供形態は Agent Skill です。製品名は `miku-bpmn`、呼び出すスキル名は `igapyon-miku-bpmn` です。
- 生成AIが miku-daybook を使って作成した activity から実際の作業の流れを読み、関連する task から目的や完了条件を補って、再利用できるプロセスを見つけます。
- activity と task の検索・読取、実行結果の activity 記録には `igapyon-miku-daybook` スキルを前提とします。
- 用語とプロセスモデルは [BPMN](https://www.omg.org/spec/BPMN/2.0.2/About-BPMN/) を基準にします。モデルは、人が仕事の流れとして読めるものにします。
- 利用者が使うプロセスと順序を指定し、生成AIが実行します。人の判断が必要な工程では、生成AIが判断材料と質問を示し、回答を受けて続行します。
- 外部のBPMNエディタでの編集は、日常の作業手順には含めません。

## プロセスの発見と組み立て

1. **プロセスマイニング（プロセス発見）。** miku-daybook の activity から実際の作業の流れを読み、関連する task があれば目的や完了条件を参照して、別の仕事でも使える作業のまとまりを見つけます。見つけたものは再利用できる Process の候補です。
2. **今回の仕事を親の Process に組み立てる。** 利用者が指定した Process を、親となる上位の Process から Call Activity で順に呼び出す設計です。この親の Process が、今回の仕事のワークフローを表します。生成AIはその順序で作業を進めます。

たとえば親の Process が「共有メモを作る」なら、「決定事項を抽出する」→「共有用に整える」という2つの Process を順に呼び出します。

## 初版で検討すること

Markdown にBPMN XMLとタスク指示をまとめ、必要なときにXMLを `.bpmn` として書き出す案があります。保存形式、BPMNで扱う要素、実行の進捗と再開の記録方法は [TODO.md](TODO.md#これから決めること) で検討します。

## 導入

`igapyon-miku-daybook` は必須です。[miku-daybook の導入手順](https://github.com/igapyon/miku-daybook-skills/blob/devel/README.md#導入)に沿って、先に Codex に配置します。

このリポジトリのルートで次を実行し、`igapyon-miku-bpmn` を Codex に配置します。

```sh
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
rsync -a skills/igapyon-miku-bpmn/ "${CODEX_HOME:-$HOME/.codex}/skills/igapyon-miku-bpmn/"
```

Codexから `$igapyon-miku-bpmn` を呼び出します。たとえば「この activity から再利用できるプロセスを見つけて」と、対象の記録を指定します。

## 開発

- [SKILL.md](skills/igapyon-miku-bpmn/SKILL.md) がスキル本体です。開発中の初稿で、単体CLIを持たない Skill-only 製品として始めます。
- [TODO.md](TODO.md) に初版の残項目を記録します。初回リリースの予定版は `0.3.0`、対応するタグは `v0.3.0` です。
- `workplace/` はローカルの作業用です。Gitには `workplace/.gitkeep` を登録します。ローカルに配置した `.codex/skills/` と macOS の `.DS_Store` もGitの対象外です。
- [miku-soft の共通開発資料](docs/miku-soft-reference.md) を参照できます。

ライセンスは [Apache License 2.0](LICENSE) です。
