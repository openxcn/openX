// swift-tools-version: 6.2
// Package manifest for the openx macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "openx",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "openxIPC", targets: ["openxIPC"]),
        .library(name: "openxDiscovery", targets: ["openxDiscovery"]),
        .executable(name: "openx", targets: ["openx"]),
        .executable(name: "openx-mac", targets: ["openxMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.1.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.8.0"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(path: "../shared/openxKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "openxIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "openxDiscovery",
            dependencies: [
                .product(name: "openxKit", package: "openxKit"),
            ],
            path: "Sources/openxDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "openx",
            dependencies: [
                "openxIPC",
                "openxDiscovery",
                .product(name: "openxKit", package: "openxKit"),
                .product(name: "openxChatUI", package: "openxKit"),
                .product(name: "openxProtocol", package: "openxKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/openx.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "openxMacCLI",
            dependencies: [
                "openxDiscovery",
                .product(name: "openxKit", package: "openxKit"),
                .product(name: "openxProtocol", package: "openxKit"),
            ],
            path: "Sources/openxMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "openxIPCTests",
            dependencies: [
                "openxIPC",
                "openx",
                "openxDiscovery",
                .product(name: "openxProtocol", package: "openxKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
