package bot.openx.android.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class openxProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", openxCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", openxCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", openxCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", openxCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", openxCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", openxCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", openxCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", openxCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", openxCapability.Canvas.rawValue)
    assertEquals("camera", openxCapability.Camera.rawValue)
    assertEquals("screen", openxCapability.Screen.rawValue)
    assertEquals("voiceWake", openxCapability.VoiceWake.rawValue)
  }

  @Test
  fun screenCommandsUseStableStrings() {
    assertEquals("screen.record", openxScreenCommand.Record.rawValue)
  }
}
