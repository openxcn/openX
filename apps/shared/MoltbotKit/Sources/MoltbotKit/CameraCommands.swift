import Foundation

public enum openxCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum openxCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum openxCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum openxCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct openxCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: openxCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: openxCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: openxCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: openxCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct openxCameraClipParams: Codable, Sendable, Equatable {
    public var facing: openxCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: openxCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: openxCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: openxCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
