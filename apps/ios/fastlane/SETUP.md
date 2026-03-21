# fastlane setup (openx iOS)

Install:

```bash
brew install fastlane
```

Create an App Store Connect API key:

- App Store Connect â†?Users and Access â†?Keys â†?App Store Connect API â†?Generate API Key
- Download the `.p8`, note the **Issuer ID** and **Key ID**

Create `apps/ios/fastlane/.env` (gitignored):

```bash
ASC_KEY_ID=YOUR_KEY_ID
ASC_ISSUER_ID=YOUR_ISSUER_ID
ASC_KEY_PATH=/absolute/path/to/AuthKey_XXXXXXXXXX.p8

# Code signing (Apple Team ID / App ID Prefix)
IOS_DEVELOPMENT_TEAM=YOUR_TEAM_ID
```

Tip: run `scripts/ios-team-id.sh` from the repo root to print a Team ID to paste into `.env`. Fastlane falls back to this helper if `IOS_DEVELOPMENT_TEAM` is missing.

Run:

```bash
cd apps/ios
fastlane beta
```
