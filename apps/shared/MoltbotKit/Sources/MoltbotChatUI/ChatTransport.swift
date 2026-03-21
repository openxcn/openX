import Foundation

public enum openxChatTransportEvent: Sendable {
    case health(ok: Bool)
    case tick
    case chat(openxChatEventPayload)
    case agent(openxAgentEventPayload)
    case seqGap
}

public protocol openxChatTransport: Sendable {
    func requestHistory(sessionKey: String) async throws -> openxChatHistoryPayload
    func sendMessage(
        sessionKey: String,
        message: String,
        thinking: String,
        idempotencyKey: String,
        attachments: [openxChatAttachmentPayload]) async throws -> openxChatSendResponse

    func abortRun(sessionKey: String, runId: String) async throws
    func listSessions(limit: Int?) async throws -> openxChatSessionsListResponse

    func requestHealth(timeoutMs: Int) async throws -> Bool
    func events() -> AsyncStream<openxChatTransportEvent>

    func setActiveSessionKey(_ sessionKey: String) async throws
}

extension openxChatTransport {
    public func setActiveSessionKey(_: String) async throws {}

    public func abortRun(sessionKey _: String, runId _: String) async throws {
        throw NSError(
            domain: "openxChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "chat.abort not supported by this transport"])
    }

    public func listSessions(limit _: Int?) async throws -> openxChatSessionsListResponse {
        throw NSError(
            domain: "openxChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "sessions.list not supported by this transport"])
    }
}
