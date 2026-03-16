# AstraFlow Dimensions 2026

架空の VTuber イベントを題材にした、ポートフォリオ向けの「公開サイト + 管理画面」一体型 Next.js アプリです。  
実在の企業・VTuber・イベント・ロゴ・KV は使用していません。

## 技術構成

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- lucide-react
- react-hook-form + zod
- locale ベースの `ja / en` ルーティング
- ローカル JSON のダミーデータで動く運用デモ構成
- GA4 イベント計測ポイント実装

## ルート

### 公開側

- `/[locale]`
- `/[locale]/about`
- `/[locale]/talents`
- `/[locale]/talents/[slug]`
- `/[locale]/schedule`
- `/[locale]/news`
- `/[locale]/news/[slug]`
- `/[locale]/faq`
- `/[locale]/ticket`
- `/[locale]/guidelines`

### 管理側

- `/admin/login`
- `/admin`
- `/admin/settings`
- `/admin/news`
- `/admin/news/new`
- `/admin/news/[id]`
- `/admin/talents`
- `/admin/talents/[id]`
- `/admin/schedule`
- `/admin/schedule/[id]`
- `/admin/faqs`
- `/admin/faqs/[id]`
- `/admin/pages/[key]`

## 動作モード

### モックデータモード

現在は Firebase を使わず、`data/mock-db.json` を使うローカル運用モードで動作します。

- 公開サイトは seed データで動作
- 管理画面は `/admin/login` から `Continue with mock data`
- 更新内容は `data/mock-db.json` に保存
- UI は `components/ui` の shadcn/ui ベースで統一

## セットアップ

### 1. 依存インストール

```bash
npm install
```

### 2. 環境変数

```bash
cp .env.example .env.local
```

追加設定なしで起動できます。

### 3. デモデータ初期化

```bash
npm run seed:demo
```

### 4. 起動

```bash
npm run dev
```

- 公開サイト: `http://localhost:3000/ja`
- 管理画面: `http://localhost:3000/admin/login`

## 将来の Firebase 接続用メモ

現時点では未使用ですが、将来的に Firebase へ切り替える場合の想定構成は残しています。

### Firestore 推奨構成

```text
admins/{uid}
events/{eventId}
events/{eventId}/news/{newsId}
events/{eventId}/talents/{talentId}
events/{eventId}/stages/{stageId}
events/{eventId}/sessions/{sessionId}
events/{eventId}/faqs/{faqId}
events/{eventId}/pages/{pageId}
```

### 初期セットアップ要点

1. Firebase Authentication で Google プロバイダを有効化
2. Google Cloud Console で OAuth Client を発行
3. `admins/{uid}` に管理対象ユーザーを登録
4. `events/{eventId}` と各サブコレクションを作成
5. `firebase/firestore.rules` と `firebase/storage.rules` を適用

### ローカル seed

Firebase 側の初期値を作るときは `data/mock-db.seed.json` をベースにしてください。  
このファイルに、イベント設定・ニュース・出演者・スケジュール・FAQ・固定ページのサンプルが入っています。

## GA4 イベント

`NEXT_PUBLIC_GA_MEASUREMENT_ID` を設定すると以下を送信します。

- `ticket_cta_click`
- `watch_cta_click`
- `talent_detail_view`
- `news_detail_view`
- `faq_open`
- `locale_switch`
- `schedule_filter_use`

未設定でも UI は壊れません。

## 主要ファイル

- `src/app/[locale]/*`: 公開側ページ
- `src/app/admin/*`: 管理画面
- `src/app/api/admin/*`: 管理 API
- `src/components/ui/*`: shadcn/ui 基盤
- `src/features/*`: ドメイン単位の schema / query / mutation
- `src/lib/firebase/*`: Firebase SDK ラッパー
- `src/lib/content/*`: データアクセス層
- `src/lib/auth/admin-session.ts`: 管理セッション保持
- `data/mock-db.seed.json`: ローカル seed
- `firebase/firestore.rules`: Firestore Rules
- `firebase/storage.rules`: Storage Rules

## 確認ポイント

- `ja / en` の切替が効く
- event phase を変えると公開側 CTA が変わる
- 管理画面からニュース、出演者、FAQ、固定ページが更新できる
- スケジュール編集で同一ステージ重複警告が出る
- Firebase なしでローカルモックデータだけで一通り確認できる

## 補足

- 現在はローカルモックデータ運用が標準です。
- Firebase 関連コードと rules は将来切り替えるために残しています。
