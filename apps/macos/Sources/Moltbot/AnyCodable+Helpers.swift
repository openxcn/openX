import openxKit
import openxProtocol
import Foundation

// Prefer the openxKit wrapper to keep gateway request payloads consistent.
typealias AnyCodable = openxKit.AnyCodable
typealias InstanceIdentity = openxKit.InstanceIdentity

extension AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: AnyCodable]? { self.value as? [String: AnyCodable] }
    var arrayValue: [AnyCodable]? { self.value as? [AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}

extension openxProtocol.AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: openxProtocol.AnyCodable]? { self.value as? [String: openxProtocol.AnyCodable] }
    var arrayValue: [openxProtocol.AnyCodable]? { self.value as? [openxProtocol.AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: openxProtocol.AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [openxProtocol.AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}
