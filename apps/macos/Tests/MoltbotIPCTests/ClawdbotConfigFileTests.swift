import Foundation
import Testing
@testable import openx

@Suite(.serialized)
struct openxConfigFileTests {
    @Test
    func configPathRespectsEnvOverride() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("openx-config-\(UUID().uuidString)")
            .appendingPathComponent("openx.json")
            .path

        await TestIsolation.withEnvValues(["CLAWDBOT_CONFIG_PATH": override]) {
            #expect(openxConfigFile.url().path == override)
        }
    }

    @MainActor
    @Test
    func remoteGatewayPortParsesAndMatchesHost() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("openx-config-\(UUID().uuidString)")
            .appendingPathComponent("openx.json")
            .path

        await TestIsolation.withEnvValues(["CLAWDBOT_CONFIG_PATH": override]) {
            openxConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "ws://gateway.ts.net:19999",
                    ],
                ],
            ])
            #expect(openxConfigFile.remoteGatewayPort() == 19999)
            #expect(openxConfigFile.remoteGatewayPort(matchingHost: "gateway.ts.net") == 19999)
            #expect(openxConfigFile.remoteGatewayPort(matchingHost: "gateway") == 19999)
            #expect(openxConfigFile.remoteGatewayPort(matchingHost: "other.ts.net") == nil)
        }
    }

    @MainActor
    @Test
    func setRemoteGatewayUrlPreservesScheme() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("openx-config-\(UUID().uuidString)")
            .appendingPathComponent("openx.json")
            .path

        await TestIsolation.withEnvValues(["CLAWDBOT_CONFIG_PATH": override]) {
            openxConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "wss://old-host:111",
                    ],
                ],
            ])
            openxConfigFile.setRemoteGatewayUrl(host: "new-host", port: 2222)
            let root = openxConfigFile.loadDict()
            let url = ((root["gateway"] as? [String: Any])?["remote"] as? [String: Any])?["url"] as? String
            #expect(url == "wss://new-host:2222")
        }
    }

    @Test
    func stateDirOverrideSetsConfigPath() async {
        let dir = FileManager().temporaryDirectory
            .appendingPathComponent("openx-state-\(UUID().uuidString)", isDirectory: true)
            .path

        await TestIsolation.withEnvValues([
            "CLAWDBOT_CONFIG_PATH": nil,
            "CLAWDBOT_STATE_DIR": dir,
        ]) {
            #expect(openxConfigFile.stateDirURL().path == dir)
            #expect(openxConfigFile.url().path == "\(dir)/openx.json")
        }
    }
}
